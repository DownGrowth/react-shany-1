import type { TimeRange } from '../components/TimeRangePicker'
import type { Time } from './time'
import { time } from './time'

const timeRangeMap: { [k in TimeRange]: number } = {
  thisYear: 0,
  custom: 0,
  thisMonth: 0,
  lastMonth: -1,
  twoMonthAgo: -2,
  threeMonthAgo: -3,
}
export const timeRangeToStartAndEnd = (timeRange: TimeRange) => {
  let selected: Time, start: Time, end: Time
  switch (timeRange) {
    case 'thisMonth':
    case 'lastMonth':
    case 'twoMonthAgo':
    case 'threeMonthAgo':
      selected = time().add(timeRangeMap[timeRange], 'month')
      start = selected.firstDayOfMonth
      end = start.lastDayOfMonth.add(1, 'day')
      return { start, end }
    case 'thisYear':
      selected = time()
      start = time().set({ month: 1 }).firstDayOfMonth
      end = time().add(1, 'year').set({ month: 1 }).firstDayOfMonth
      return { start, end }
    case 'custom':
      return { start: time(), end: time() }
  }
}
