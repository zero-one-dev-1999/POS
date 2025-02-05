import { Card, Divider } from '@mui/material'
import { FC } from 'react'
import BasketNavigator from './BasketNavigator'
import Header from './header'
import Products from './products'
import { DetailsProvider } from './context'
import PaymentModal from './payment-modal'
import CheckModal from './Check'

const Details: FC = () => {
	return (
		<DetailsProvider>
			<Card sx={{ pt: '12px', px: '8px', pb: '0px', height: '100%', overflowY: 'auto', scrollbarWidth: 'thin' }}>
				<Header />
				<BasketNavigator />
				<Divider sx={{ mb: '5px' }} />
				<Products />
			</Card>

			<PaymentModal />
			<CheckModal />
		</DetailsProvider>
	)
}

export default Details
