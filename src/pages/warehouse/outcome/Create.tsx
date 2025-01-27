import { FC, useLayoutEffect } from 'react'
import Form from './Form'
import { getProductsInWarehouseList, getProductsList } from '@/firebase/firestore/lists'

const CreateOutcome: FC = () => {
	useLayoutEffect(() => {
		getProductsList()
		getProductsInWarehouseList()
	}, [])

	return <Form />
}

export default CreateOutcome
