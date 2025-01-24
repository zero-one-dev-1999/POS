interface IProduct {
	buying_price: number
	category_id: string
	currency_id: string
	product_id: string
	quantity: number
	selling_price: number
	unit_id: string
	user_id: string
	count: number
}

interface IState {
	filters: { category_id: string; name: string }
	categories: {
		loading: boolean
		data: Array<{ value: string; label: string }>
	}
	products: {
		loading: boolean
		data: Array<IProduct>
	}
}

interface IBasketState {
	page: number
	products: Array<Array<IProduct>>
	loading: boolean
}

export type { IState, IProduct, IBasketState }
