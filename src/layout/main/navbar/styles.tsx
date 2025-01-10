import { styled, ListItemIcon, ListItemButton } from '@mui/material'

export const StyledItem = styled(ListItemButton, {
	shouldForwardProp: prop => prop !== 'active',
	// @ts-expect-error
})(({ open, theme, depth, config, active }) => {
	const subItem = depth !== 1

	const activeStyles = {
		color: theme.palette.text.primary,
		backgroundColor: theme.palette.action.selected,
	}

	return {
		// Root item
		flexShrink: 0,
		padding: config.itemPadding,
		marginRight: config.itemGap,
		borderRadius: config.itemRadius,
		minHeight: config.itemRootHeight,
		color: theme.palette.text.secondary,

		// Active item
		...(active && {
			...activeStyles,
		}),

		// Sub item
		...(subItem && {
			margin: 0,
			padding: theme.spacing(0, 1),
			minHeight: config.itemSubHeight,
		}),

		// Open
		...(open &&
			!active && {
				color: theme.palette.text.primary,
				backgroundColor: theme.palette.action.hover,
			}),
	}
})
// @ts-expect-error
export const StyledIcon = styled(ListItemIcon)(({ size }) => ({
	width: size,
	height: size,
	flexShrink: 0,
	marginRight: 0,
}))
