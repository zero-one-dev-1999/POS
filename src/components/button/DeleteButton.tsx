import { Button } from '@mui/material'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import Iconify from '../iconify'

interface IProps {
	onClick?: () => void
}

const DeleteButton: FC<IProps> = ({ onClick }) => {
	const [t] = useTranslation()

	const handleClick = () => {
		if (onClick) {
			onClick()
		}
	}

	return (
		<Button type='button' onClick={handleClick} color='error' variant='contained' startIcon={<Iconify icon='ic:round-delete' />}>
			{t('delete')}
		</Button>
	)
}

export default DeleteButton
