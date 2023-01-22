export const ItemSummary: React.FC = () => {
  return (
    <ol bg="#f1f7e6" flex justify-between items-center m-16px rounded-24px py-12px children-px-24px text-center>
      <li text='#d47678'>
        <div>收入</div>
        <div>1000</div>
      </li>
      <li text="#5099ac">
        <div>支出</div>
        <div>1000</div>
      </li>
      <li text='#666666'>
        <div>净收入</div>
        <div>1000</div>
      </li>
    </ol>
  )
}
