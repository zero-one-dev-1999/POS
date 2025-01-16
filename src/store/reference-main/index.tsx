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
	name: 'reference-main',
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
	},
})

export { actions as referenceMainActions, reducer as default }