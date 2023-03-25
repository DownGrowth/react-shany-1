import { RouterProvider } from 'react-router-dom'
import vhCheck from 'vh-check'
import { useEffect } from 'react'
import { router } from './routes/router'
import './global.scss'
import 'virtual:uno.css'
import './app.scss'
import 'virtual:svgsprites'
import { usePopup } from './hooks/usePopup'
import { Loading } from './components/Loading'
import { useLoadingStore } from './stores/useLoadingStore'

vhCheck()
export const App: React.FC = () => {
  const { visible } = useLoadingStore()
  const { popup, hide, show } = usePopup({ children: <Loading className="p-8px"/>, position: 'center', unableOnclick: true })
  useEffect(() => {
    visible ? show() : hide()
  }, [visible])
  return (
    <div>
      <RouterProvider router={router} />
        {popup}
    </div>
  )
}
