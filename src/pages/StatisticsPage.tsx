import { useMemo, useState } from 'react'
import { Gradient } from '../components/Gradient'
import { Icon } from '../components/Icon'
import { Input } from '../components/Input'
import { LineChart } from '../components/LineChart'
import { PieChart } from '../components/PieChart'
import { RankChart } from '../components/RankChart'
import type { TimeRange } from '../components/TimeRangePicker'
import { TimeRangePicker } from '../components/TimeRangePicker'
import { TopNav } from '../components/TopNav'

export const StatisticsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('thisMonth')
  const [x, setX] = useState('expenses')
  const [chart, setChart] = useState('lineChart')
  const items = [
    { date: '2000-01-01', value: 15000 },
    { date: '2000-01-02', value: 25000 },
    { date: '2000-01-31', value: 10000 },
  ].map(item => ({ x: item.date, y: item.value / 100 }))
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
          <Icon name="back" />
        } />
      </Gradient>
      <TimeRangePicker selected={timeRange} onSelect={setTimeRange} />
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
