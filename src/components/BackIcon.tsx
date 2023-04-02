import { useNavigate } from 'react-router-dom'
import { Icon } from './Icon'
type Props = {
  route?: string
}
export const BackIcon: React.FC<Props> = ({ route }) => {
  const nav = useNavigate()
  const onBack = () => {
    route
      ? nav(route)
      : nav(-1)
  }
  return (
    <Icon name="back" onClick={onBack} className='w-24px h-24px'/>
  )
}
