import { FC } from 'react'
import Header from './Header'
import { Divider, Stack } from '@mui/material'
import { Outlet } from 'react-router'

const DashboardLayout: FC = () => {
	return (
		<>
			<Stack sx={{ height: '80px' }}>
				<Header />
			</Stack>
			<Divider sx={{ borderStyle: 'dashed' }} />
			<Divider sx={{ borderStyle: 'dashed' }} />
			<Stack sx={{ px: { sm: 2, lg: 4 }, py: 4, height: 'calc(100vh - 82px)', overflowY: 'auto' }}>
				<Outlet />
			</Stack>
		</>
	)
}

export default DashboardLayout
