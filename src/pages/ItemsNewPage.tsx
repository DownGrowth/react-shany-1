import type { ReactNode } from 'react'
import { Gradient } from '../components/Gradient'
import { Icon } from '../components/Icon'
import { Tabs } from '../components/Tabs'
import { TopNav } from '../components/TopNav'
import { useAjax } from '../lib/ajax'
import { hasError, validate } from '../lib/validate'
import { useCreateItemStore } from '../stores/useCreateItemStore'
import s from './ItemsNewPage.module.scss'
import { ItemAmount } from './ItemsNewPage/ItemAmount'
import { ItemDate } from './ItemsNewPage/ItemDate'
import { Tags } from './ItemsNewPage/Tags'

export const ItemsNewPage: React.FC = () => {
  const { data, setData, setError } = useCreateItemStore()
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
  const { post } = useAjax({ showLoading: true, handleError: true })
  const onSubmit = async () => {
    const error = validate(data, [{
      key: 'kind', type: 'required', message: '请选择类型:收入或支出'
    },
    { key: 'tag_ids', type: 'required', message: '请选择一个标签' },
    { key: 'happen_at', type: 'required', message: '请选择时间' },
    { key: 'amount', type: 'notEqual', value: 0, message: '金额不能为0' },
    ])
    setError(error)
    if (hasError(error)) {
      const message = Object.values(error).flat().join('\n')
      window.alert(message)
    } else {
      const response = await post<Resource<Item>>('/api/vi/items', data)
      console.log(response.data.resource)
    }
  }
  return (
    <div className={s.wrapper} h-screen flex flex-col>
      <Gradient className="grow-0 shrink-0">
        <TopNav title='记一笔' icon={<Icon name="back" className='w-24px h-24px' />} />
      </Gradient>
      <Tabs tabItems={tabItems} className="text-center grow-1 shrink-1 overflow-hidden" classPrefix='itemsNewPage' value={data.kind!} onChange={kind => setData({ kind })} />
      <div>
      </div>
      <ItemAmount className="grow-0 shrink-0" onSubmit={onSubmit} value={data.amount} onChange={amount => setData({ amount })}
        itemDate={<ItemDate value={data.happen_at} onChange={happen_at => setData({ happen_at })} />} />
    </div>
  )
}
