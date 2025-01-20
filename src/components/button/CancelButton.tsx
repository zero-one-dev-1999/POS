import { Button } from '@mui/material'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import Iconify from '../iconify'

interface IProps {
	onClick: () => void
}

const CancelButton: FC<IProps> = ({ onClick }) => {
	const [t] = useTranslation()

	return (
		<Button type='button' onClick={onClick} color='error' variant='outlined' startIcon={<Iconify icon='ic:round-cancel' />}>
			{t('cancel')}
		</Button>
	)
}

export default CancelButton
