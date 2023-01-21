import styled from 'styled-components'
import { AddItemFloatButton } from '../components/AddItemFloatButton'
import { TimeRangePicker } from '../components/TimeRangePicker'
import { TopNav } from '../components/Topnav'
import { ItemList } from './ItemsList'
import { ItemSummary } from './ItemsSummary'

const Div = styled.div`
background:linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(249,255,239,1) 0%, rgba(231,238,237,1) 100%);
`

export const ItemsPage: React.FC = () => {
  return (
      <div>
      <Div>
        <TopNav />
        <TimeRangePicker />
      </Div>
      <ItemSummary />
      <ItemList />
      <AddItemFloatButton />
    </div>
  )
}
