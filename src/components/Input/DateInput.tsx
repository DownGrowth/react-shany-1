type Props = {
  value?: string
  onChange?: (v: string) => void
  className?: string
  placeholder?: string
}

export const DateInput: React.FC<Props> = (props) => {
  const { value, className, placeholder } = props
  return (
    <input className={className} b-input-text type='text' readOnly placeholder={placeholder}
    value={value} />
  )
}
