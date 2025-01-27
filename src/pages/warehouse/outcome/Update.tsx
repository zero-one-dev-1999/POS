import { getProductsList } from '@/firebase/firestore/lists'
import { FC, useLayoutEffect } from 'react'
import Form from './Form'
import { updateStartOutcomeDoc } from '@/firebase/firestore/outcome'
import { useParams } from 'react-router'

const UpdateOutcome: FC = () => {
	const { id } = useParams()

	useLayoutEffect(() => {
		updateStartOutcomeDoc(id as string)
		getProductsList()
	}, [])

	return <Form />
}

export default UpdateOutcome
