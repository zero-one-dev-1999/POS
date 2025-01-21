import Iconify from '@/components/iconify'
import { getProducts } from '@/firebase/firestore/selling'
import { useDispatch } from '@/hooks/use-dispatch'
import { useSelector } from '@/hooks/use-selector'
import { sellingActions } from '@/store/selling'
import { Button, Card, FormControl, Grid2, IconButton, InputAdornment, Skeleton, Stack, TextField, Typography } from '@mui/material'
import { FC, useLayoutEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Product from './Product'

const Products: FC = () => {
	const [t] = useTranslation()
	const dispatch = useDispatch()

	const { filters, loading, data } = useSelector(({ Selling: s }) => ({
		filters: s.filters,
		loading: s.products.loading,
		data: s.products.data,
	}))

	useLayoutEffect(() => {
		getProducts()
	}, [])

	return (
		<Card sx={{ p: 1.8, height: '100%', overflowY: 'auto', scrollbarWidth: 'thin' }}>
			<Stack direction={'row'} alignItems={'flex-start'} justifyContent={'space-between'} spacing={2} sx={{ height: '50px' }}>
				<FormControl fullWidth>
					<TextField
						size='small'
						value={filters.name}
						placeholder={t('search')}
						onChange={e => dispatch(sellingActions.setFilters({ name: e.target.value }))}
						InputProps={{
							endAdornment: (
								<InputAdornment position='end'>
									<IconButton edge='end' size='small'>
										<Iconify width={25} icon='eva:search-fill' />
									</IconButton>
								</InputAdornment>
							),
						}}
					/>
				</FormControl>
				<Button color='error' variant='contained' sx={{ mt: 0.1 }} onClick={() => dispatch(sellingActions.setFilters({ category_id: '', name: '' }))}>
					{t('clear')}
				</Button>
			</Stack>
			<Stack sx={{ height: 'calc(100% - 50px)', overflowY: 'auto', scrollbarWidth: 'thin' }}>
				<Grid2 container spacing={1.2}>
					{loading ? (
						Array.from({ length: 18 }).map((_, index) => (
							<Grid2 key={index} size={4}>
								<Skeleton component={Card} variant='rectangular' sx={{ py: 6, width: '100%' }} />
							</Grid2>
						))
					) : data.length ? (
						data.map((item, index) => (
							<Grid2 key={index} size={4}>
								<Product {...item} />
							</Grid2>
						))
					) : (
						<Typography variant='h5'>{t('no_data')}</Typography>
					)}
				</Grid2>
			</Stack>
		</Card>
	)
}

export default Products
