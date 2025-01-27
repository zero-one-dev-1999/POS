import { FC, useLayoutEffect } from 'react'
import Form from './Form'
import { getProductsList } from '@/firebase/firestore/lists'

const CreateIncome: FC = () => {
	useLayoutEffect(() => {
		getProductsList()
	}, [])

	return <Form />
}

export default CreateIncome
