import { RouterProvider } from 'react-router-dom'
import vhCheck from 'vh-check'
import { createContext } from 'react'
import { router } from './routes/router'
import './global.scss'
import 'virtual:uno.css'
import './app.scss'
import 'virtual:svgsprites'
import { usePopup } from './hooks/usePopup'
import { Loading } from './components/Loading'

vhCheck()
export const LoadingContext = createContext({
  show: () => { }, hide: () => { }
})
export const App: React.FC = () => {
  const { popup, hide, show } = usePopup({ children: <Loading className="p-8px" />, position: 'center' })
  return (
    <div>
      <LoadingContext.Provider value={{ show, hide } }>
      <RouterProvider router={router} />
        {popup}
        </LoadingContext.Provider>
    </div>
  )
}
