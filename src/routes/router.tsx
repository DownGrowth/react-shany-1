import type { AxiosError } from 'axios'
import { Outlet, createHashRouter } from 'react-router-dom'
import loadable from '@loadable/component'
import { Root } from '../components/Root'
import { ErrorEmptyData, ErrorUnauthorized } from '../error'
import { WelcomeLayout } from '../layouts/WelcomeLayout'
import { ErrorPage } from '../pages/ErrorPage'
import { Home } from '../pages/Home'
import { ItemsNewPage } from '../pages/ItemsNewPage'
import { ItemsPage } from '../pages/ItemsPage'
import { ItemsPageError } from '../pages/ItemsPageError'
import { SignInPage } from '../pages/SignInPage'
import { TagsEditPage } from '../pages/TagsEditPage'
import { TagsNewPage } from '../pages/TagsNewPage'
import { Welcome1 } from '../pages/Welcome1'
import { Welcome2 } from '../pages/Welcome2'
import { Welcome3 } from '../pages/Welcome3'
import { Welcome4 } from '../pages/Welcome4'
import { ajax } from '../lib/ajax'
import { ComingSoonPage } from '../pages/ComingSoonPage'
import { Loading } from '../components/Loading'
const StatisticsPage = loadable(() => import('../pages/StatisticsPage'), { fallback: <Loading className='h-screen'/> })

export const router = createHashRouter([
  {
    path: '/home',
    element: <Home />
  },
  {
    path: '/',
    element: <Root />
  },
  {
    path: '/welcome',
    element: <WelcomeLayout />,
    children: [
      { path: '1', element: <Welcome1 /> },
      { path: '2', element: <Welcome2 /> },
      { path: '3', element: <Welcome3 /> },
      { path: '4', element: <Welcome4 /> },
    ],
  },
  { path: '/sign_in', element: <SignInPage /> },
  {
    // 这里的路由都需要登录
    path: '/',
    element: <Outlet />,
    errorElement: <ErrorPage />,
    loader: async () => ajax.get<Resource<User>>('/api/v1/me').catch((e) => {
      if (e.response?.status === 401 ?? 404) { throw new ErrorUnauthorized() }
    }),
    children: [
      {
        path: '/items',
        element: <ItemsPage />,
        errorElement: <ItemsPageError />,
        loader: async () => {
          const onError = (error: AxiosError) => {
            if (error.response?.status === 401) {
              throw new ErrorUnauthorized()
            }
            throw Error
          }
          return async () => {
            const response = await ajax.get<Resources<Item>>('/api/v1/items?page=1').catch(onError)
            if (response.data.resources.length > 0) {
              return response.data
            } else {
              throw new ErrorEmptyData()
            } }
        }
      },
      { path: '/tags/new', element: <TagsNewPage /> },
      { path: '/tags/:id', element: <TagsEditPage /> },
      { path: '/items/new', element: <ItemsNewPage/>, },
      { path: '/statistics', element: <StatisticsPage /> },
      { path: '/export', element: <ComingSoonPage/> },
      { path: '/noty', element: <ComingSoonPage/> },
    ],
  },
])
