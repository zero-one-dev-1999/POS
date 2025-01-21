import { FC } from 'react'
import Header from './Header'
import { Divider, Stack } from '@mui/material'
import { Outlet, useLocation } from 'react-router'

const DashboardLayout: FC = () => {
	const location = useLocation()

	return (
		<>
			<Stack sx={{ height: '80px' }}>
				<Header />
			</Stack>

			<Divider sx={{ borderStyle: 'dashed' }} />
			<Divider sx={{ borderStyle: 'dashed' }} />
			<Stack
				sx={{
					px: !location.pathname.includes('/selling') ? { sm: 2, lg: 4 } : 0,
					py: !location.pathname.includes('/selling') ? 4 : 0,
					height: 'calc(100vh - 82px)',
					overflowY: 'auto',
				}}
			>
				<Outlet />
			</Stack>
		</>
	)
}

export default DashboardLayout
