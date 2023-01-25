import { Gradient } from '../components/Gradient'
import { Icon } from '../components/Icon'
import { TopNav } from '../components/TopNav'

export const SignInPage: React.FC = () => {
  return (
    <div>
      <Gradient>
        <TopNav title='登录页面' icon={<Icon name="back" className='w-24px h-24px'/> } />
      </Gradient>
    </div>
  )
}
