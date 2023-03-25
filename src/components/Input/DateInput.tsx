import { usePopup } from '../../hooks/usePopup'
import { time } from '../../lib/time'
import { DatePicker } from '../DatePicker'

type Props = {
  value?: string
  onChange?: (v: string) => void
  className?: string
  placeholder?: string
}

export const DateInput: React.FC<Props> = (props) => {
  const { value, onChange, className, placeholder } = props
  const { toggle, popup, hide } = usePopup({
    children: <DatePicker
      onConfirm={(d) => { onChange?.(time(d).isoString); hide() }}
      onCancel={() => hide()} />
  })
  return (
    <>
      {popup}
      <input className={className} b-input-text type='text' readOnly placeholder={placeholder}
        value={value} onClick={toggle} />
    </>
  )
}
