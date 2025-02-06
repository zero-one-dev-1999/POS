import { Dialog, DialogContent, DialogTitle, Divider, Grid2, IconButton } from '@mui/material'
import { FC, useEffect, useLayoutEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDetailsContext } from '../context'
import Iconify from '@/components/iconify'
import { useDispatch } from '@/hooks/use-dispatch'
import Products from './Products'
import Calculation from './Calculation'

const PaymentModal: FC = () => {
	const [t] = useTranslation()

	const { paymentModal, setPaymentModal } = useDetailsContext()

	return (
		<Dialog fullScreen fullWidth open={paymentModal.isOpen}>
			<DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, height: '64px' }}>
				{t('payment-window')}
				<IconButton color='error' onClick={() => setPaymentModal((prev: { isOpen: boolean }) => ({ ...prev, isOpen: false }))}>
					<Iconify width={28} icon='eva:close-fill' />
				</IconButton>
			</DialogTitle>
			<Divider />
			<DialogContent sx={{ px: 2, py: '16px' }}>
				<Grid2 container spacing={2}>
					<Grid2 size={6}>
						<Products />
					</Grid2>
					<Grid2 size={6}>
						<Calculation />
					</Grid2>
				</Grid2>
			</DialogContent>
		</Dialog>
	)
}

export default PaymentModal
