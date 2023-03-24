import { useState } from 'react'
import { AddItemFloatButton } from '../components/AddItemFloatButton'
import { Gradient } from '../components/Gradient'
import { Icon } from '../components/Icon'
import type { TimeRange } from '../components/TimeRangePicker'
import { TimeRangePicker } from '../components/TimeRangePicker'
import { TopMenu } from '../components/TopMenu'
import { TopNav } from '../components/TopNav'
import { time } from '../lib/time'
import { timeRangeToStartAndEnd } from '../lib/timeRangeToStartAndEnd'
import { useMenuStore } from '../stores/useMenuStore'
import { ItemsList } from './itemsPage/ItemsList'
import { ItemSummary } from './itemsPage/ItemsSummary'

export const ItemsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>({
    name: 'thisMonth',
    start: time().firstDayOfMonth,
    end: time().lastDayOfMonth.add(1, 'day')
  })
  const { visible, setVisible } = useMenuStore()
  const { start, end } = timeRangeToStartAndEnd(timeRange)
  return (
    <div>
      <Gradient>
        <TopNav title='账目列表'
          icon={<Icon name='menu' className='w-24px h-24px'
            onClick={() => { setVisible(!visible) }} />} />
           </Gradient>
        <TimeRangePicker selected={timeRange}
          onSelect={ setTimeRange} />
      <ItemSummary />
      <ItemsList start={start} end={end} />
      <AddItemFloatButton />
      {<TopMenu visible={visible} onClickMask={() => { setVisible(false) }} />}
    </div>
  )
}
