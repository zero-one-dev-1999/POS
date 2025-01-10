import * as pages from '@/helpers/pages'

const MenuItems = [
	{
		path: pages.POS_WAREHOUSE_ROOT,
		title: 'warehouse',
		icon: 'mdi:warehouse',
		children: [
			{
				title: 'income',
				icon: 'mdi:application-import',
				path: pages.POS_WAREHOUSE_INCOME_PAGE,
			},
			{
				title: 'outcome',
				icon: 'mdi:application-export',
				path: pages.POS_WAREHOUSE_OUTCOME_PAGE,
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
