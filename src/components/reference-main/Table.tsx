import { FC, useEffect, useMemo } from 'react'
import TableComponent from '../table'
import { ColumnDef } from '@tanstack/react-table'
import { getColumnWithOrder, TextColumnFilter } from '@/utils/react-table'
import { useSelector } from '@/hooks/use-selector'
import { getReferenceMainData, getReferenceMainPagination } from '@/firebase/firestore/reference-main'

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
	const { data, loading, pagination } = useSelector(({ ReferenceMain: s }) => ({
		data: s.data,
		loading: s.loading.data,
		pagination: s.pagination,
	}))

	useEffect(() => {
		console.log(pagination)
	}, [pagination])

	const columns = useMemo<ColumnDef<IData, unknown>[]>(
		() =>
			getColumnWithOrder([
				{
					header: 'Name',
					accessorKey: 'name',
					Filter: TextColumnFilter,
				},
				// StatusColumnCell(statusOptions),
			]),
		[],
	)

	useEffect(() => {
		getReferenceMainPagination(controller)
	}, [])

	return (
		<>
			<TableComponent data={data} columns={columns} loading={loading} onChange={params => getReferenceMainData(controller)} pagination={pagination} />
		</>
	)
}

export default ReferenceMainTable
