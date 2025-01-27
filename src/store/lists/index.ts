import { createSlice } from '@reduxjs/toolkit'

interface IStatusList {
	value: 1 | 2
	label: 'Saqlangan' | 'Saqlanmagan'
}

interface IList {
	value: string
	label: string
	[key: string]: any
}

type ListsKeys = 'categoriesList' | 'unitsList' | 'productsList' | 'productsInWarehouseList'

type Lists = Record<ListsKeys, IList[]>

const initialState: { lists: Lists; statusList: IStatusList[]; currenciesList: IList[] } = {
	lists: {
		categoriesList: [],
		unitsList: [],
		productsList: [],
		productsInWarehouseList: [],
	},
	statusList: [
		{ value: 1, label: 'Saqlanmagan' },
		{ value: 2, label: 'Saqlangan' },
	],
	currenciesList: [
		{ value: 'USD', label: 'USD', UZS: 13000, USD: 1 },
		{ value: 'UZS', label: 'UZS', USD: 1 / 13000, UZS: 1 },
	],
}

const { actions, reducer } = createSlice({
	name: 'lists',
	initialState,
	reducers: {
		setList(state, { payload }) {
			state.lists = { ...state.lists, ...payload }
		},
	},
})

export { actions as listsActions, reducer as default }
