import { Link } from 'react-router-dom'
import p4 from '../assets/images/welcome4.svg'
export const Welcome4: React.FC = () => {
  return (<div text-center>
    <img w-168px h-168px src={p4} mt-16px/>
    <h2 text-28px mb-8px>
      上传云端 <br/>
      不怕丢失
    </h2>
    <div mt-84px>
        <Link text-24px text="[var(--text-main)]" font-bold to="/welcome/xxx">开启应用</Link>
    </div>
    </div>)
}
