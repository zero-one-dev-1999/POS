import TableComponent from '@/components/table'
import { useSelector } from '@/hooks/use-selector'
import { ColumnDef } from '@tanstack/react-table'
import { FC, useLayoutEffect, useMemo } from 'react'
import { IData } from './types'
import { ActionColumnCell, getColumnWithOrder, TextColumnFilter } from '@/utils/react-table'
import { useTranslation } from 'react-i18next'
import { useConfirm } from 'material-ui-confirm'
import { getCategoriesList, getCurrenciesList, getUnitsList } from '@/firebase/firestore/lists'
import { deleteIncomeDoc, getIncomeDocs } from '@/firebase/firestore/income'
import { generatePath, useNavigate } from 'react-router'
import { POS_WAREHOUSE_INCOME_UPDATE_PAGE } from '@/helpers/pages'

const Table: FC = () => {
	const [t] = useTranslation()
	const confirm = useConfirm()
	const navigate = useNavigate()
	const { data, loading } = useSelector(({ WarehouseIncome: s }) => ({ data: s.data, loading: s.loading.data }))

	const handleUpdateStart = (id: string) => {
		navigate(generatePath(POS_WAREHOUSE_INCOME_UPDATE_PAGE, { id }))
	}

	const handleDelete = (id: string) => {
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
				deleteIncomeDoc(id)
			})
			.catch(() => {
				// console.log(error)
			})
	}

	const columns = useMemo<ColumnDef<IData, unknown>[]>(
		() =>
			getColumnWithOrder([
				{
					header: 'date',
					accessorKey: 'date',
					Filter: TextColumnFilter,
				},
				{
					header: 'document-number',
					accessorKey: 'document_number',
					Filter: TextColumnFilter,
				},

				// StatusColumnCell(statusOptions),
				ActionColumnCell({ updateFunc: handleUpdateStart, deleteFunc: handleDelete }),
			]),
		[],
	)

	useLayoutEffect(() => {
		getCategoriesList()
		getUnitsList()
		getCurrenciesList()
	}, [])

	return <TableComponent data={data} columns={columns} loading={loading} onChange={params => getIncomeDocs()} />
}

export default Table
