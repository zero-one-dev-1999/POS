/* eslint-disable no-unused-vars */
import { ChangeEvent, FC } from 'react'
import { Pagination as MuiPagination, SxProps } from '@mui/material'

interface IPaginationProps {
	page: number
	handleChange: (event: ChangeEvent<unknown>, value: number) => void
	pageCount: number
}

const Pagination: FC<IPaginationProps> = ({ page, handleChange, pageCount }) => {
	return (
		<MuiPagination
			count={pageCount}
			page={page}
			onChange={handleChange}
			shape='rounded'
			color='standard'
			variant='outlined'
			sx={{
				'.MuiPagination-ul': {
					justifyContent: 'center',
				},
			}}
		/>
	)
}

export default Pagination
