import TableComponent from '@/components/table'
import { deleteProductDoc, getProductsData, updateStartProductDoc } from '@/firebase/firestore/products'
import { useSelector } from '@/hooks/use-selector'
import { ColumnDef } from '@tanstack/react-table'
import { FC, useLayoutEffect, useMemo } from 'react'
import { IData } from './types'
import { ActionColumnCell, getColumnWithOrder, TextColumnFilter } from '@/utils/react-table'
import { useTranslation } from 'react-i18next'
import { useConfirm } from 'material-ui-confirm'
import { getCategoriesList, getCategoryName, getCurrenciesList, getUnitsList } from '@/firebase/firestore/lists'

const Table: FC = () => {
	const [t] = useTranslation()
	const confirm = useConfirm()
	const { data, loading } = useSelector(({ Products: s }) => ({ data: s.data, loading: s.loading.data }))

	const handleUpdateStart = (id: string) => {
		updateStartProductDoc(id)
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
				deleteProductDoc(id)
			})
			.catch(() => {
				// console.log(error)
			})
	}

	const columns = useMemo<ColumnDef<IData, unknown>[]>(
		() =>
			getColumnWithOrder([
				{
					header: 'name',
					accessorKey: 'name',
					Filter: TextColumnFilter,
				},
				{
					header: 'category',
					accessorKey: 'category_name',
					Filter: TextColumnFilter,
				},
				{
					header: 'unit',
					accessorKey: 'unit_name',
					Filter: TextColumnFilter,
				},
				{
					header: 'currency',
					accessorKey: 'currency_name',
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

	return <TableComponent data={data} columns={columns} loading={loading} onChange={params => getProductsData()} />
}

export default Table
