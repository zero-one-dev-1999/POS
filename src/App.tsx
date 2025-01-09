import { persistor, store } from './store'
import { ThemeProvider } from './theme'
import ModeContextProvider from './theme/modeContext'
import { Provider as ReduxProvider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter } from 'react-router-dom'
import Router from './routes'
import { setLocale } from 'yup'

setLocale({
	mixed: {
		required: 'This field is required',
	},
})

function App() {
	return (
		<ReduxProvider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<ModeContextProvider>
					<ThemeProvider>
						<BrowserRouter>
							<Router />
							{/* <Minasa /> */}
						</BrowserRouter>
					</ThemeProvider>
				</ModeContextProvider>
			</PersistGate>
		</ReduxProvider>
	)
}

export default App
