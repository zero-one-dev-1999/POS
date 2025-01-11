import { FC, useEffect, useMemo, useState } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import TextColumnFilter from '../table/TextColumnFilter'
import TableComponent from '../table'
import { use } from 'i18next'

interface IProps {
	controller: string
}

interface IData {
	id: number
	name: string
}

const dataa = [
	{
		id: 1,
		name: 'John Doe 1',
		age: 30,
	},
	{
		id: 2,
		name: 'Jane Doe 2',
		age: 20,
	},
]

const ReferenceMain: FC<IProps> = ({ controller }) => {
	const [loading, setLoading] = useState(false)
	const [data, setData] = useState<IData[]>([])

	const columns = useMemo<ColumnDef<IData, unknown>[]>(
		() => [
			{
				header: 'ID',
				accessorKey: 'id',
				Filter: TextColumnFilter,
			},
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
		],
		[],
	)

	const getData = () => {
		setLoading(true)

		setTimeout(() => {
			setData(dataa)
			setLoading(false)
		}, 1000)
	}

	useEffect(() => {
		getData()
	}, [])

	return (
		<TableComponent
			data={data}
			columns={columns}
			loading={loading}
			onChange={params => getData()}
			pagination={{ page: 1, sizePerPage: 15, pageCount: 5, totalSize: 70 }}
		/>
	)
}

export default ReferenceMain
