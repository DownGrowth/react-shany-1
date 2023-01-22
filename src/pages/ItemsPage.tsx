import { useState } from 'react'
import styled from 'styled-components'
import { AddItemFloatButton } from '../components/AddItemFloatButton'
import type { TimeRange } from '../components/TimeRangePicker'
import { TimeRangePicker } from '../components/TimeRangePicker'
import { TopNav } from '../components/Topnav'
import { ItemList } from './ItemsList'
import { ItemSummary } from './ItemsSummary'

const Div = styled.div`
background:linear-gradient(0deg, rgba(193,233,248,1) 0%, rgba(255,252,237,1) 100%);
`

export const ItemsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState <TimeRange>('thisMonth')
  return (
    <div>
      <Div>
        <TopNav />
        <TimeRangePicker selected={timeRange} onSelected={setTimeRange} />
      </Div>
      <ItemSummary />
      <ItemList />
      <AddItemFloatButton />
    </div>
  )
}
