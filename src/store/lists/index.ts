import { createSlice } from '@reduxjs/toolkit'

interface IStatusList {
	value: 1 | 2
	label: 'Saqlangan' | 'Saqlanmagan'
}

interface IList {
	value: string
	label: string
}

interface ILists {
	[key: string]: IList[]
}

const initialState: { lists: ILists; statusList: IStatusList[] } = {
	lists: {
		categoriesList: [],
		unitsList: [],
		productsList: [],
		currenciesList: [],
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
