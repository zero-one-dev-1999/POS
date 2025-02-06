import Iconify from '@/components/iconify'
import LazyImage from '@/components/image'
import { IProduct } from '@/store/selling/types'
import { fNumber } from '@/utils/format-number'
import {
	Card,
	Dialog,
	DialogContent,
	DialogTitle,
	Divider,
	Icon,
	IconButton,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from '@mui/material'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

interface IProps {
	isOpen: boolean
	data: IProduct[]
	handleClose: () => void
}

const Details: FC<IProps> = ({ isOpen, data, handleClose }) => {
	const [t] = useTranslation()
	return (
		<Dialog fullWidth open={isOpen} maxWidth='lg'>
			<DialogTitle sx={{ px: 2, py: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
				<Typography variant='subtitle1'>{t('products')}</Typography>
				<IconButton size='small' color='error' onClick={handleClose}>
					<Iconify icon='eva:close-fill' width={40} />
				</IconButton>
			</DialogTitle>
			<Divider />
			<DialogContent sx={{ px: 2, py: 3 }}>
				<TableContainer component={Card}>
					<Table size='small'>
						<TableHead>
							<TableRow>
								<TableCell sx={{ width: '40px' }}>№</TableCell>
								<TableCell>{t('name')}</TableCell>
								<TableCell>{t('category')}</TableCell>
								<TableCell>{t('price')}</TableCell>
								<TableCell>{t('quantity')}</TableCell>
								<TableCell>{t('total-price')}</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{data?.length ? (
								data.map((item, index) => (
									<TableRow key={index}>
										<TableCell>{index + 1}</TableCell>
										<TableCell>{item.product_name}</TableCell>
										<TableCell>{item.category_name}</TableCell>
										<TableCell>
											{fNumber(item.selling_price)} {item.currency_id}
										</TableCell>
										<TableCell>{item.count}</TableCell>
										<TableCell>
											{fNumber(item.selling_price * item.count)} {item.currency_id}
										</TableCell>
									</TableRow>
								))
							) : (
								<TableRow>
									<TableCell colSpan={6}>
										<Stack
											alignItems='center'
											justifyContent='center'
											sx={{
												height: 1,
												textAlign: 'center',
												p: them => them.spacing(8, 2),
											}}
										>
											<LazyImage src={'/illustration_empty_content.svg'} alt='no data' height='200' />
											<Typography variant='h5' mt={2} gutterBottom>
												{t('no-data')}
											</Typography>
										</Stack>
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>
			</DialogContent>
		</Dialog>
	)
}

export default Details
