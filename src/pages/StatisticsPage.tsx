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
import { time } from '../lib/time'
type Groups = { happen_at: string; amount: number }[]
export const StatisticsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('thisMonth')
  const [x, setX] = useState('expenses')
  const [chart, setChart] = useState('lineChart')
  const { get } = useAjax({ showLoading: false, handleError: true })
  const generateStartEnd = () => {
    if (timeRange === 'thisMonth') {
      const start = time().firstDayOfMonth.format('YYYY-MM-dd')
      const end = time().lastDayOfMonth.add(1, 'day').format('YYYY-MM-dd')
      return { start, end }
    } else {
      return { start: '', end: '' }
    }
  }
  const { start, end } = generateStartEnd()
  const { data: items } = useSWR(`/api/v1/items/summary?happened_after=${start}&happened_before=${end}&group_by=happen_at`,
    async path =>
      (await get<{ groups: Groups; total: number }>(path)).data.groups
        .map(({ happen_at, amount }) => ({ x: happen_at, y: amount }))
  )
  const items2 = [
    { tag: '吃饭', amount: 10000 },
    { tag: '打车', amount: 20000 },
    { tag: '买皮肤', amount: 68800 },
  ].map(item => ({ x: item.tag, y: item.amount / 100 }))
  const items3 = [
    { tag: { name: '吃饭', sign: '😨' }, amount: 10000 },
    { tag: { name: '打车', sign: '🥱' }, amount: 20000 },
    { tag: { name: '买皮肤', sign: '💖' }, amount: 68800 },
  ].map(item => ({ name: item.tag.name, value: item.amount, sign: item.tag.sign }))
  const computedChart = useMemo(() => {
    if (chart === 'lineChart') {
      return <LineChart className="h-120px" items={items} />
    } else if (chart === 'pieChart') {
      return <PieChart className="h-260px" items={items2} />
    } else {
      return <RankChart items={items3} />
    }
  }, [chart])
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
          ]} value={x} onChange={value => setX(value)} disableError />
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
