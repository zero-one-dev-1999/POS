import { persistor, store } from './store'
import { ThemeProvider } from './theme'
import ModeContextProvider from './theme/modeContext'
import { Provider as ReduxProvider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter } from 'react-router-dom'
import Minasa from './Minasa'
import Router from './routes'

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
