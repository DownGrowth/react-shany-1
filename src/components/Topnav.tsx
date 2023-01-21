import { Icon } from './Icon'

interface Props {
  title?: string
}
export const TopNav: React.FC<Props> = ({ title = '山音记账' }) => {
  return (
    <div text="#6a5e73" flex items-center p-16px>
      <Icon name='menu' className='w-24px h-24px mr-16px' />
      <h1 text-24px>{title}</h1>
    </div>
  )
}
