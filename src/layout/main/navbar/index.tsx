import { FC } from 'react'
import MenuItems from '@/menu-items'
import { Stack } from '@mui/material'
import { hideScroll } from '@/theme/css'
import NavList from './NavList'

const navHorizontalConfig = config => ({
	itemGap: config?.itemGap || 6,
	currentRole: config?.currentRole || 'admin',
	iconSize: config?.iconSize || 22,
	itemRadius: config?.itemRadius || 6,
	hiddenLabel: config?.hiddenLabel || false,
	itemSubHeight: config?.itemSubHeight || 40,
	itemRootHeight: config?.itemRootHeight || 40,
	itemPadding: config?.itemPadding || '0 6px 0 6px',
})

const Navbar: FC = () => {
	return (
		<Stack
			direction='row'
			sx={{
				...hideScroll.y,
			}}
		>
			{MenuItems.map(list => (
				<NavList depth={1} data={list} hasChild={!!list.children} key={list.title + list.path} config={navHorizontalConfig({})} />
			))}
		</Stack>
	)
}

export default Navbar
