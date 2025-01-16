import { ColumnDef } from '@tanstack/react-table'

interface PaginationProps {
	page: number
	pageCount: number
	totalSize: number
	sizePerPage: number
}

interface IOnChangeParams {
	// page: string
	// pageSize: string
	sort?: string
}
interface TableComponentProps<T> {
	data: T[]
	columns: ColumnDef<T>[]
	// pagination: PaginationProps
	// eslint-disable-next-line no-unused-vars
	onChange: (params: IOnChangeParams) => void
	loading: boolean
}

interface ColumnFilter {
	id: string
	value: string
}
type ISortBy = Array<{ id: string; desc: boolean }>

export type { IOnChangeParams, TableComponentProps, PaginationProps, ColumnFilter, ISortBy }
