import { Link } from 'react-router-dom'

interface Props {
  className?: string
}
export const CurrentUser: React.FC<Props> = ({ className }) => {
  return (
      <Link to='/sign_in' block className={className} bg="[var(--color-blue)]" text-white w="100%" pt-32px pb-44px
        px-16px>
        <h2 text-24px>未登录用户</h2>
        <div text="[var(--text-main)]">点击这里登录</div>
      </Link>
  )
}
