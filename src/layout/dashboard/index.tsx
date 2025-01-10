import { FC } from 'react'
import Header from './Header'
import { Divider, Stack } from '@mui/material'
import { Outlet } from 'react-router'

const DashboardLayout: FC = () => {
	return (
		<>
			<Header />
			<Divider sx={{ borderStyle: 'dashed' }} />
			<Stack>
				<Outlet />
			</Stack>
		</>
	)
}

export default DashboardLayout
