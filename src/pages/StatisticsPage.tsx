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
export const StatisticsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('thisMonth')
  const [kind, setKind] = useState('expenses')
  const [chart, setChart] = useState('lineChart')
  const { get } = useAjax({ showLoading: false, handleError: true })
  const generateStartEnd = () => {
    if (timeRange === 'thisMonth') {
      const start = time().firstDayOfMonth
      const end = time().lastDayOfMonth.add(1, 'day')
      return { start, end }
    } else {
      return { start: time(), end: time() }
    }
  }
  const generateDefaultItems = (time: Time) => {
    return Array.from({ length: time.dayCountOfMonth }).map((_, i) => {
      const x = time.clone.add(i, 'day').format(format)
      return { x, y: 0 }
    })
  }
  const { start, end } = generateStartEnd()
  const defaultItems = generateDefaultItems(start)
  const { data: items } = useSWR(`/api/v1/items/summary?happened_after=${start}&happened_before=${end}&group_by=happen_at`,
    async path =>
      (await get<{ groups: Groups; total: number }>(path)).data.groups
        .map(({ happen_at, amount }) =>
          ({ x: happen_at, y: (amount / 100).toFixed(2) }))
  )
  const normalizedItems = defaultItems?.map(defaultItem =>
    (items?.find(item => item.x === defaultItem.x)) || defaultItem
  )
  const { data: items2 } = useSWR(`/api/v1/items/summary?happened_after=${start}&happened_before=${end}&group_by=tag_id`, async path =>
    (await get<{ groups: Groups2; total: number }>(path)).data.groups.map(({ tag_id, tag, amount }) => {
      return { name: tag.name, value: (amount / 100).toFixed(2), sign: tag.sign }
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
  }, [chart, items])
  return (
    <div>
      <Gradient>
        <TopNav title="统计图表" icon={
          <BackIcon />
        } />
      </Gradient>
      <TimeRangePicker selected={timeRange} onSelect={setTimeRange} timeRanges={[{ key: 'thisMonth', text: '本月' },
        { key: 'lastMonth', text: '上个月' },
        { key: 'twoMonthAgo', text: '两个月前' },
        { key: 'threeMonthAgo', text: '三个月前' },
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
