import type { ReactNode } from 'react'
import { useState } from 'react'
import ReactDOM from 'react-dom'
import { Popup } from '../components/Popup'
import { rootDiv } from '../main'

type Options = {
  initVisible?: boolean
  children: ReactNode
  position?: 'bottom' | 'center'
  unableOnclick?: boolean
  zIndex?: string
}
export const usePopup = (options: Options) => {
  const { initVisible = false, children, position, unableOnclick = false, zIndex } = options
  const [visible, setVisible] = useState(initVisible)
  const popup = ReactDOM.createPortal(<Popup zIndex={zIndex} visible={visible} position={position} onClickMask={unableOnclick ? () => {} : () => { setVisible(false) }} >
    {children}
  </Popup>, rootDiv)
  return {
    popup,
    show() { setVisible(true) },
    hide() { setVisible(false) },
    toggle() { setVisible(!visible) }
  }
}
