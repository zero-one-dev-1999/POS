import { Card, Divider } from '@mui/material'
import { FC, useEffect } from 'react'
import BasketNavigator from './BasketNavigator'
import Header from './header'
import Products from './products'
import { DetailsProvider } from './context'
import PaymentModal from './payment-modal'
import CheckModal from './Check'
import { getClientsList } from '@/firebase/firestore/clients'

const Details: FC = () => {
	useEffect(() => {
		getClientsList()
	}, [])
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
