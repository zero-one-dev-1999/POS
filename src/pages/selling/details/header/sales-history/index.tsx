import Iconify from '@/components/iconify'
import LazyImage from '@/components/image'
import Loader from '@/components/loader'
import { getClientName } from '@/firebase/firestore/lists'
import { getSoldProducts } from '@/firebase/firestore/selling'
import { IProduct } from '@/store/selling/types'
import { fNumber } from '@/utils/format-number'
import { Card, DialogTitle, Divider, Drawer, IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from '@mui/material'
import { FC, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Details from './Details'

interface IProps {
	isOpen: boolean
	setIsOpen: (isOpen: boolean) => void
}

interface IData {
	cash: number
	client_id: string
	currency_id: 'UZS' | 'USD'
	debt: number
	discount_price: number
	id: string
	terminal: number
	total_price: number
	products: IProduct[]
}

const SalesHistory: FC<IProps> = ({ isOpen, setIsOpen }) => {
	const [data, setData] = useState<IData[]>([])
	const [loading, setLoading] = useState(false)
	const [t, { language }] = useTranslation()
	const [detail, setDetail] = useState<{ data: IProduct[] | null; isOpen: boolean }>({ data: null, isOpen: false })

	const products = useMemo(() => {
		if (Array.isArray(data) && data?.length) {
			return [...data].map((item, index) => (
				<TableRow key={index}>
					<TableCell>{index + 1}</TableCell>
					<TableCell>{item?.client_id ? getClientName(item?.client_id) : '-'}</TableCell>
					<TableCell>{fNumber(item?.total_price ?? 0)}</TableCell>
					<TableCell>{fNumber(item?.discount_price ?? 0)}</TableCell>
					<TableCell>{fNumber(item?.cash ?? 0)}</TableCell>
					<TableCell>{fNumber(item?.terminal ?? 0)}</TableCell>
					<TableCell>{fNumber(item?.debt ?? 0)}</TableCell>
					<TableCell>{item.currency_id}</TableCell>
					<TableCell sx={{ padding: '0px !important' }}>
						<Tooltip title={t('detailed')}>
							<IconButton color='warning' onClick={() => setDetail({ data: item.products, isOpen: true })}>
								<Iconify width={30} icon='eva:eye-fill' />
							</IconButton>
						</Tooltip>
					</TableCell>
				</TableRow>
			))
		}
		return null
	}, [data, language])

	const handleResetDetails = () => {
		setDetail({ data: null, isOpen: false })
	}

	useEffect(() => {
		const getData = async () => {
			const responseData = await getSoldProducts(setLoading)
			setData(responseData as IData[])
		}

		if (isOpen) {
			getData()
		}
	}, [isOpen])

	return (
		<Drawer
			open={isOpen}
			anchor='right'
			PaperProps={{
				sx: { width: '50vw' },
			}}
		>
			<DialogTitle sx={{ px: 2, height: '70px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
				<Stack padding={1} textAlign='center'>
					<Typography variant='subtitle1'>{t('sales-history')}</Typography>
				</Stack>
				<IconButton
					color='error'
					onClick={() => {
						setIsOpen(false)
					}}
				>
					<Iconify width={40} icon='ic:round-close' />
				</IconButton>
			</DialogTitle>
			<Divider />
			<TableContainer component={Card} sx={{ height: 'calc(100% - 80px)', padding: '10px', overflowY: 'auto', scrollbarWidth: 'thin' }}>
				<Loader loading={loading} />
				<Table size='small'>
					<TableHead>
						<TableRow>
							<TableCell sx={{ width: '35px' }}>№</TableCell>
							<TableCell>{t('client')}</TableCell>
							<TableCell sx={{ whiteSpace: 'nowrap' }}>{t('total-price')}</TableCell>
							<TableCell>{t('discount')}</TableCell>
							<TableCell>{t('cash')}</TableCell>
							<TableCell>{t('terminal')}</TableCell>
							<TableCell>{t('debt')}</TableCell>
							<TableCell>{t('currency')}</TableCell>
							<TableCell />
						</TableRow>
					</TableHead>
					<TableBody>
						{products || (
							<TableRow>
								<TableCell colSpan={9}>
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

			<Details data={detail.data as IProduct[]} isOpen={detail.isOpen} handleClose={handleResetDetails} />
		</Drawer>
	)
}

export default SalesHistory
