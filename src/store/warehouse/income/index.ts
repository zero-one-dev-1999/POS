import { createSlice } from '@reduxjs/toolkit'
import { IData, IFormValues } from './types'

interface IState {
	data: IData[]
	loading: {
		data: boolean
		form: boolean
	}
	pagination: {
		page: number
		sizePerPage: number
		totalSize: number
		pageCount: number
	}
	form: {
		isUpdate: boolean
		values: IFormValues | null
	}
	view: IFormValues | null
}

const initialState: IState = {
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
	name: 'warehouse-income',
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

export { actions as warehouseIncomeActions, reducer as default }
