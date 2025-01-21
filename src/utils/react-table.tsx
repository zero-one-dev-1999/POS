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
		const color: 'error' | 'info' | 'success' = status === 1 ? 'error' : status === 2 ? 'success' : 'info'
		return label ? <Chip size='small' label={label} variant='filled' color={color} /> : null
	},
})

type VoidFunctionWithId = (id: string) => void

export const ActionColumnCell = ({ updateFunc, deleteFunc, viewFunc }: { updateFunc?: VoidFunctionWithId; deleteFunc?: VoidFunctionWithId; viewFunc?: VoidFunctionWithId }) => ({
	header: 'actions',
	accessorKey: '',
	enableColumnFilter: false,
	enableSorting: false,
	cell: ({ row }) => {
		return (
			<>
				{viewFunc && (
					<Tooltip title={'view'}>
						<IconButton color='warning' onClick={() => viewFunc(row.original.id)}>
							<Iconify icon='eva:eye-fill' />
						</IconButton>
					</Tooltip>
				)}
				{updateFunc && row.original.status === 1 && (
					<Tooltip title={'edit'}>
						<IconButton color='success' onClick={() => updateFunc(row.original.id)}>
							<Iconify icon='eva:edit-fill' />
						</IconButton>
					</Tooltip>
				)}

				{deleteFunc && row.original.status === 1 && (
					<Tooltip title={'delete'}>
						<IconButton color='error' onClick={() => deleteFunc(row.original.id)}>
							<Iconify icon='eva:trash-2-fill' />
						</IconButton>
					</Tooltip>
				)}
			</>
		)
	},
	style: { width: '150px' },
})
