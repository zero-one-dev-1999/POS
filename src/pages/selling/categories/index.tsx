import { useSelector } from '@/hooks/use-selector'
import { Button, Card, Skeleton, Typography } from '@mui/material'
import { FC, useEffect, useLayoutEffect } from 'react'
import { colors } from '../config'
import Iconify from '@/components/iconify'
import { useDispatch } from '@/hooks/use-dispatch'
import { sellingActions } from '@/store/selling'
import { getCategories, getProducts } from '@/firebase/firestore/selling'
import { useTranslation } from 'react-i18next'

const Categories: FC = () => {
	const dispatch = useDispatch()
	const [t] = useTranslation()

	const { filters, loading, data } = useSelector(({ Selling: s }) => ({
		filters: s.filters,
		loading: s.categories.loading,
		data: s.categories.data,
	}))

	useEffect(() => {
		getProducts({ product_name: filters.name, category_id: filters.category_id })
	}, [filters.category_id])

	useLayoutEffect(() => {
		getCategories()
	}, [])

	return (
		<Card sx={{ height: '100%', p: 1, overflowY: 'auto', scrollbarWidth: 'thin' }}>
			{loading ? (
				Array.from({ length: 13 }).map((_, index) => <Skeleton key={index} component={Button} variant='rectangular' sx={{ py: 3, width: '100%', mb: 1 }} />)
			) : data.length ? (
				data.map((item, index) => (
					<Button
						key={index}
						variant='contained'
						onClick={() => dispatch(sellingActions.setFilters({ category_id: item.value }))}
						sx={{ py: 2, px: 1, color: 'white', backgroundColor: colors[index % 12], width: '100%', mb: 1 }}
						startIcon={filters?.category_id === item.value ? <Iconify icon='icon-park-outline:dot' /> : null}
					>
						{item?.label}
					</Button>
				))
			) : (
				<Typography variant='body2' sx={{ py: 2, textAlign: 'center' }}>
					{t('no-categories')}
				</Typography>
			)}
		</Card>
	)
}

export default Categories
