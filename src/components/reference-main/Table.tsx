import { FC, useMemo } from 'react'
import TableComponent from '../table'
import { ColumnDef } from '@tanstack/react-table'
import { ActionColumnCell, getColumnWithOrder, TextColumnFilter } from '@/utils/react-table'
import { useSelector } from '@/hooks/use-selector'
import { deleteReferenceMainDoc, getReferenceMainData, updateStartReferenceMainDoc } from '@/firebase/firestore/reference-main'
import { useTranslation } from 'react-i18next'
import { IconButton, Tooltip } from '@mui/material'
import Iconify from '../iconify'
import { useConfirm } from 'material-ui-confirm'
import { referenceMainActions } from '@/store/reference-main'
import { useDispatch } from '@/hooks/use-dispatch'

interface IData {
	id: number
	name: string
	age: number
}

const statusOptions = [
	{ value: 1, label: 'Active' },
	{ value: 2, label: 'Inactive' },
	{ value: 3, label: 'Pending' },
	{ value: 4, label: 'Blocked' },
]

const ReferenceMainTable: FC<{ controller: string }> = ({ controller }) => {
	const [t] = useTranslation()
	const confirm = useConfirm()
	const dispatch = useDispatch()

	const { data, loading } = useSelector(({ ReferenceMain: s }) => ({
		data: s.data,
		loading: s.loading.data,
	}))

	const handleUpdateStart = (id: string) => {
		updateStartReferenceMainDoc(controller, id)

		dispatch(referenceMainActions.setFormIsOpen(true))
		dispatch(referenceMainActions.setFormIsUpdate(true))
		dispatch(referenceMainActions.setFormLoading(true))

		setTimeout(() => {
			dispatch(referenceMainActions.setFormLoading(false))
		}, 500)
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
				deleteReferenceMainDoc(controller, id)

				dispatch(referenceMainActions.setDataLoading(true))

				setTimeout(() => {
					getReferenceMainData(controller)
				}, 500)
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
				// StatusColumnCell(statusOptions),
				ActionColumnCell({ updateFunc: handleUpdateStart, deleteFunc: handleDelete }),
			]),
		[],
	)

	return <TableComponent data={data} columns={columns} loading={loading} onChange={params => getReferenceMainData(controller)} />
}

export default ReferenceMainTable
