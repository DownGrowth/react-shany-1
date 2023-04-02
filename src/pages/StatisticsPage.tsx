import { useMemo, useState } from 'react'
import useSWR from 'swr'
import { BackIcon } from '../components/BackIcon'
import { Gradient } from '../components/Gradient'
import { Input } from '../components/Input'
import { LineChart } from '../components/LineChart'
import { PieChart } from '../components/PieChart'
import { RankChart } from '../components/RankChart'
import type { TimeRange } from '../components/TimeRangePicker'
import { TimeRangePicker } from '../components/TimeRangePicker'
import { TopNav } from '../components/TopNav'
import { useAjax } from '../lib/ajax'
import type { Time } from '../lib/time'
import { time } from '../lib/time'
type Groups = { happen_at: string; amount: number }[]
type Groups2 = { tag_id: string; tag: Tag; amount: number }[]
const format = 'yyyy-MM-dd'
type GetKeyParams = {
  start: Time
  end: Time
  kind: Item['kind'] | string
  group_by: 'happen_at' | 'tag_id'
}
const getKey = ({ start, end, kind, group_by }: GetKeyParams) => {
  return `/api/v1/items/summary?happened_after=${start.format(format)}&happened_before=${end.format(format)}&kind=${kind}&group_by=${group_by}`
}

export const StatisticsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>({
    name: 'thisMonth',
    start: time().firstDayOfMonth,
    end: time().lastDayOfMonth.add(1, 'day')
  })
  const [kind, setKind] = useState<Item['kind'] | string>('expenses')
  const [chart, setChart] = useState('lineChart')
  const { get } = useAjax({ showLoading: false, handleError: true })

  const generateDefaultItems = (time: Time) => {
    return Array.from({ length: time.dayCountOfMonth }).map((_, i) => {
      const x = time.clone.add(i, 'day').format(format)
      return { x, y: 0 }
    })
  }
  const { start, end } = timeRange
  const defaultItems = generateDefaultItems(start)
  const { data: items } = useSWR(getKey({ start, end, kind, group_by: 'happen_at' }),
    async path =>
      (await get<{ groups: Groups; total: number }>(path)).data.groups
        .map(({ happen_at, amount }) =>
          ({ x: happen_at, y: (amount / 100).toFixed(2) }))
  )
  const normalizedItems = defaultItems?.map(defaultItem =>
    (items?.find(item => item.x === defaultItem.x)) || defaultItem
  )
  const { data: items2 } = useSWR(getKey({ start, end, kind, group_by: 'tag_id' }), async path =>
    (await get<{ groups: Groups2; total: number }>(path)).data.groups.map(({ tag_id, tag, amount }) => {
      return { name: tag.name, value: (amount / 100).toFixed(2), sign: tag.sign, id: tag_id }
    }
    )
  )
  const computedChart = useMemo(() => {
    if (chart === 'lineChart') {
      return <LineChart className="h-120px" items={normalizedItems} />
    } else if (chart === 'pieChart') {
      return <PieChart className="h-260px" items={items2} />
    } else {
      return <RankChart items={items2} />
    }
  }, [chart, items, items2])
  return (
    <div>
      <Gradient>
        <TopNav title="统计图表" icon={
          <BackIcon route='/items'/>
        } />
      </Gradient>
      <TimeRangePicker selected={timeRange} onSelect={setTimeRange} timeRanges={[{
        text: '本月',
        key: { name: 'thisMonth', start: time().firstDayOfMonth, end: time().lastDayOfMonth.add(1, 'day') },
      },
      {
        text: '上月',
        key: { name: 'lastMonth', start: time().add(-1, 'month').firstDayOfMonth, end: time().add(-1, 'month').lastDayOfMonth.add(1, 'day') },
      },
      {
        text: '两个月前',
        key: { name: 'twoMonthsAgo', start: time().add(-2, 'month').firstDayOfMonth, end: time().add(-2, 'month').lastDayOfMonth.add(1, 'day') },
      },
      {
        text: '三个月前',
        key: { name: 'threeMonthsAgo', start: time().add(-3, 'month').firstDayOfMonth, end: time().add(-3, 'month').lastDayOfMonth.add(1, 'day') },
      },
      ]} />
      <div flex p-16px items-center gap-x-16px>
        <span grow-0 shrink-0>类型</span>
        <div grow-1 shrink-1>
          <Input type="select" options={[
            { text: '支出', value: 'expenses' },
            { text: '收入', value: 'income' },
          ]} value={kind} onChange={value => setKind(value)} disableError />
        </div>
      </div>
      <div flex p-16px items-center gap-x-16px>
        <span grow-0 shrink-0>图表</span>
        <div grow-1 shrink-1>
          <Input type="select" options={[
            { text: '折线图', value: 'lineChart' },
            { text: '饼状图', value: 'pieChart' },
            { text: '条形图', value: 'rankChart' },
          ]} value={chart} onChange={value => setChart(value)} disableError />
        </div>
      </div>
    <div>{computedChart}</div>
    </div>
  )
}
