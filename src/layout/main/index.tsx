import { FC } from 'react'
import Header from './Header'
import { Box, Divider, Stack } from '@mui/material'
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
			<Box
				sx={{
					px: !location.pathname.includes('/selling') ? { sm: 2, lg: 4 } : 0,
					pb: !location.pathname.includes('/selling') ? 4 : 0,
					mt: !location.pathname.includes('/selling') ? '24px' : 0,
					height: !location.pathname.includes('/selling') ? 'calc(100vh - 106px)' : 'calc(100vh - 82px)',
					overflowY: 'auto',
					scrollbarWidth: 'thin',
				}}
			>
				<Outlet />
			</Box>
		</>
	)
}

export default DashboardLayout
