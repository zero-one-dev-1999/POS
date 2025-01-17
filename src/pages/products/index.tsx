import Iconify from '@/components/iconify'
import { useDispatch } from '@/hooks/use-dispatch'
import { productsActions } from '@/store/products'
import { Button, Card, Stack, Typography } from '@mui/material'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import Form from './Form'
import Table from './Table'

const Products: FC = () => {
	const [t] = useTranslation()
	const dispatch = useDispatch()
	return (
		<Card>
			<Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} p={2}>
				<Typography variant='h4'>{t('products')}</Typography>

				<Button variant='contained' color='primary' startIcon={<Iconify icon='ic:round-plus' />} onClick={() => dispatch(productsActions.setFormIsOpen(true))}>
					{t('add')}
				</Button>
			</Stack>
			<Table />
			<Form />
		</Card>
	)
}

export default Products
