import { createSlice } from '@reduxjs/toolkit'

interface IUser {
	id: number
	password: string
	username: string
}

interface IAppState {
	user: IUser | null
	accessToken: string | null
	isAuth: boolean
	hasAccess: boolean
}

const initialState: IAppState = {
	user: null,
	accessToken: null,
	isAuth: false,
	hasAccess: false,
}

const { actions: appActions, reducer } = createSlice({
	name: 'app',
	initialState,
	reducers: {
		setUser(state, { payload }) {
			state.user = payload
		},
		setAccessToken(state, { payload }) {
			state.accessToken = payload
		},
		setIsAuth(state, { payload }) {
			state.isAuth = payload
		},
		setHasAccess(state, { payload }) {
			state.hasAccess = payload
		},
		reset(state) {
			state.user = null
			state.accessToken = null
			state.isAuth = false
			state.hasAccess = false
		},
	},
})

export { appActions, reducer as default }
