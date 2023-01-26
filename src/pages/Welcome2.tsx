import { Link } from 'react-router-dom'
import p2 from '../assets/images/welcome2.svg'
export const Welcome2: React.FC = () => {
  return (<div text-center>
    <img w-140px h-140px src={p2} mt-36px/>
    <h2 text-28px >
      泉水叮咚 <br />
      绝不漏记
    </h2>
    <div mt-86px>
        <Link text-24px text="[var(--text-main)]" font-bold to="/welcome/3">下一页</Link>
      </div>
    </div>)
}
