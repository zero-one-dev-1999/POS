import { Button } from '@mui/material'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import Iconify from '../iconify'

interface IProps {
	onClick: () => void
}

const SaveAndFinishButton: FC<IProps> = ({ onClick }) => {
	const [t] = useTranslation()

	const handleClick = () => {
		if (onClick) {
			onClick()
		}
	}

	return (
		<Button onClick={handleClick} color='info' variant='contained' startIcon={<Iconify icon='ic:round-save' />}>
			{t('save-and-finish')}
		</Button>
	)
}

export default SaveAndFinishButton
