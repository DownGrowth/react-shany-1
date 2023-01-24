import { useState } from 'react'
import styled from 'styled-components'
import { AddItemFloatButton } from '../components/AddItemFloatButton'
import type { TimeRange } from '../components/TimeRangePicker'
import { TimeRangePicker } from '../components/TimeRangePicker'
import { TopMenu } from '../components/TopMenu'
import { TopNav } from '../components/TopNav'
import { useMenuStore } from '../stores/useMenuStore'
import { ItemsList } from './ItemsList'
import { ItemSummary } from './ItemsSummary'

const Div = styled.div`
background:linear-gradient(0deg,  rgba(255,252,237,1)0%, rgba(193,233,248,1) 100%);
`

export const ItemsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('thisMonth')
  const { visible, setVisible } = useMenuStore()
  return (
    <div>
      <Div>
        <TopNav />
        <TimeRangePicker selected={timeRange}
          onSelected={key => setTimeRange(key)} />
      </Div>
      <ItemSummary />
      <ItemsList />
      <AddItemFloatButton />
      {<TopMenu visible={visible} onClickMask={() => { setVisible(false) }}/>}
    </div>
  )
}
