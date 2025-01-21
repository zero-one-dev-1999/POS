import { Card, Stack, Typography } from '@mui/material'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import Table from './Table'
import { POS_WAREHOUSE_OUTCOME_CREATE_PAGE } from '@/helpers/pages'
import CreateButton from '@/components/button/CreateButton'

const Outcome: FC = () => {
	const [t] = useTranslation()

	return (
		<Card>
			<Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} p={2}>
				<Typography variant='h4'>{t('outcome')}</Typography>
				<CreateButton action={POS_WAREHOUSE_OUTCOME_CREATE_PAGE} />
			</Stack>
			<Table />
		</Card>
	)
}

export default Outcome
