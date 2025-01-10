import { Stack } from '@mui/material'
import { FC } from 'react'
import Language from './Language'
import FullScreen from './FullScreen'
import Logo from './Logo'
import ThemeMode from './ThemeMode'
import Profile from './Profile'
import Navbar from './navbar'

const Header: FC = () => {
	return (
		<Stack sx={{ height: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', px: { sm: 2, lg: 4 } }}>
			<Logo />
			<Navbar />
			<Stack spacing={1} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
				<FullScreen />
				<ThemeMode />
				<Language />
				<Profile />
			</Stack>
		</Stack>
	)
}

export default Header
