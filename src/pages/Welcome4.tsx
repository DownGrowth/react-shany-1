import { useNavigate } from 'react-router-dom'
import { useLocalStore } from '../stores/useLocalStore'
import p4 from '../assets/images/welcome4.svg'
export const Welcome4: React.FC = () => {
  const { setHasReadWelcomes } = useLocalStore()
  const nav = useNavigate()
  const onSkip = () => {
    setHasReadWelcomes(true)
    nav('/home')
  }
  return (<div text-center>
    <img w-168px h-168px src={p4} mt-16px/>
    <h2 text-28px mb-8px>
      上传云端 <br/>
      不怕丢失
    </h2>
    <div mt-84px>
    <span text-24px text="[var(--text-main)]" font-bold onClick={onSkip}>开启应用</span>
    </div>
    </div>)
}
