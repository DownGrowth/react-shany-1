import type { ReactNode } from 'react'
import { Gradient } from '../components/Gradient'
import { Icon } from '../components/Icon'
import { Tabs } from '../components/Tabs'
import { TopNav } from '../components/TopNav'
import { useCreateItemStore } from '../stores/useCreateItemStore'
import s from './ItemsNewPage.module.scss'
import { ItemAmount } from './ItemsNewPage/ItemAmount'
import { ItemDate } from './ItemsNewPage/ItemDate'
import { Tags } from './ItemsNewPage/Tags'

export const ItemsNewPage: React.FC = () => {
  const { data, error, setData, setError } = useCreateItemStore()
  const tabItems: { key: Item['kind']; text: string; element?: ReactNode }[]
    = [{
      key: 'expenses',
      text: '支出',
      element: <Tags kind="expenses" value={data.tag_ids} onChange={tag_ids => setData({ tag_ids })} />
    },
    {
      key: 'income',
      text: '收入',
      element: <Tags kind="income" value={data.tag_ids} onChange={tag_ids => setData({ tag_ids })} />
    }]
  return (
    <div className={s.wrapper} h-screen flex flex-col>
      <Gradient className="grow-0 shrink-0">
        <TopNav title='记一笔' icon={<Icon name="back" className='w-24px h-24px' />} />
      </Gradient>
      <Tabs tabItems={tabItems} className="text-center grow-1 shrink-1 overflow-hidden" classPrefix='itemsNewPage' value={data.kind!} onChange={tabItems => setData({ kind: tabItems })} />
      <div>
        {JSON.stringify(data)}
      </div>
      <ItemAmount className="grow-0 shrink-0"
        itemDate={<ItemDate value={data.happen_at} onChange={date => setData({ happen_at: date })} />} />
    </div>
  )
}
