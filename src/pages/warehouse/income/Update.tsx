import { getCurrenciesList, getProductsList } from '@/firebase/firestore/lists'
import { FC, useLayoutEffect } from 'react'
import Form from './Form'
import { updateStartIncomeDoc } from '@/firebase/firestore/income'
import { useParams } from 'react-router'

const UpdateIncome: FC = () => {
	const { id } = useParams()

	useLayoutEffect(() => {
		updateStartIncomeDoc(id as string)
		getProductsList()
		getCurrenciesList()
	}, [])

	return <Form />
}

export default UpdateIncome
