import { Box, Grid2, Stack } from '@mui/material'
import { FC } from 'react'
import { Outlet } from 'react-router'

const LoginLayout: FC = () => {
	return (
		<Grid2 container spacing={2}>
			<Grid2 size={{ xs: 12, md: 6 }}>
				<Stack sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }} spacing={2}>
					<Box alt='auth' component='img' sx={{ maxWidth: 720 }} src={'/pos_illustration.jpg'} />
				</Stack>
			</Grid2>
			<Grid2 size={{ xs: 12, md: 6 }}>
				<Outlet />
			</Grid2>
		</Grid2>
	)
}

export default LoginLayout
