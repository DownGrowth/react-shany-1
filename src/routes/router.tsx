import { createBrowserRouter } from 'react-router-dom'
import { RedirectToWelcome1 } from '../components/RedirectToWelcome'
import { MainLayout } from '../layouts/MainLayout'
import { WelcomeRoutes } from '../layouts/WelcomeRoutes'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <RedirectToWelcome1 />,
    children: [
      WelcomeRoutes,
    ],
  },
])
