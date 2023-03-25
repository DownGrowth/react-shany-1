import useSWR from 'swr'
import { Money } from '../../components/Money'
import { useAjax } from '../../lib/ajax'
import type { Time } from '../../lib/time'

type Props = {
  start: Time
  end: Time
}
export const ItemSummary: React.FC<Props> = ({ start, end }) => {
  const { get } = useAjax({ showLoading: false, handleError: false })
  const { data } = useSWR(start && end && `/api/v1/items/balance?happened_after=${start.isoString}&happened_before=${end.isoString}`, async path =>
    (await get<{ balance: number; expenses: number; income: number }>(path)).data)
  const { balance, expenses, income } = data ?? { balance: 0, expenses: 0, income: 0 }
  return (
    <ol bg="#e1f8ed" flex justify-between items-center m-16px rounded-24px py-12px children-px-24px text-center>
      <li text='#d47678'>
        <div>收入</div>
        <div><Money value={income} /></div>
      </li>
      <li text="#5099ac">
        <div>支出</div>
        <div><Money value={expenses} /></div>
      </li>
      <li text='#666666'>
        <div>净收入</div>
        <div><Money value={balance} /></div>
      </li>
    </ol>
  )
}
