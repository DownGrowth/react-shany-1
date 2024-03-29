import useSWR from 'swr'
import { Link, Navigate } from 'react-router-dom'
import { AddItemFloatButton } from '../components/AddItemFloatButton'
import { useAjax } from '../lib/ajax'
import { Icon } from '../components/Icon'
interface Props {
  title?: string
}
export const Home: React.FC<Props> = (props) => {
  const { get } = useAjax({ showLoading: true, handleError: false })
  const { data: meData, error: meError } = useSWR('/api/v1/me', async path => ((await get<Resource<User>>(path)).data.resource)
  )
  const { data: itemsData, error: itemsError } = useSWR(meData ? '/api/v1/items' : null, async path => ((await get<Resources<Item>>(path)).data))

  const isLoadingMe = !meData && !meError
  const isLoadingItems = meData && !itemsData && !itemsError
  if (isLoadingMe || isLoadingItems) {
    return <div flex text-center justify-center items-center h-screen>
      <div >加载中...</div>
    </div>
  }
  if (itemsData?.resources[0]) {
    return <Navigate to="/items" />
  }

  return <div>
    <div flex justify-center items-center>
      <Icon className='mt-20vh mb-20vh w-200px h-200px' name='mountain'/>
      </div>
    <div px-16px>
      <Link to={'/items'}>
        <button b-btn>开始记账</button>
        </Link>
      </div>
      <AddItemFloatButton />
  </div>
}
