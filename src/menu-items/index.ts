import * as pages from '@/helpers/pages'

const MenuItems = [
	{
		path: pages.POS_REFERENCE_ROOT,
		title: 'references',
		icon: 'mdi:calendar-text-outline',
		children: [
			{
				title: 'product-category',
				icon: 'mdi:category',
				path: pages.POS_REFERENCE_CATEGORY_PAGE,
			},
			{
				title: 'unit',
				icon: 'mdi:power-socket-united-kingdom',
				path: pages.POS_REFERENCE_UNIT_PAGE,
			},
			{
				title: 'currency',
				icon: 'mdi:currency-usd',
				path: pages.POS_REFERENCE_CURRENCY_PAGE,
			},
		],
	},
	{
		path: pages.POS_PRODUCTS_PAGE,
		title: 'products',
		icon: 'tabler:brand-producthunt',
	},
	{
		path: pages.POS_WAREHOUSE_ROOT,
		title: 'warehouse',
		icon: 'mdi:warehouse',
		children: [
			{
				title: 'income',
				icon: 'mdi:application-import',
				path: pages.POS_WAREHOUSE_INCOME_INDEX_PAGE,
			},
			{
				title: 'outcome',
				icon: 'mdi:application-export',
				path: pages.POS_WAREHOUSE_OUTCOME_INDEX_PAGE,
			},
		],
	},
	{
		path: pages.POS_SELLING_PAGE,
		title: 'selling',
		icon: 'mdi:network-point-of-sale',
	},
]

export default MenuItems
