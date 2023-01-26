import { Link } from 'react-router-dom'
import p3 from '../assets/images/welcome3.svg'
export const Welcome3: React.FC = () => {
  return (<div text-center>
    <img w-140px h-140px src={p3} mt-36px/>
    <h2 text-28px mt-8px>
      数据可视 <br/>
      一目了然
    </h2>
    <div mt-84px>
        <Link text-24px text="[var(--text-main)]" font-bold to="/welcome/4">下一页</Link>
      </div>
    </div>)
}
