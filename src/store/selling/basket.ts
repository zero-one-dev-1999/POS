import { createSlice } from '@reduxjs/toolkit'
import { IBasketState } from './types'

const initialState: IBasketState = {
	page: 1,
	products: [[]],
	loading: false,
}

const productsCountOnBasket = (orders: IBasketState['products'], product_id: string) =>
	orders.reduce((count, orderArray) => count + orderArray.reduce((innerCount, order) => innerCount + (order.product_id === product_id ? +order.count : 0), 0), 0)

const { actions, reducer } = createSlice({
	initialState,
	name: 'pos-basket',
	reducers: {
		addPage(state) {
			state.products.push([])
		},
		setPage(state, { payload }) {
			state.page = payload
		},
		clearBasketAllProducts(state) {
			state.products = [[]]
		},
		setLoading(state, { payload }) {
			state.loading = payload
		},
		addOrder(state, { payload }) {
			state.products.push(payload)
		},
		removePage(state, { payload }) {
			state.products.splice(payload - 1, 1)
		},
		addCheckProductsToBasket(state, { payload }) {
			if (Array.isArray(payload)) {
				state.products = [...state.products, payload]
			}
		},
		clearBasket(state) {
			state.products = state.products?.length === 1 ? [[]] : state.products.filter((_, index) => index !== state.page - 1)
			state.page = 1
		},

		setProducts(state, { payload }) {
			state.products = state.products.map((item, index) => {
				if (index === state.page - 1) {
					return payload
				}
				return item
			})
		},
		removeProduct(state, { payload }) {
			state.products = state.products.map((item, index) => {
				if (index === state.page - 1) {
					return item?.filter(product => !(product.product_id === payload))
				}
				return item
			})
		},
		changeCount(state, { payload: { value, product_id } }) {
			state.products = state.products.map((item, index) => {
				if (index === state.page - 1) {
					return item?.map(pr => {
						if (pr.product_id === product_id) {
							return {
								...pr,
								count: value || 1,
							}
						}
						return pr
					})
				}
				return item
			})
		},
		decrementCount(state, { payload }) {
			state.products = state.products.map((item, index) => {
				if (index === state.page - 1) {
					return item?.map(pr => {
						if (pr.product_id === payload && +pr.count > 1) {
							return {
								...pr,
								count: +pr.count - 1,
							}
						}
						return pr
					})
				}
				return item
			})
		},
		incrementCount(state, { payload }) {
			state.products = state.products.map((item, index) => {
				if (index === state.page - 1) {
					return item?.map(pr => {
						if (pr?.product_id === payload) {
							return {
								...pr,
								count: +pr.quantity > productsCountOnBasket(JSON.parse(JSON.stringify(state.products)), payload) ? +pr.count + 1 : +pr.count,
							}
						}
						return pr
					})
				}
				return item
			})
		},
		addProduct(state, { payload }) {
			if (state.products?.[state.page - 1]?.find(item => item.product_id === payload.product_id)) {
				state.products = state.products.map((item, index) => {
					if (index === state.page - 1) {
						return item?.map(pr => {
							if (pr.product_id === payload.product_id) {
								return {
									...pr,
									count: +pr.quantity > productsCountOnBasket(JSON.parse(JSON.stringify(state.products)), payload.product_id) ? +pr.count + 1 : +pr.count,
								}
							}
							return pr
						})
					}
					return item
				})
			} else {
				state.products = state.products.map((item, index) => {
					if (index === state.page - 1) {
						return [{ ...payload, count: 1 }, ...item]
					}
					return item
				})
			}
		},
	},
})

export { reducer as default, actions as basketActions, productsCountOnBasket }
