import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	data: [],
	loading: {
		data: false,
		form: false,
	},
	pagination: { page: 1, sizePerPage: 10, totalSize: 0, pageCount: 0 },
	form: {
		isUpdate: false,
		values: null,
	},
	view: null,
}

const { actions, reducer } = createSlice({
	initialState,
	name: 'warehouse-outcome',
	reducers: {
		setData(state, { payload }) {
			state.data = payload
		},
		setDataLoading(state, { payload }) {
			state.loading.data = payload
		},
		setFormIsUpdate(state, { payload }) {
			state.form.isUpdate = payload
		},
		setFormValues(state, { payload }) {
			state.form.values = payload
		},
		setFormLoading(state, { payload }) {
			state.loading.form = payload
		},
		setView(state, { payload }) {
			state.view = payload
		},
		resetForm(state) {
			state.form.isUpdate = false
			state.form.values = null
		},
	},
})

export { actions as warehouseOutcomeActions, reducer as default }
