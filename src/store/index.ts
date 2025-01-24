import reducers from './reducers'
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist'
import { encryptTransform } from 'redux-persist-transform-encrypt'
import { configureStore } from '@reduxjs/toolkit'

const persistedReducer = persistReducer<any>(
	{
		storage,
		version: 5,
		key: 'root',
		whitelist: ['App', 'Basket'],
		transforms: [
			encryptTransform({
				secretKey: 'QuYu1N1fZWuN3SFJ99d8l1CKyBFKs2+9VtBEjSWc0URLLcmoGnuF1KW/PHC/xgse',
			}),
		],
	},
	reducers,
)

const store = configureStore({
	reducer: persistedReducer,
	// devTools: import.meta.env.DEV,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: ['persist/PERSIST'],
				ignoredPaths: ['register'],
			},
		}),
})

const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof reducers>

export { store, persistor }
