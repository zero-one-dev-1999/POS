import Minasa from './Minasa'
import { ThemeProvider } from './theme'
import ModeContextProvider from './theme/modeContext'

function App() {
	return (
		<ModeContextProvider>
			<ThemeProvider>
				<Minasa />
			</ThemeProvider>
		</ModeContextProvider>
	)
}

export default App
