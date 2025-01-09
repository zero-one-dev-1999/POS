import { useRoutes } from 'react-router-dom'
import LoginRoutes from './login-routes'
import MainRoutes from './main-routes'

export const Routes = [LoginRoutes, MainRoutes]

const Router = () => useRoutes(Routes)

export default Router
