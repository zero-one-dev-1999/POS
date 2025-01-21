import { FC, useLayoutEffect } from 'react'
import Form from './Form'
import { getCurrenciesList, getProductsInWarehouseList, getProductsList } from '@/firebase/firestore/lists'

const CreateOutcome: FC = () => {
	useLayoutEffect(() => {
		getProductsList()
		getProductsInWarehouseList()
		getCurrenciesList()
	}, [])

	return <Form />
}

export default CreateOutcome
