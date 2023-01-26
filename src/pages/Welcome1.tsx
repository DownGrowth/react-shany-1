import { Link } from 'react-router-dom'
import p1 from '../assets/images/welcome1.svg'
export const Welcome1: React.FC = () => {
  return (<div text-center>
    <img w-180px h-180px src={p1}/>
    <h2 text-28px >
      高山流水 <br/>
      帮您省钱
    </h2>
    <div mt-86px>
        <Link text-24px text="[var(--text-main)]" font-bold to="/welcome/2">下一页</Link>
      </div>
    </div>)
}
