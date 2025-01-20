import { Button } from '@mui/material'
import { FC } from 'react'
import Iconify from '../iconify'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'

interface IProps {
	action: string | (() => void)
}
const CreateButton: FC<IProps> = ({ action }) => {
	const [t] = useTranslation()
	const navigate = useNavigate()

	const handleClick = () => {
		if (typeof action === 'string') {
			navigate(action)
		} else {
			action()
		}
	}

	return (
		<Button variant='contained' color='primary' startIcon={<Iconify icon='ic:round-plus' />} onClick={handleClick}>
			{t('add')}
		</Button>
	)
}

export default CreateButton
