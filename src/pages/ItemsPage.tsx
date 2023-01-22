import { useState } from 'react'
import styled from 'styled-components'
import { AddItemFloatButton } from '../components/AddItemFloatButton'
import type { TimeRange } from '../components/TimeRangePicker'
import { TimeRangePicker } from '../components/TimeRangePicker'
import { TopMenu } from '../components/TopMenu'
import { TopNav } from '../components/TopNav'
import { useMenuStore } from '../stores/useMenuStore'
import { ItemList } from './ItemsList'
import { ItemSummary } from './ItemsSummary'

const Div = styled.div`
background:linear-gradient(0deg,  rgba(255,252,237,1)0%, rgba(193,233,248,1) 100%);
`

export const ItemsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('thisMonth')
  const [items] = useState<Item[]>([
    {
      id: 1,
      kind: 'incomes',
      amount: 1000,
      user_id: 1,
      tag_ids: [1],
      happen_at: '2021-01-01T00:00:00.000Z',
      created_at: '2021-01-01T00:00:00.000Z',
      updated_at: '2021-01-01T00:00:00.000Z',
    }, {
      id: 2,
      kind: 'incomes',
      amount: 1000,
      user_id: 1,
      tag_ids: [1],
      happen_at: '2021-01-01T00:00:00.000Z',
      created_at: '2021-01-01T00:00:00.000Z',
      updated_at: '2021-01-01T00:00:00.000Z',
    }
  ])
  const { visible } = useMenuStore()
  return (
    <div>
      <Div>
        <TopNav />
        <TimeRangePicker selected={timeRange}
          onSelected={key => setTimeRange(key)} />
      </Div>
      <ItemSummary />
      <ItemList items={items}/>
      <AddItemFloatButton />
      {visible ? <TopMenu/> : null}
    </div>
  )
}
