/* eslint-disable @typescript-eslint/no-explicit-any */
import { TextField } from '@mui/material'
import { FC } from 'react'

const TextColumnFilter: FC<any> = ({ column }) => {
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

export default TextColumnFilter
