import { Button, Card, Stack, Typography } from '@mui/material'
import ReferenceMainTable from './Table'
import { useTranslation } from 'react-i18next'
import Iconify from '../iconify'
import { FC } from 'react'
import Form from './Form'
import { useDispatch } from '@/hooks/use-dispatch'
import { referenceMainActions } from '@/store/reference-main'

interface IProps {
	controller: string
}

const ReferenceMain: FC<IProps> = ({ controller }) => {
	const [t] = useTranslation()
	const dispatch = useDispatch()

	return (
		<Card>
			<Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} p={2}>
				<Typography variant='h4'>{t(controller)}</Typography>

				<Button variant='contained' color='primary' startIcon={<Iconify icon='ic:round-plus' />} onClick={() => dispatch(referenceMainActions.setFormIsOpen(true))}>
					{t('add')}
				</Button>
			</Stack>
			<ReferenceMainTable controller={controller} />
			<Form controller={controller} />
		</Card>
	)
}

export default ReferenceMain
