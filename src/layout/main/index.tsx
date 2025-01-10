import { FC } from 'react'
import Header from './Header'
import { Divider, Stack } from '@mui/material'
import { Outlet } from 'react-router'

const DashboardLayout: FC = () => {
	return (
		<Stack>
			<Stack sx={{ height: '80px' }}>
				<Header />
			</Stack>
			<Divider sx={{ borderStyle: 'dashed' }} />
			<Divider sx={{ borderStyle: 'dashed' }} />
			<Stack sx={{ px: { sm: 2, lg: 4 }, py: 2, height: 'calc(100vh - 82px)' }}>
				<Outlet />
			</Stack>
		</Stack>
	)
}

export default DashboardLayout
