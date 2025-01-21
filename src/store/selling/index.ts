import { createSlice } from '@reduxjs/toolkit'
import { IState } from './types'

const initialState: IState = {
	filters: {
		category_id: '',
		name: '',
	},
	categories: {
		loading: false,
		data: [],
	},
	products: {
		loading: false,
		data: [],
	},
}

const { actions, reducer } = createSlice({
	name: 'selling',
	initialState,
	reducers: {
		setFilters(state, { payload }) {
			state.filters = { ...state.filters, ...payload }
		},
		setCategoriesData(state, { payload }) {
			state.categories.data = payload
		},
		setCategoriesLoading(state, { payload }) {
			state.categories.loading = payload
		},
		setProductsData(state, { payload }) {
			state.products.data = payload
		},
		setProductsLoading(state, { payload }) {
			state.products.loading = payload
		},
	},
})

export { actions as sellingActions, reducer as default }
