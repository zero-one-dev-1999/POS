import { Button } from '@mui/material'
import { FC } from 'react'
import { Link } from 'react-router'
import Iconify from '../iconify'
import { useTranslation } from 'react-i18next'

interface IProps {
	path: string
}

const GoBackButton: FC<IProps> = ({ path }) => {
	const [t] = useTranslation()
	return (
		<Link to={path}>
			<Button variant='outlined' color='error' startIcon={<Iconify icon='ic:round-arrow-back' />}>
				{t('go-back')}
			</Button>
		</Link>
	)
}

export default GoBackButton
