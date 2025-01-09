import { createContext, FC, PropsWithChildren, useContext, useEffect, useState } from 'react'

const ModeContext = createContext({ mode: 'light', changeMode: (mode: 'light' | 'dark') => {} })

const useModeContext = () => useContext(ModeContext)

const ModeContextProvider: FC<PropsWithChildren> = ({ children }) => {
	const [mode, setMode] = useState<'light' | 'dark'>('light')

	const changeMode = (mode: 'light' | 'dark') => {
		localStorage.setItem('mode', mode)
		setMode(mode)
	}

	useEffect(() => {
		if (localStorage.getItem('mode')) {
			setMode(localStorage.getItem('mode') as 'light' | 'dark')
		} else {
			localStorage.setItem('mode', 'light')
		}
	}, [])

	return <ModeContext.Provider value={{ mode, changeMode }}>{children}</ModeContext.Provider>
}

export { useModeContext, ModeContextProvider as default }
