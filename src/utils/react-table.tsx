import Iconify from '@/components/iconify'
import Select from '@/components/select'
import { ColumnFilter, ISortBy } from '@/components/table/types'
import { Chip, IconButton, TextField, Tooltip } from '@mui/material'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

export const buildApiParams = (sortBy: ISortBy = [], filters: ColumnFilter[] = []) => ({
	// page: page.toString(),
	// pageSize: pageSize.toString(),
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
	const [t] = useTranslation()
	return (
		<TextField
			value={column.getFilterValue() || ''}
			size='small'
			onChange={e => column.setFilterValue(e.target.value)}
			placeholder={t(column.columnDef.header ?? '')}
			sx={{ width: '100%' }}
		/>
	)
}

export const SelectColumnFilter = (options: Array<{ value: number; label: string }>) => {
	return ({ column }) => {
		return <Select options={options} value={column.getFilterValue() ?? ''} setVal={val => column.setFilterValue(val)} />
	}
}

export const StatusColumnCell = (options: Array<{ value: number; label: string }> = []) => ({
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
})

export const ActionColumnCell = ({ updateFunc, deleteFunc }) => ({
	header: 'actions',
	accessorKey: '',
	enableColumnFilter: false,
	enableSorting: false,
	cell: ({ row }) => {
		return (
			<>
				<Tooltip title={'edit'}>
					<IconButton color='success' onClick={() => updateFunc(row.original.id)}>
						<Iconify icon='eva:edit-fill' />
					</IconButton>
				</Tooltip>
				<Tooltip title={'delete'}>
					<IconButton color='error' onClick={() => deleteFunc(row.original.id)}>
						<Iconify icon='eva:trash-2-fill' />
					</IconButton>
				</Tooltip>
			</>
		)
	},
	style: { width: '150px' },
})
