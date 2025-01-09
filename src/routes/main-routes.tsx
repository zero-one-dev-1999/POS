import AuthGuard from '@/auth/auth-guard'
import Loadable from '@/components/loadable'
import { POS_DASHBOARD_PAGE } from '@/helpers/pages'
import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

const DashboardLayout = Loadable(lazy(() => import('@/layout/dashboard')))
const DashboardPage = Loadable(lazy(() => import('@/pages/dashboard')))

const MainRoutes = {
	path: '/',
	children: [
		{
			path: '/',
			element: (
				<AuthGuard>
					<DashboardLayout />
				</AuthGuard>
			),
			children: [
				{
					path: '*',
					element: <Navigate replace to={POS_DASHBOARD_PAGE} />,
				},
				{
					path: '/',
					element: <Navigate replace to={POS_DASHBOARD_PAGE} />,
				},
				{
					path: POS_DASHBOARD_PAGE,
					element: <DashboardPage />,
				},
			],
		},
	],
}

export default MainRoutes
