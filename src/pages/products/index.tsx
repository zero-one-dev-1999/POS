import { useDispatch } from '@/hooks/use-dispatch'
import { productsActions } from '@/store/products'
import { Card, Stack, Typography } from '@mui/material'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import Form from './Form'
import Table from './Table'
import CreateButton from '@/components/button/CreateButton'

const Products: FC = () => {
	const [t] = useTranslation()
	const dispatch = useDispatch()
	return (
		<Card>
			<Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} p={2}>
				<Typography variant='h4'>{t('products')}</Typography>
				<CreateButton action={() => dispatch(productsActions.setFormIsOpen(true))} />
			</Stack>
			<Table />
			<Form />
		</Card>
	)
}

export default Products
