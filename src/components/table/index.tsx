/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, useLayoutEffect, useMemo, useState } from 'react'
import { useReactTable, getCoreRowModel, flexRender, SortingState, getSortedRowModel, getFilteredRowModel, getPaginationRowModel, PaginationState } from '@tanstack/react-table'
import { Card, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import Pagination from './Pagination'
import { ColumnFilter, TableComponentProps } from './types'
import SkeletonCell from './SkeletonCell'
import { useTranslation } from 'react-i18next'
import LazyImage from '../LazyImage'
import Iconify from '../Iconify'
import { buildApiParams } from '@/utils/react-table'

const TableComponent = <T,>({ data, columns, pagination: remotePagiation, onChange, loading = false }: TableComponentProps<T>) => {
	const [t] = useTranslation()

	const [sorting, setSorting] = useState<SortingState>([])
	const [columnFilters, setColumnFilters] = useState<ColumnFilter[]>([])
	const [pagination, setPagination] = useState<PaginationState & { totalSize: number; pageCount: number }>({
		pageIndex: (remotePagiation.page ?? 1) - 1,
		pageSize: remotePagiation.sizePerPage ?? 10,
		totalSize: remotePagiation.totalSize ?? 0,
		pageCount: remotePagiation.pageCount ?? 0,
	})

	const table = useReactTable({
		data,
		columns,
		manualPagination: false,
		getCoreRowModel: getCoreRowModel(),
		state: {
			sorting,
			columnFilters,
			pagination: {
				pageIndex: pagination?.pageIndex ?? 1,
				pageSize: pagination?.pageSize ?? 10,
			},
		},
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		// @ts-expect-error
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		// @ts-expect-error
		onPaginationChange: setPagination,
		filterFns: {
			text: (rows, id, filterValue) => {
				// @ts-expect-error
				return rows.filter(row => row.getValue(id).toLowerCase().includes(filterValue.toLowerCase()))
			},
		},
	})

	const pageIndex = useMemo(() => table.getState().pagination.pageIndex, [table.getState().pagination.pageIndex])
	const pageSize = useMemo(() => table.getState().pagination.pageSize, [table.getState().pagination.pageSize])

	const pageChange = (e: ChangeEvent<unknown>, newPage: number) => {
		table.setPageIndex(newPage - 1)
	}

	useLayoutEffect(() => {
		if (onChange) {
			console.log(11)
			onChange(buildApiParams(pageIndex + 1, pageSize, sorting, columnFilters))
		}
	}, [columnFilters, sorting, pageIndex, pageSize])

	return (
		<TableContainer component={Card}>
			<Table size='small'>
				<TableHead>
					{table.getHeaderGroups().map(headerGroup => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map(header => (
								<TableCell key={header.id} onClick={header.column.getToggleSortingHandler()}>
									<Stack direction={'row'} alignItems={'center'}>
										{flexRender(header.column.columnDef.header, header.getContext())}
										<span
											style={{
												paddingLeft: '8px',
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'center',
											}}
										>
											{header.column.getCanSort() && header.column.getIsSorted() ? (
												header.column.getIsSorted() === 'asc' ? (
													<Iconify icon='basil:arrow-up-solid' width={25} />
												) : (
													<Iconify icon='basil:arrow-down-solid' width={25} />
												)
											) : (
												''
											)}
										</span>
									</Stack>
								</TableCell>
							))}
						</TableRow>
					))}
				</TableHead>
				<TableBody>
					{table.getHeaderGroups().map(headerGroup => (
						<TableRow className='odd' key={headerGroup.id}>
							{headerGroup.headers.map(header => (
								// @ts-expect-error
								<TableCell key={header.id} sx={{ ...header.column.columnDef?.style, padding: '10px' }}>
									{header.column.getCanFilter() &&
										(header.column.columnDef.Filter ? (
											<header.column.columnDef.Filter {...header.getContext()} />
										) : (
											flexRender(header.column.columnDef.header, header.getContext())
										))}
								</TableCell>
							))}
						</TableRow>
					))}
					{data?.length > 0 ? (
						table.getRowModel().rows.map(row => (
							<TableRow key={row.id}>
								{row.getVisibleCells().map(cell => (
									<TableCell
										key={cell.id}
										sx={{
											// @ts-expect-error
											...cell.column.columnDef?.style,
											padding: '8px',
										}}
									>
										{loading ? <SkeletonCell /> : flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								))}
							</TableRow>
						))
					) : loading ? (
						[1, 2, 3, 4, 5].map(n => (
							<TableRow key={n}>
								{columns.map((_, i) => (
									<TableCell key={i}>
										<SkeletonCell />
									</TableCell>
								))}
							</TableRow>
						))
					) : (
						<TableRow className='no-data-row'>
							<TableCell colSpan={columns.length}>
								<Stack
									alignItems='center'
									justifyContent='center'
									sx={{
										height: 1,
										textAlign: 'center',
										p: theme => theme.spacing(8, 2),
									}}
								>
									<LazyImage src={'/illustration_empty_content.svg'} alt='no data' height='200' />
									<Typography variant='h5' mt={2} gutterBottom>
										{t('no-data')}
									</Typography>
								</Stack>
							</TableCell>
						</TableRow>
					)}
				</TableBody>
				{/* <TableFooter>
					{table.getFooterGroups().map(footerGroup => (
						<TableRow key={footerGroup.id}>
							{footerGroup.headers.map(footer => (
								<TableCell key={footer.id}>
									<Stack direction={'row'} alignItems={'center'}>
										{flexRender(footer.column.columnDef.footer, footer.getContext())}
									</Stack>
								</TableCell>
							))}
						</TableRow>
					))}
				</TableFooter> */}
			</Table>

			{data.length !== 0 && pagination && pagination.pageCount > 1 && (
				<Stack sx={{ p: 2 }}>
					<Pagination page={pageIndex + 1} handleChange={pageChange} pageCount={pagination.pageCount} />
				</Stack>
			)}
		</TableContainer>
	)
}

export default TableComponent
