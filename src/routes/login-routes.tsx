import GuestGuard from '@/auth/guest-guard'
import Loadable from '@/components/loadable'
import { POS_LOGIN_PAGE, POS_REGISTER_PAGE } from '@/helpers/pages'
import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

const LoginLayout = Loadable(lazy(() => import('@/layout/login')))
const LoginPage = Loadable(lazy(() => import('@/pages/auth/login')))
const RegisterPage = Loadable(lazy(() => import('@/pages/auth/register')))

const LoginRoutes = {
	path: '/',
	children: [
		{
			path: '/',
			element: (
				<GuestGuard>
					<LoginLayout />
				</GuestGuard>
			),
			children: [
				{
					path: '*',
					element: <Navigate replace to={POS_LOGIN_PAGE} />,
				},
				{
					path: '/',
					element: <Navigate replace to={POS_LOGIN_PAGE} />,
				},
				{
					path: POS_LOGIN_PAGE,
					element: <LoginPage />,
				},
				{
					path: POS_REGISTER_PAGE,
					element: <RegisterPage />,
				},
			],
		},
	],
}

export default LoginRoutes
