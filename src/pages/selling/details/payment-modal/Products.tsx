import { useSelector } from '@/hooks/use-selector'
import { FC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useDetailsContext } from '../context'
import { Card, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { fNumber } from '@/utils/format-number'
import Loader from '@/components/loader'

const Products: FC = () => {
	const [t, { language }] = useTranslation()

	const { totalPrice, currencyId } = useDetailsContext()
	const currenciesList = useSelector(s => s.Lists.currenciesList)
	const loading = useSelector(s => s.Selling.loading)
	const { page, orders } = useSelector(({ Basket: s }) => ({
		page: s.page,
		orders: s.products,
		loading: s.loading,
	}))

	const products = useMemo(() => orders?.[page - 1] ?? [], [page, orders])

	const renderedProducts = useMemo(
		() =>
			products
				.map(item => ({ ...item, total_price: +item.quantity * +item.selling_price }))
				.map((pr, index) => (
					<TableRow key={index}>
						<TableCell>{index + 1}</TableCell>
						<TableCell>
							<Typography variant='subtitle2'>{pr.product_name}</Typography>
							<Typography variant='caption'>{pr.category_name}</Typography>
						</TableCell>
						<TableCell>{pr.count}</TableCell>
						<TableCell sx={{ whiteSpace: 'nowrap' }}>
							{fNumber(pr.selling_price)} {pr.currency_id}
						</TableCell>
						<TableCell sx={{ whiteSpace: 'nowrap' }}>
							{fNumber(+pr.selling_price * currenciesList.find(f => f.value === pr.currency_id)?.[currencyId] * +pr.count)} {currencyId}
						</TableCell>
					</TableRow>
				)),
		[products, language],
	)

	return (
		<TableContainer component={Card} sx={{ overflowY: 'auto', scrollbarWidth: 'thin', height: 'calc(100vh - 97px)' }}>
			<Loader loading={loading} />
			<Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} px={2} py={1}>
				<Typography my={0.8} variant='h6' textAlign='center'>
					{t("Tovarlar ro'yxati")}
				</Typography>
				<Typography variant='h4'>
					{fNumber(Number(totalPrice))} {currencyId}
				</Typography>
			</Stack>
			<Table size='small'>
				<TableHead sx={{ top: '0px', position: 'sticky' }}>
					<TableRow>
						<TableCell sx={{ width: '40px' }}>№</TableCell>
						<TableCell>{t('Tovar')}</TableCell>
						<TableCell>{t('quantity')}</TableCell>
						<TableCell>{t('price')}</TableCell>
						<TableCell>{t('total')}</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>{renderedProducts}</TableBody>
			</Table>
		</TableContainer>
	)
}

export default Products
