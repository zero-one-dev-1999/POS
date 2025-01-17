import { createSlice } from '@reduxjs/toolkit'

const initialState: { lists: any } = {
	lists: {},
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
