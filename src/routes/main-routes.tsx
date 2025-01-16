import AuthGuard from '@/auth/auth-guard'
import Loadable from '@/components/loadable'
import {
	POS_DASHBOARD_PAGE,
	POS_PRODUCTS_PAGE,
	POS_REFERENCE_CATEGORY_PAGE,
	POS_REFERENCE_CURRENCY_PAGE,
	POS_REFERENCE_UNIT_PAGE,
	POS_SELLING_PAGE,
	POS_WAREHOUSE_INCOME_PAGE,
	POS_WAREHOUSE_OUTCOME_PAGE,
} from '@/helpers/pages'
import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

const DashboardLayout = Loadable(lazy(() => import('@/layout/main')))
const DashboardPage = Loadable(lazy(() => import('@/pages/dashboard')))
const WarehouseIncomePage = Loadable(lazy(() => import('@/pages/warehouse/income')))
const WarehouseOutcomePage = Loadable(lazy(() => import('@/pages/warehouse/outcome')))
const SellingPage = Loadable(lazy(() => import('@/pages/selling')))
const ProductsPage = Loadable(lazy(() => import('@/pages/products')))
const ReferenceMain = Loadable(lazy(() => import('@/components/reference-main')))

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
				{
					path: POS_WAREHOUSE_INCOME_PAGE,
					element: <WarehouseIncomePage />,
				},
				{
					path: POS_WAREHOUSE_OUTCOME_PAGE,
					element: <WarehouseOutcomePage />,
				},
				{
					path: POS_SELLING_PAGE,
					element: <SellingPage />,
				},
				{
					path: POS_PRODUCTS_PAGE,
					element: <ProductsPage />,
				},
				{
					path: POS_REFERENCE_CATEGORY_PAGE,
					element: <ReferenceMain controller='category' />,
				},
				{
					path: POS_REFERENCE_UNIT_PAGE,
					element: <ReferenceMain controller='unit' />,
				},
				{
					path: POS_REFERENCE_CURRENCY_PAGE,
					element: <ReferenceMain controller='currency' />,
				},
			],
		},
	],
}

export default MainRoutes
