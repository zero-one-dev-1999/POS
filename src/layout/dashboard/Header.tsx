import { Stack } from '@mui/material'
import { FC } from 'react'
import Language from './Language'
import FullScreen from './FullScreen'

const Header: FC = () => {
	return (
		<Stack sx={{ height: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', px: { sm: 2, lg: 4 } }}>
			Header
			<Stack sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
				<FullScreen />
				<Language />
			</Stack>
		</Stack>
	)
}

export default Header
