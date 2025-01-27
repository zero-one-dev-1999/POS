import DeleteButton from '@/components/button/DeleteButton'
import GoBackButton from '@/components/button/GoBackButton'
import SaveAndFinishButton from '@/components/button/SaveAndFinishBtn'
import UpdateButton from '@/components/button/UpdateButton'
import Loader from '@/components/loader'
import { deleteOutcomeDoc, saveAndFinishOutcomeDoc, viewOutcomeDoc } from '@/firebase/firestore/outcome'
import { getProductsInWarehouseList, getProductsList } from '@/firebase/firestore/lists'
import { POS_WAREHOUSE_OUTCOME_INDEX_PAGE, POS_WAREHOUSE_OUTCOME_UPDATE_PAGE } from '@/helpers/pages'
import { useSelector } from '@/hooks/use-selector'
import { fNumber } from '@/utils/format-number'
import { Card, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { useConfirm } from 'material-ui-confirm'
import { FC, useLayoutEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { generatePath, useNavigate, useParams } from 'react-router'
import { IOutcomeDocItem } from '@/store/warehouse/outcome/types'

const ViewOutcome: FC = () => {
	const [t] = useTranslation()
	const { id } = useParams()
	const confirm = useConfirm()
	const navigate = useNavigate()

	const { loading, data } = useSelector(({ WarehouseOutcome: s }) => ({ data: s.view, loading: s.loading.data }))

	const lists = useSelector(s => s.Lists.lists)
	const currenciesList = useSelector(s => s.Lists.currenciesList)

	const handleClick = () => {
		confirm({
			title: t('are-you-sure'),
			cancellationText: t('no'),
			confirmationText: t('yes'),
			titleProps: { textAlign: 'center' },
			cancellationButtonProps: { color: 'error', variant: 'outlined' },
			confirmationButtonProps: { color: 'success', variant: 'contained' },
			dialogProps: { maxWidth: 'xs' },
		})
			.then(() => {
				deleteOutcomeDoc(id as string, () => {
					navigate(generatePath(POS_WAREHOUSE_OUTCOME_INDEX_PAGE, { id }))
				})
			})
			.catch(() => {
				// console.log(error)
			})
	}

	const handleSaveAndFinish = () => {
		confirm({
			title: t('are-you-sure'),
			cancellationText: t('no'),
			confirmationText: t('yes'),
			titleProps: { textAlign: 'center' },
			cancellationButtonProps: { color: 'error', variant: 'outlined' },
			confirmationButtonProps: { color: 'success', variant: 'contained' },
			dialogProps: { maxWidth: 'xs' },
		})
			.then(() => {
				saveAndFinishOutcomeDoc(id as string)
			})
			.catch(() => {
				// console.log(error)
			})
	}

	useLayoutEffect(() => {
		getProductsList()
		getProductsInWarehouseList()
		viewOutcomeDoc(id as string)
	}, [])
	return (
		<>
			<Card sx={{ p: 2 }}>
				<Loader loading={loading} />
				<Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
					<GoBackButton path={POS_WAREHOUSE_OUTCOME_INDEX_PAGE} />
					{data?.status === 1 && (
						<Stack direction={'row'} spacing={1} alignItems={'center'}>
							<DeleteButton onClick={handleClick} />
							<UpdateButton action={POS_WAREHOUSE_OUTCOME_UPDATE_PAGE} />
							<SaveAndFinishButton onClick={handleSaveAndFinish} />
						</Stack>
					)}
				</Stack>
			</Card>

			<TableContainer component={Card} sx={{ my: 2 }}>
				<Loader loading={loading} />
				<Table size='small'>
					<TableHead>
						<TableRow>
							<TableCell>{t('date')}</TableCell>
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
							<TableCell>{t('currency')}</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{data?.document_items.map((item: IOutcomeDocItem, index: number) => (
							<TableRow key={index}>
								<TableCell>{index + 1}</TableCell>
								<TableCell>{lists.productsInWarehouseList?.find((f: { value: string }) => f.value === item.product_id)?.label}</TableCell>
								<TableCell>{fNumber(item.quantity)}</TableCell>
								<TableCell>{currenciesList?.find((f: { value: string }) => f.value === item.currency_id)?.label}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	)
}

export default ViewOutcome
