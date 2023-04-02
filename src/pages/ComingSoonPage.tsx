import { useNavigate } from 'react-router-dom'
import { Icon } from '../components/Icon'
export const ComingSoonPage: React.FC = () => {
  const nav = useNavigate()
  return (
    <div flex justify-center items-center flex-col gap-y-24px h-screen px-64px>
      <Icon name="mountain" className='w-200px h-200px' />
      <h1>敬请期待</h1>
        <button b-btn onClick={() => nav(-1)}>返回</button>
    </div>
  )
}
