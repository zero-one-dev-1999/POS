import AuthGuard from '@/auth/auth-guard'
import Loadable from '@/components/loadable'
import {
	POS_DASHBOARD_PAGE,
	POS_PRODUCTS_PAGE,
	POS_REFERENCE_CATEGORY_PAGE,
	POS_REFERENCE_CURRENCY_PAGE,
	POS_REFERENCE_UNIT_PAGE,
	POS_SELLING_PAGE,
	POS_WAREHOUSE_INCOME_CREATE_PAGE,
	POS_WAREHOUSE_INCOME_INDEX_PAGE,
	POS_WAREHOUSE_INCOME_UPDATE_PAGE,
	POS_WAREHOUSE_INCOME_VIEW_PAGE,
	POS_WAREHOUSE_OUTCOME_CREATE_PAGE,
	POS_WAREHOUSE_OUTCOME_INDEX_PAGE,
	POS_WAREHOUSE_OUTCOME_UPDATE_PAGE,
	POS_WAREHOUSE_OUTCOME_VIEW_PAGE,
} from '@/helpers/pages'
import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

const DashboardLayout = Loadable(lazy(() => import('@/layout/main')))
const DashboardPage = Loadable(lazy(() => import('@/pages/dashboard')))
const WarehouseIncomePage = Loadable(lazy(() => import('@/pages/warehouse/income')))
const WarehouseIncomeCreatePage = Loadable(lazy(() => import('@/pages/warehouse/income/Create')))
const WarehouseIncomeUpdatePage = Loadable(lazy(() => import('@/pages/warehouse/income/Update')))
const WarehouseIncomeViewPage = Loadable(lazy(() => import('@/pages/warehouse/income/View')))
const WarehouseOutcomePage = Loadable(lazy(() => import('@/pages/warehouse/outcome')))
const WarehouseOutcomeCreatePage = Loadable(lazy(() => import('@/pages/warehouse/outcome/Create')))
const WarehouseOutcomeUpdatePage = Loadable(lazy(() => import('@/pages/warehouse/outcome/Update')))
const WarehouseOutcomeViewPage = Loadable(lazy(() => import('@/pages/warehouse/outcome/View')))
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
					path: POS_WAREHOUSE_INCOME_INDEX_PAGE,
					element: <WarehouseIncomePage />,
				},
				{
					path: POS_WAREHOUSE_INCOME_CREATE_PAGE,
					element: <WarehouseIncomeCreatePage />,
				},
				{
					path: POS_WAREHOUSE_INCOME_UPDATE_PAGE,
					element: <WarehouseIncomeUpdatePage />,
				},
				{
					path: POS_WAREHOUSE_INCOME_VIEW_PAGE,
					element: <WarehouseIncomeViewPage />,
				},
				{
					path: POS_WAREHOUSE_OUTCOME_INDEX_PAGE,
					element: <WarehouseOutcomePage />,
				},
				{
					path: POS_WAREHOUSE_OUTCOME_CREATE_PAGE,
					element: <WarehouseOutcomeCreatePage />,
				},
				{
					path: POS_WAREHOUSE_OUTCOME_UPDATE_PAGE,
					element: <WarehouseOutcomeUpdatePage />,
				},
				{
					path: POS_WAREHOUSE_OUTCOME_VIEW_PAGE,
					element: <WarehouseOutcomeViewPage />,
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
