import { useEffect, useRef, useState } from 'react'

type Props = {
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  request?: () => Promise<unknown>
}
const maxCount = 60
export const SmsCodeInput: React.FC<Props> = (props) => {
  const { placeholder, value, onChange, request } = props
  const [started, setStarted] = useState<Date>()
  const [count, setCount] = useState(maxCount)
  const timer = useRef<number>()
  const onClick = async () => {
    if (!request) { return }
    await request()
    setStarted(new Date())
  }
  useEffect(() => {
    if (started) {
      timer.current = window.setInterval(() => {
        const t = new Date()
        const seconds = Math.round((t.getTime() - started.getTime()) / 1000)
        if (maxCount - seconds < 0) {
          setStarted(undefined)
        }
        setCount(maxCount - seconds)
      }, 1000)
    } else {
      if (timer.current) {
        window.clearInterval(timer.current)
        timer.current = undefined
      }
    }
  }, [started])
  return (
    <div flex gap-x-16px>
      <input shrink-1 b-input-text type="text" placeholder={placeholder}
        max-w="[calc(40%-8px)]"
        value={value} onChange={e => onChange?.(e.target.value)}
      />
      {started
        ? <button type='button' b-btn max-w="[calc(60%-8px)]" disabled={false} bg='#d1dee4'>{count}秒后可重新发送</button>
        : <button type='button' b-btn max-w="[calc(60%-8px)]" onClick={onClick}>发送验证码</button>}
    </div>
  )
}
