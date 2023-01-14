import { createBrowserRouter } from 'react-router-dom'
import { NotFoundPage } from '../pages/NotFoundPage'
import { MainLayout } from '../layouts/MainLayout'
import { WelcomeRoutes } from '../layouts/WelcomeRoutes'

export const router = createBrowserRouter([
  {
    path: '/home',
    element: <div>home</div>
  },
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <NotFoundPage />,
    children: [
      WelcomeRoutes,
    ],
  },
])
