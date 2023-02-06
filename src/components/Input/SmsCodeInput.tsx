type Props = {
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  onClick?: () => void
}

export const SmsCodeInput: React.FC<Props> = (props) => {
  const { placeholder, value, onChange, onClick } = props
  return (
    <div flex gap-x-16px>
      <input shrink-1 b-input-text type="text" placeholder={placeholder}
        max-w="[calc(40%-8px)]"
        value={value} onChange={e => onChange?.(e.target.value)}
      />
      <button type='button' b-btn max-w="[calc(60%-8px)]" onClick={onClick}>发送验证码</button>
    </div>
  )
}
