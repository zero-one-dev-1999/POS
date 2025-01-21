import { Button } from '@mui/material'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { generatePath, useNavigate, useParams } from 'react-router'
import Iconify from '../iconify'

interface IProps {
	action: string | (() => void)
	id?: string
}

const UpdateButton: FC<IProps> = ({ action, id = null }) => {
	const [t] = useTranslation()
	const navigate = useNavigate()
	const params = useParams()

	const handleClick = () => {
		if (typeof action === 'string') {
			if (!id) {
				navigate(generatePath(action, { id: params.id }))
			} else {
				navigate(generatePath(action, { id }))
			}
		} else {
			action()
		}
	}

	return (
		<Button variant='contained' color='success' startIcon={<Iconify icon='ic:round-edit' />} onClick={handleClick}>
			{t('edit')}
		</Button>
	)
}

export default UpdateButton
