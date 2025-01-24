import LazyImage from '@/components/image'
import { useSelector } from '@/hooks/use-selector'
import { fNumber } from '@/utils/format-number'
import { Button, Divider, Stack, Typography } from '@mui/material'
import { FC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import Product from './Product'

const Products: FC = () => {
	const [t, { language }] = useTranslation()
	const { page, orders, loading } = useSelector(({ Basket: s }) => ({
		page: s.page,
		orders: s.products,
		loading: s.loading,
	}))

	const products = useMemo(() => orders?.[page - 1] ?? [], [page, orders])

	const totalPrice = useMemo(() => products.reduce((acc, cur) => acc + cur.selling_price * cur.count, 0), [products])

	const renderedProducts = useMemo(
		() => (
			<>
				{products?.length ? (
					products.map((item, index) => (
						<Stack key={index}>
							<Product
								{...item}
								// isActive={orderIndex === index}
								// onFocus={() => {
								// 	// setProdIndex(null)
								// 	// setOrderIndex(null)
								// }}
							/>
						</Stack>
					))
				) : (
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
						<Typography variant='h5' gutterBottom>
							{t('no-product')}
						</Typography>
					</Stack>
				)}
			</>
		),
		// [products, orderIndex, language],
		[products, language],
	)

	return (
		<>
			<Stack sx={{ height: 'calc(100vh - 285px)', overflowY: 'auto', scrollbarWidth: 'thin' }}>{renderedProducts}</Stack>
			<Divider sx={{ mt: '5px' }} />
			<Button
				size='large'
				color='primary'
				variant='contained'
				// onClick={handlePayment}
				sx={{ mt: '6px', width: '100%' }}
				disabled={!products?.length}
			>
				{t('payment')} - {fNumber(totalPrice)}
			</Button>
		</>
	)
}

export default Products
