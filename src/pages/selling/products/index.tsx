import Iconify from '@/components/iconify'
import { getProducts } from '@/firebase/firestore/selling'
import { useDispatch } from '@/hooks/use-dispatch'
import { useSelector } from '@/hooks/use-selector'
import { sellingActions } from '@/store/selling'
import { Button, Card, FormControl, Grid2, IconButton, InputAdornment, Skeleton, Stack, TextField, Typography } from '@mui/material'
import { FC, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import Product from './Product'
import LazyImage from '@/components/image'
import { debounce } from 'lodash'

const Products: FC = () => {
	const [t] = useTranslation()
	const dispatch = useDispatch()

	const { filters, loading, data } = useSelector(({ Selling: s }) => ({
		filters: s.filters,
		loading: s.products.loading,
		data: s.products.data,
	}))

	const delayFunction = useCallback(
		debounce((value: string) => getProducts({ product_name: value, category_id: filters.category_id }), 500),
		[],
	)

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(sellingActions.setFilters({ name: e.target.value }))
		delayFunction(e.target.value)
	}

	return (
		<Card sx={{ p: 1.8, height: '100%', overflowY: 'auto', scrollbarWidth: 'thin' }}>
			<Stack direction={'row'} alignItems={'flex-start'} justifyContent={'space-between'} spacing={2} sx={{ height: '50px' }}>
				<FormControl fullWidth>
					<TextField
						size='small'
						value={filters.name}
						placeholder={t('search')}
						onChange={handleChange}
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
						<Grid2 size={12}>
							<Stack
								alignItems='center'
								justifyContent='center'
								sx={{
									height: 'calc(100vh - 220px)',
									textAlign: 'center',
									p: theme => theme.spacing(15, 2),
								}}
							>
								<LazyImage src={'/illustration_empty_content.svg'} alt='no data' height='200' />
								<Typography variant='h5' mt={2} gutterBottom>
									{t('no-data')}
								</Typography>
							</Stack>
						</Grid2>
					)}
				</Grid2>
			</Stack>
		</Card>
	)
}

export default Products
