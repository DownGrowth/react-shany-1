import { useState } from 'react'
import { Gradient } from '../components/Gradient'
import { Icon } from '../components/Icon'
import { Tabs } from '../components/Tabs'
import { TopNav } from '../components/TopNav'

type itemKind = 'income' | 'expenses'
export const ItemsNewPage: React.FC = () => {
  const tabItems: { key: itemKind; text: string }[]
    = [{ key: 'income', text: '收入' }, { key: 'expenses', text: '支出' }]
  const [tabItem, setTabItem] = useState<itemKind>('expenses')
  return (
    <div>
      <Gradient>
        <TopNav title='记一笔' icon={<Icon name="back" className='w-24px h-24px' />} />
        <Tabs tabItems={tabItems} value={tabItem} onChange={item => setTabItem(item) } />
      </Gradient>
    </div>
  )
}
