import { persistor, store } from './store'
import { ThemeProvider } from './theme'
import ModeContextProvider from './theme/modeContext'
import { Provider as ReduxProvider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter } from 'react-router-dom'
import Router from './routes'
import { setLocale } from 'yup'
import '@/i18n/i18n'
import { auth } from './firebase/config'
import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { logoutUser } from './firebase/firestore/auth'
import { ToastContainer } from 'react-toastify'

setLocale({
	mixed: {
		required: 'This field is required',
	},
})

function App() {
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, user => {
			if (!user) {
				logoutUser()
			}
		})

		return () => unsubscribe()
	}, [auth])

	return (
		<ReduxProvider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<ModeContextProvider>
					<ThemeProvider>
						<BrowserRouter>
							<ToastContainer position='top-right' autoClose={2000} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
							<Router />
						</BrowserRouter>
					</ThemeProvider>
				</ModeContextProvider>
			</PersistGate>
		</ReduxProvider>
	)
}

export default App
