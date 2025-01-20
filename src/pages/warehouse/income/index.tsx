import Iconify from '@/components/iconify'
import { Button, Card, Stack, Typography } from '@mui/material'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import Table from './Table'
import { useNavigate } from 'react-router'
import { POS_WAREHOUSE_INCOME_CREATE_PAGE } from '@/helpers/pages'
import CreateButton from '@/components/button/CreateButton'

const Income: FC = () => {
	const [t] = useTranslation()
	const navigate = useNavigate()

	return (
		<Card>
			<Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} p={2}>
				<Typography variant='h4'>{t('income')}</Typography>
				<CreateButton action={POS_WAREHOUSE_INCOME_CREATE_PAGE} />
			</Stack>
			<Table />
		</Card>
	)
}

export default Income
