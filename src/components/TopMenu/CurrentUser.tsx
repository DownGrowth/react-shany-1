interface Props {
  className?: string
}
export const CurrentUser: React.FC<Props> = ({ className }) => {
  return (
      <div className={className} bg="#C1E9F8" text-white w="100%" pt-32px pb-44px
        px-16px>
        <h2 text-24px>未登录用户</h2>
        <div text="#6a5e73">点击这里登录</div>
      </div>
  )
}
