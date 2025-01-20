import { Button } from '@mui/material'
import { useTranslation } from 'react-i18next'
import Iconify from '../iconify'
import { FC } from 'react'

interface IProps {
	onClick?: () => void
}

const SaveButton: FC<IProps> = ({ onClick }) => {
	const [t] = useTranslation()

	const handleClick = () => {
		if (onClick) {
			onClick()
		}
	}

	return (
		<Button onClick={handleClick} type='submit' color='success' variant='contained' startIcon={<Iconify icon='ic:round-save' />}>
			{t('save')}
		</Button>
	)
}

export default SaveButton
