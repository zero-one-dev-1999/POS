import Iconify from '@/components/iconify'
import { useDispatch } from '@/hooks/use-dispatch'
import { useSelector } from '@/hooks/use-selector'
import { basketActions } from '@/store/selling/basket'
import { Button, Pagination, PaginationItem, Stack } from '@mui/material'
import { useConfirm } from 'material-ui-confirm'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

const BasketNavigator: FC = () => {
	const dispatch = useDispatch()
	const confirm = useConfirm()
	const [t] = useTranslation()

	const { page, orders } = useSelector(({ Basket: s }) => ({
		page: s.page,
		orders: s.products,
		loading: s.loading,
	}))

	const handleChange = (_, value: number) => {
		dispatch(basketActions.setPage(value))
	}

	const handleAddPage = () => {
		dispatch(basketActions.addPage())
		dispatch(basketActions.setPage(page + 1))
	}

	const handleRemovePage = () => {
		confirm({
			title: t('are-you-sure'),
			cancellationText: t('no'),
			confirmationText: t('yes'),
			titleProps: { textAlign: 'center' },
			cancellationButtonProps: { color: 'error', variant: 'outlined' },
			confirmationButtonProps: { color: 'success', variant: 'contained' },
		}).then(() => {
			dispatch(basketActions.removePage(page))
			if (page !== 1) {
				dispatch(basketActions.setPage(page - 1))
			}
		})
	}

	return (
		<Stack
			sx={{
				gap: 0.3,
				display: 'flex',
				flexDirection: 'row',
				alignItems: 'center',
				justifyContent: 'center',
				height: '50px',
				lineHeight: '40px',
			}}
		>
			<Pagination
				page={page}
				size='large'
				hideNextButton
				hidePrevButton
				shape='rounded'
				siblingCount={1}
				boundaryCount={1}
				variant='outlined'
				count={orders.length}
				onChange={handleChange}
				renderItem={item => <PaginationItem {...item} />}
				sx={{
					'& .MuiPaginationItem-root': {
						margin: '0 0.5px',
					},
					'& .Mui-selected': {
						color: 'white',
						backgroundColor: '#0091ea !important',
					},
				}}
			/>
			<Button size='medium' color='success' variant='contained' onClick={handleAddPage} sx={{ minWidth: '0px', padding: '10px 12px' }}>
				<Iconify icon='ic:round-plus' />
			</Button>
			<Button size='medium' color='error' variant='contained' onClick={handleRemovePage} disabled={orders?.length === 1} sx={{ minWidth: '0px', padding: '10px 12px' }}>
				<Iconify icon='ic:round-close' />
			</Button>
		</Stack>
	)
}

export default BasketNavigator
