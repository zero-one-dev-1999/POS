import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	data: [],
	loading: {
		data: false,
		form: false,
	},
	pagination: { page: 1, sizePerPage: 10, totalSize: 0, pageCount: 0 },
	form: {
		isOpen: false,
		isUpdate: false,
		values: null,
	},
}

const { actions, reducer } = createSlice({
	initialState,
	name: 'products',
	reducers: {
		setData(state, { payload }) {
			state.data = payload
		},
		setPagination(state, { payload }) {
			state.pagination = payload
		},
		setDataLoading(state, { payload }) {
			state.loading.data = payload
		},
		setFormLoading(state, { payload }) {
			state.loading.form = payload
		},
		setFormValues(state, { payload }) {
			state.form.values = payload
		},
		setFormIsOpen(state, { payload }) {
			state.form.isOpen = payload
		},
		setFormIsUpdate(state, { payload }) {
			state.form.isUpdate = payload
		},
		resetForm(state) {
			state.form.isOpen = false
			state.form.isUpdate = false
			state.form.values = null
		},
	},
})

export { actions as productsActions, reducer as default }
