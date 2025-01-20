import { FC, useLayoutEffect } from 'react'
import Form from './Form'
import { getCurrenciesList, getProductsList } from '@/firebase/firestore/lists'

const CreateIncome: FC = () => {
	useLayoutEffect(() => {
		getProductsList()
		getCurrenciesList()
	}, [])

	return <Form />
}

export default CreateIncome
