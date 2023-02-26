import { Link } from 'react-router-dom'
import { Icon } from './Icon'

export const AddItemFloatButton: React.FC = () =>
  (<Link to="/items/new"><button w-56px h-56px bg='#C1E9F8' rounded="50%" b-none text='black' fixed bottom-16px right-16px flex justify-center items-center>
  <Icon name="add" className="fill-#666666 w-28px h-28px" />
  </button></Link>
  )
