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

type ListsKeys = 'categoriesList' | 'unitsList' | 'productsList' | 'currenciesList' | 'productsInWarehouseList'

type Lists = Record<ListsKeys, IList[]>

const initialState: { lists: Lists; statusList: IStatusList[] } = {
	lists: {
		categoriesList: [],
		unitsList: [],
		productsList: [],
		currenciesList: [],
		productsInWarehouseList: [],
	},
	statusList: [
		{ value: 1, label: 'Saqlanmagan' },
		{ value: 2, label: 'Saqlangan' },
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
