import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Divider,
	IconButton,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableRow,
	Typography,
	useTheme,
} from '@mui/material'
import { FC, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useDetailsContext } from './context'
import Iconify from '@/components/iconify'
import { IProduct } from '@/store/selling/types'
import { fNumber } from '@/utils/format-number'
import { useSelector } from '@/hooks/use-selector'
import ReactToPrint from 'react-to-print'

const CheckModal: FC = () => {
	const componentRef = useRef(null)
	const [t] = useTranslation()
	const theme = useTheme()
	const currenciesList = useSelector(s => s.Lists.currenciesList)
	const { checkModal, handleResetCheckModal, currencyId } = useDetailsContext()

	const { props } = checkModal

	const clientsList = useSelector(s => s.Lists.lists.clientsList)

	return (
		<Dialog open={checkModal.isOpen} fullWidth maxWidth='sm'>
			<DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, height: '64px' }}>
				{t('check')}
				<IconButton color='error' onClick={handleResetCheckModal}>
					<Iconify width={28} icon='eva:close-fill' />
				</IconButton>
			</DialogTitle>
			<Divider />
			<DialogContent sx={{ p: 1 }}>
				<Box ref={componentRef} sx={{ p: 1 }}>
					<Typography variant='subtitle1' textAlign={'center'} mb={1}>
						{t('products')}
					</Typography>
					<Table
						size='small'
						sx={{
							'& th, td': { border: `1px solid ${theme.palette.divider}`, padding: '2px 6px' },
							'& tr:last-of-type td': { border: `1px solid ${theme.palette.divider} !important` },
							mb: 2,
						}}
					>
						<TableHead>
							<TableRow>
								<TableCell sx={{ backgroundColor: 'transparent', border: `1px solid ${theme.palette.divider} !important`, width: '35px' }}>№</TableCell>
								<TableCell sx={{ backgroundColor: 'transparent', border: `1px solid ${theme.palette.divider} !important` }}>{t('name')}</TableCell>
								<TableCell sx={{ backgroundColor: 'transparent', border: `1px solid ${theme.palette.divider} !important` }}>{t('quantity')}</TableCell>
								<TableCell sx={{ backgroundColor: 'transparent', border: `1px solid ${theme.palette.divider} !important` }}>{t('selling-price')}</TableCell>
								<TableCell sx={{ backgroundColor: 'transparent', border: `1px solid ${theme.palette.divider} !important` }}>{t('total-price')}</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{props?.products?.map?.((product: IProduct, index) => (
								<TableRow>
									<TableCell>{index + 1}</TableCell>
									<TableCell>{product.product_name}</TableCell>
									<TableCell>{fNumber(product.count)}</TableCell>
									<TableCell>{fNumber(product.selling_price)}</TableCell>
									<TableCell>{fNumber(Number(product.selling_price) * currenciesList.find(f => f.value === product.currency_id)?.[currencyId] * product.count)}</TableCell>
								</TableRow>
							))}
						</TableBody>
						<TableFooter>
							<TableRow>
								<TableCell />
								<TableCell colSpan={3}>
									<Typography variant='subtitle2'>{t('total')}</Typography>
								</TableCell>
								<TableCell>
									<Typography variant='subtitle2'>
										{fNumber(
											props?.products.reduce(
												(acc: number, item: IProduct) =>
													acc + Number(item.selling_price) * currenciesList.find(f => f.value === item.currency_id)?.[currencyId] * item.count,
												0,
											),
										)}{' '}
										{currencyId}
									</Typography>
								</TableCell>
							</TableRow>
						</TableFooter>
					</Table>
					<Stack sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', spacing: 2 }}>
						<Typography variant='subtitle2' sx={{ mr: 1 }}>
							{t('date')}
						</Typography>
						<span style={{ width: '100%', display: 'block', borderBottom: `2px dotted ${theme.palette.divider}`, marginBottom: '6px' }} />
						<Typography sx={{ ml: 1, whiteSpace: 'nowrap' }} variant='subtitle2'>
							{new Date().toLocaleString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' })}
						</Typography>
					</Stack>
					{props?.client_id ? (
						<Stack sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', spacing: 2 }}>
							<Typography variant='subtitle2' sx={{ mr: 1 }}>
								{t('client')}
							</Typography>
							<span style={{ width: '100%', display: 'block', borderBottom: `2px dotted ${theme.palette.divider}`, marginBottom: '6px' }} />
							<Typography sx={{ ml: 1, whiteSpace: 'nowrap' }} variant='subtitle2'>
								{clientsList.find(f => f.value === props.client_id)?.label}
							</Typography>
						</Stack>
					) : (
						''
					)}
					{props?.discount_price ? (
						<Stack sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', spacing: 2 }}>
							<Typography variant='subtitle2' sx={{ mr: 1 }}>
								{t('discount')}
							</Typography>
							<span style={{ width: '100%', display: 'block', borderBottom: `2px dotted ${theme.palette.divider}`, marginBottom: '6px' }} />
							<Typography sx={{ ml: 1, whiteSpace: 'nowrap' }} variant='subtitle2'>
								{fNumber(props.discount_price)} {currencyId}
							</Typography>
						</Stack>
					) : (
						''
					)}
					{props?.debt ? (
						<Stack sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', mt: 0, spacing: 2 }}>
							<Typography variant='subtitle2' sx={{ mr: 1 }}>
								{t('debt')}
							</Typography>
							<span style={{ width: '100%', display: 'block', borderBottom: `2px dotted ${theme.palette.divider}`, marginBottom: '6px' }} />
							<Typography sx={{ ml: 1, whiteSpace: 'nowrap' }} variant='subtitle2'>
								{fNumber(props.debt)} {currencyId}
							</Typography>
						</Stack>
					) : (
						''
					)}
					{props?.cash ? (
						<Stack sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', mt: 0, spacing: 2 }}>
							<Typography variant='subtitle2' sx={{ mr: 1 }}>
								{t('cash')}
							</Typography>
							<span style={{ width: '100%', display: 'block', borderBottom: `2px dotted ${theme.palette.divider}`, marginBottom: '6px' }} />
							<Typography sx={{ ml: 1, whiteSpace: 'nowrap' }} variant='subtitle2'>
								{fNumber(props.cash)} {currencyId}
							</Typography>
						</Stack>
					) : (
						''
					)}
					{props?.terminal ? (
						<Stack sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', mt: 0, spacing: 2 }}>
							<Typography variant='subtitle2' sx={{ mr: 1 }}>
								{t('terminal')}
							</Typography>
							<span style={{ width: '100%', display: 'block', borderBottom: `2px dotted ${theme.palette.divider}`, marginBottom: '6px' }} />
							<Typography sx={{ ml: 1, whiteSpace: 'nowrap' }} variant='subtitle2'>
								{fNumber(props.terminal)} {currencyId}
							</Typography>
						</Stack>
					) : (
						''
					)}
				</Box>
			</DialogContent>
			<Divider />
			<DialogActions>
				<Button color='error' variant='outlined' size='small' onClick={handleResetCheckModal}>
					{t('cancel')}
				</Button>

				{/* @ts-ignore */}
				<ReactToPrint
					content={() => componentRef.current}
					trigger={() => (
						<Button color='success' variant='contained' size='small'>
							{t('print')}
						</Button>
					)}
				/>
			</DialogActions>
		</Dialog>
	)
}

export default CheckModal
