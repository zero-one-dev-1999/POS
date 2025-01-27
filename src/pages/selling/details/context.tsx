import { createContext, useContext, useState } from 'react'

const DetailsContext = createContext<any>(null)

const useDetailsContext = () => useContext(DetailsContext)

const DetailsProvider = ({ children }) => {
	const [currencyId, setCurrencyId] = useState<string | null>(null)

	return <DetailsContext.Provider value={{ currencyId, setCurrencyId }}>{children}</DetailsContext.Provider>
}

export { DetailsProvider, useDetailsContext }
