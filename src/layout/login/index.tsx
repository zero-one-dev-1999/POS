import { Grid2 } from '@mui/material'
import { FC } from 'react'
import { Outlet } from 'react-router'

const LoginLayout: FC = () => {
	return (
		<Grid2 container spacing={2}>
			<Grid2 size={{ xs: 12, md: 6 }}>img</Grid2>
			<Grid2 size={{ xs: 12, md: 6 }}>
				<Outlet />
			</Grid2>
		</Grid2>
	)
}

export default LoginLayout
