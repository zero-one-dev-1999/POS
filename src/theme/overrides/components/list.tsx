import { Theme } from '@mui/material'

const List = (theme: Theme) => ({
	MuiListItemAvatar: {
		styleOverrides: {
			root: {
				minWidth: 'auto',
				marginRight: theme.spacing(2),
			},
		},
	},
	MuiListItemIcon: {
		styleOverrides: {
			root: {
				color: 'inherit',
				minWidth: 'auto',
				marginRight: theme.spacing(2),
			},
		},
	},
	MuiListItemText: {
		styleOverrides: {
			root: {
				margin: 0,
			},
			multiline: {
				margin: 0,
			},
		},

		defaultProps: {
			secondaryTypographyProps: {
				component: 'span',
			},
			primaryTypographyProps: {
				typography: 'subtitle2',
			},
		},
	},
})

export default List
