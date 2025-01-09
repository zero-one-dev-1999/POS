import Minasa from './Minasa'
import { persistor, store } from './store'
import { ThemeProvider } from './theme'
import ModeContextProvider from './theme/modeContext'
import { Provider as ReduxProvider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

function App() {
	return (
		<ReduxProvider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<ModeContextProvider>
					<ThemeProvider>
						<Minasa />
					</ThemeProvider>
				</ModeContextProvider>
			</PersistGate>
		</ReduxProvider>
	)
}

export default App
