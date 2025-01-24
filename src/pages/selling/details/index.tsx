import { Card, Divider, Stack, Typography } from '@mui/material'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import BasketNavigator from './BasketNavigator'
import Products from './Products'

const Details: FC = () => {
	const [t] = useTranslation()

	return (
		<Card sx={{ pt: '12px', px: '8px', pb: '0px', height: '100%', overflowY: 'auto', scrollbarWidth: 'thin' }}>
			<Stack sx={{ height: '40px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
				<Typography variant='h4'>{t('basket')}</Typography>
			</Stack>
			<BasketNavigator />
			<Divider sx={{ mb: '5px' }} />
			<Products />
		</Card>
	)
}

export default Details
