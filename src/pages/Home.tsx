import useSWR from 'swr'
import axios from 'axios'
import p from '../assets/images/mountain.svg'
import add from '../assets/images/add.svg'
import { ajax } from '../lib/ajax'
interface Props {
  title: string
}
export const Home: React.FC<Props> = () => {
  const { data: meData, error: meError } = useSWR('/api/v1/me', (path) => {
    return ajax.get(path)
  })
  const { data: itemsData, error: itemsError } = useSWR(meData ? '/api/v1/items' : null, (path) => {
    return ajax.get(path)
  })
  return <div>
    <div flex justify-center items-center>
      <img mt-20vh mb-20vh width="186" height="186" src={p} />
      </div>
      <div px-16px>
      <button h-48px w="100%" bg='#C1E9F8' b-none text='black' rounded-8px>开始记账</button>
      </div>
    <button w-56px h-56px bg='#C1E9F8' rounded="50%" b-none text='black' text-6xl fixed bottom-16px right-16px>
      <img max-w="70%" max-h="70%" src={add} />
    </button>

  </div>
}
