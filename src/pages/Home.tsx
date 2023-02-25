import useSWR from 'swr'
import { Navigate } from 'react-router-dom'
import p from '../assets/images/mountain.svg'
import { useTitle } from '../hooks/useTitle'
import { Loading } from '../components/Loading'
import { AddItemFloatButton } from '../components/AddItemFloatButton'
import { useAjax } from '../lib/ajax'
interface Props {
  title?: string
}
export const Home: React.FC<Props> = (props) => {
  useTitle(props.title)
  const { get } = useAjax({ showLoading: true, handleError: false })
  const { data: meData, error: meError } = useSWR('/api/v1/me', async path => ((await get<Resource<User>>(path)).data.resource)
  )
  const { data: itemsData, error: itemsError } = useSWR(meData ? '/api/v1/items' : null, async path => ((await get<Resources<Item>>(path)).data))

  const isLoadingMe = !meData && !meError
  const isLoadingItems = meData && !itemsData && !itemsError
  if (isLoadingMe || isLoadingItems) {
    return <Loading className="h-screen" message='加载中...'/>
  }
  if (itemsData?.resources[0]) {
    return <Navigate to="/items" />
  }

  return <div>
    <div flex justify-center items-center>
      <img mt-20vh mb-20vh width="186" height="186" src={p} />
      </div>
      <div px-16px>
      <button b-btn>开始记账</button>
      </div>
      <AddItemFloatButton />
  </div>
}
