import Select from '@/components/select'
import { ColumnFilter, ISortBy } from '@/components/table/types'
import { Chip, TextField } from '@mui/material'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

export const buildApiParams = (page: number = 1, pageSize: number = 10, sortBy: ISortBy = [], filters: ColumnFilter[] = []) => ({
	page: page.toString(),
	pageSize: pageSize.toString(),
	...(sortBy.length > 0 && {
		sort: (sortBy[0].desc ? '-' : '') + sortBy[0].id,
	}),
	...Object.fromEntries(filters.map(({ id, value }) => [id, value])),
})

export const getColumnWithOrder = (columns: any[]) => {
	return [
		{
			header: '№',
			accessorKey: '',
			enableColumnFilter: false,
			enableSorting: false,
			style: {
				width: '50px',
				textAlign: 'center',
			},
			cell: ({ row, table }) => {
				const pageIndex = table.getState().pagination.pageIndex
				const pageSize = table.getState().pagination.pageSize
				return row.index + pageIndex * pageSize + 1
			},
		},
		...columns,
	]
}

export const TextColumnFilter: FC<any> = ({ column }) => {
	return (
		<TextField
			value={column.getFilterValue() || ''}
			size='small'
			onChange={e => column.setFilterValue(e.target.value)}
			placeholder={column.columnDef.header ?? ''}
			sx={{ width: '100%' }}
		/>
	)
}

export const SelectColumnFilter = (options: Array<{ value: number; label: string }>) => {
	return ({ column }) => {
		return <Select options={options} value={column.getFilterValue() ?? ''} setVal={val => column.setFilterValue(val)} />
	}
}

export const StatusColumnCell = (options: Array<{ value: number; label: string }> = []) => {
	return {
		accessorKey: 'status',
		enableSorting: false,
		header: 'Status',
		filterFn: 'arrIncludes ',
		style: { width: '180px' },
		Filter: SelectColumnFilter(options),
		cell: ({ row }) => {
			const { status } = row.original
			const label = options?.find(item => item.value === status)?.label
			const color: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' =
				status === 0 ? 'error' : status === 1 ? 'success' : status === 2 ? 'warning' : status === 3 ? 'primary' : status === 4 ? 'error' : 'info'
			return <Chip size='small' label={label} variant='filled' color={color} />
		},
	}
}
