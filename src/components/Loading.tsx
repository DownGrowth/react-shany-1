import styled from 'styled-components'
import c from 'classnames'
import { Icon } from './Icon'

const Div = styled.div`
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  svg {
    animation: spin 1.25s linear infinite;
  }
`

interface Props {
  className?: string
  message?: string
}

export const Loading: React.FC<Props> = ({ className, message }) => {
  return (
    <Div className={c('flex flex-col justify-center items-center', className)}>
      <Icon name="loading" className='fill-#C1E9F8 w-64px h-64px' />
      {message ? <p p-8px text-lg>{message}</p> : ''}
    </Div>
  )
}
