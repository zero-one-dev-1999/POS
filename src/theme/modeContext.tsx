import { createContext, FC, PropsWithChildren, useContext, useEffect, useState } from 'react'

const ModeContext = createContext({ mode: 'light', toggleMode: () => {} })

const useModeContext = () => useContext(ModeContext)

const ModeContextProvider: FC<PropsWithChildren> = ({ children }) => {
	const [mode, setMode] = useState<'light' | 'dark'>('light')

	const toggleMode = () => {
		localStorage.setItem('mode', mode === 'light' ? 'dark' : 'light')
		setMode(mode === 'light' ? 'dark' : 'light')
	}

	useEffect(() => {
		if (localStorage.getItem('mode')) {
			setMode(localStorage.getItem('mode') as 'light' | 'dark')
		} else {
			localStorage.setItem('mode', 'light')
		}
	}, [])

	return <ModeContext.Provider value={{ mode, toggleMode }}>{children}</ModeContext.Provider>
}

export { useModeContext, ModeContextProvider as default }
