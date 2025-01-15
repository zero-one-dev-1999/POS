import { FC, useMemo, useState } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import TableComponent from '../table'
import { getColumnWithOrder, StatusColumnCell, TextColumnFilter } from '@/utils/react-table'

interface IProps {
	controller: string
}

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

const data1 = [
	{
		id: 1,
		name: 'John Doe 1',
		age: 30,
		status: 1,
	},
	{
		id: 2,
		name: 'Jane Doe 2',
		age: 20,
		status: 2,
	},
	{
		id: 1,
		name: 'John Doe 1',
		age: 30,
		status: 3,
	},
	{
		id: 2,
		name: 'Jane Doe 2',
		age: 20,
		status: 4,
	},
	{
		id: 1,
		name: 'John Doe 1',
		age: 30,
		status: 1,
	},
	{
		id: 2,
		name: 'Jane Doe 2',
		age: 20,
		status: 2,
	},
]

const ReferenceMain: FC<IProps> = ({ controller }) => {
	const [loading, setLoading] = useState(false)
	const [data, setData] = useState<IData[]>([])

	const columns = useMemo<ColumnDef<IData, unknown>[]>(
		() =>
			getColumnWithOrder([
				{
					header: 'Name',
					accessorKey: 'name',
					Filter: TextColumnFilter,
				},
				{
					header: 'Age',
					accessorKey: 'age',
					Filter: TextColumnFilter,
				},
				StatusColumnCell(statusOptions),
			]),
		[],
	)

	const getData1 = () => {
		setLoading(true)

		setTimeout(() => {
			setData(data1)
			setLoading(false)
		}, 1000)
	}

	return <TableComponent data={data} columns={columns} loading={loading} onChange={params => getData1()} pagination={{ page: 1, sizePerPage: 15, pageCount: 5, totalSize: 70 }} />
}

export default ReferenceMain
