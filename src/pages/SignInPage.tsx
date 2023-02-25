import type { AxiosError } from 'axios'
import axios from 'axios'
import type { FormEventHandler } from 'react'
import { useNavigate } from 'react-router-dom'
import { Gradient } from '../components/Gradient'
import { Icon } from '../components/Icon'
import { Input } from '../components/Input'
import { Loading } from '../components/Loading'
import { TopNav } from '../components/TopNav'
import { usePopup } from '../hooks/usePopup'
import { ajax } from '../lib/ajax'
import type { FormError } from '../lib/validate'
import { hasError, validate } from '../lib/validate'
import { useSignInStore } from '../stores/useSignInStore'

export const SignInPage: React.FC = () => {
  const { data, error, setData, setError } = useSignInStore()
  const nav = useNavigate()
  const onSubmitError = (err: AxiosError<{ errors: FormError<typeof data> }>) => {
    setError(err.response?.data?.errors ?? {})
    throw error
  }
  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    const newError = validate(data, [
      { key: 'email', type: 'required', message: '请输入邮箱地址' },
      { key: 'email', type: 'pattern', regex: /^.+@.+$/, message: '邮箱地址格式不正确' },
      { key: 'code', type: 'required', message: '请输入验证码' },
      { key: 'code', type: 'length', min: 6, max: 6, message: '验证码必须是6个字符' },
    ])
    setError(newError)
    if (!hasError(newError)) {
      // 发送请求
      const response = await ajax.post<{ jwt: string }>('http://121.196.236.94:8080/api/v1/session', data).catch(onSubmitError)
      // 获取 JWT
      const jwt = response.data.jwt
      // JWT 放入LS
      localStorage.setItem('jwt', jwt)
      // 回到首页
      nav('/home')
    }
  }
  const { popup, hide, show } = usePopup({ children: <Loading className="p-8px" />, position: 'center' })
  const sendSmsCode = async () => {
    const newError = validate(data, [
      { key: 'email', type: 'required', message: '请输入邮箱地址' },
      { key: 'email', type: 'pattern', regex: /^.+@.+$/, message: '邮箱地址格式不正确' }
    ])
    setError(newError)
    if (hasError(newError)) { throw new Error('表单出错') }
    show()
    const response = await axios.post('http://121.196.236.94:8080/api/v1/validation_codes', { email: data.email }).finally(() => hide())
    return response
  }
  return (
    <div>
      {popup }
      <Gradient>
        <TopNav title='登录页面' icon={<Icon name="back" className='w-24px h-24px'/> } />
      </Gradient>
      <div text-center pt-40px pb-16px>
        <Icon name="logo" className='w-64px h-68px' />
        <h1 text-32px text="[var(--text-main)]" font-bold>山音记账</h1>
      </div>
      <form b-form onSubmit={onSubmit}>
      <Input label='邮箱地址' placeholder='请输入邮箱，然后点击发送验证码'
          value={data.email} onChange={email => setData({ email })}
          error={error.email?.[0]} />
        <Input type='sms_code' label='验证码' placeholder='六位数组' value={data.code}
          onChange={value => setData({ code: value })}
          error={error.code?.[0]} request={sendSmsCode}
        />
        <div mt-100px>
          <button b-btn type="submit">登录</button>
        </div>
      </form>
    </div>
  )
}
