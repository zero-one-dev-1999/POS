import DeleteButton from '@/components/button/DeleteButton'
import GoBackButton from '@/components/button/GoBackButton'
import SaveAndFinishButton from '@/components/button/SaveAndFinishBtn'
import UpdateButton from '@/components/button/UpdateButton'
import Loader from '@/components/loader'
import { viewIncomeDoc } from '@/firebase/firestore/income'
import { getCurrenciesList, getProductsList } from '@/firebase/firestore/lists'
import { POS_WAREHOUSE_INCOME_INDEX_PAGE, POS_WAREHOUSE_INCOME_UPDATE_PAGE } from '@/helpers/pages'
import { useSelector } from '@/hooks/use-selector'
import { fNumber } from '@/utils/format-number'
import { Card, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { FC, useLayoutEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router'

const ViewIncome: FC = () => {
	const [t] = useTranslation()
	const { id } = useParams()

	const { loading, data } = useSelector(({ WarehouseIncome: s }) => ({ data: s.view, loading: s.loading.data }))

	const lists = useSelector(s => s.Lists.lists)

	const handleClick = () => {
		//
	}

	const handleSaveAndFinish = () => {
		//
	}

	useLayoutEffect(() => {
		getProductsList()
		getCurrenciesList()
		viewIncomeDoc(id as string)
	}, [])
	return (
		<>
			<Card sx={{ p: 2 }}>
				<Loader loading={loading} />
				<Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
					<GoBackButton path={POS_WAREHOUSE_INCOME_INDEX_PAGE} />
					<Stack direction={'row'} spacing={1} alignItems={'center'}>
						<DeleteButton onClick={handleClick} />
						<UpdateButton action={POS_WAREHOUSE_INCOME_UPDATE_PAGE} />
						<SaveAndFinishButton onClick={handleSaveAndFinish} />
					</Stack>
				</Stack>
			</Card>

			<TableContainer component={Card} sx={{ my: 2 }}>
				<Loader loading={loading} />
				<Table size='small'>
					<TableHead>
						<TableRow>
							<TableCell>{t('date')}</TableCell>
							{/* @ts-ignore */}
							<TableCell>{data?.date ?? '-'}</TableCell>
						</TableRow>
						<TableRow>
							<TableCell sx={{ width: '35%' }}>{t('document-number')}</TableCell>
							<TableCell>{data?.document_number ?? '-'}</TableCell>
						</TableRow>
					</TableHead>
				</Table>
			</TableContainer>

			<TableContainer component={Card}>
				<Loader loading={loading} />
				<Table size='small'>
					<TableHead>
						<TableRow>
							<TableCell sx={{ width: '50px' }}>№</TableCell>
							<TableCell>{t('product')}</TableCell>
							<TableCell>{t('quantity')}</TableCell>
							<TableCell>{t('buying-price')}</TableCell>
							<TableCell>{t('selling-price')}</TableCell>
							<TableCell>{t('currency')}</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{data?.document_items.map((item, index) => (
							<TableRow key={index}>
								<TableCell>{index + 1}</TableCell>
								<TableCell>{lists.productsList?.find((f: { value: string }) => f.value === item.product_id)?.label}</TableCell>
								<TableCell>{fNumber(item.quantity)}</TableCell>
								<TableCell>{fNumber(item.buying_price)}</TableCell>
								<TableCell>{fNumber(item.selling_price)}</TableCell>
								<TableCell>{lists.currenciesList?.find((f: { value: string }) => f.value === item.currency_id)?.label}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	)
}

export default ViewIncome
