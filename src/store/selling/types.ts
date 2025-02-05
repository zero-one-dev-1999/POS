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
	product_name: string
	category_name: string
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
	loading: boolean
}

interface IBasketState {
	page: number
	products: Array<Array<IProduct>>
	loading: boolean
}

interface ISellingPayload {
	discount_price: number
	cash: number
	terminal: number
	debt: number
	client_id: string | undefined
	currency_id: string | null
	products: Array<IProduct>
}

export type { IState, IProduct, IBasketState, ISellingPayload }
