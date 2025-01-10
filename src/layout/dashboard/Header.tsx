import { Stack } from '@mui/material'
import { FC } from 'react'
import Language from './Language'
import FullScreen from './FullScreen'
import Logo from './Logo'

const Header: FC = () => {
	return (
		<Stack sx={{ height: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', px: { sm: 2, lg: 4 } }}>
			<Logo />
			<Stack sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
				<FullScreen />
				<Language />
			</Stack>
		</Stack>
	)
}

export default Header
