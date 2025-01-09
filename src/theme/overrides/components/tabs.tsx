import { tabClasses, Theme } from '@mui/material'

const Tabs = (theme: Theme) => ({
	MuiTabs: {
		defaultProps: {
			textColor: 'inherit',
			variant: 'scrollable',
			allowScrollButtonsMobile: true,
		},
		styleOverrides: {
			scrollButtons: {
				width: 48,
				borderRadius: '50%',
			},
			indicator: {
				backgroundColor: theme.palette.text.primary,
			},
		},
	},
	MuiTab: {
		defaultProps: {
			disableRipple: true,
			iconPosition: 'start',
		},
		styleOverrides: {
			root: {
				opacity: 1,
				padding: 0,
				minWidth: 48,
				minHeight: 48,
				fontWeight: theme.typography.fontWeightSemiBold,
				[`&:not(.${tabClasses.selected})`]: {
					color: theme.palette.text.secondary,
				},
				'&:not(:last-of-type)': {
					marginRight: theme.spacing(3),
					[theme.breakpoints.up('sm')]: {
						marginRight: theme.spacing(5),
					},
				},
			},
		},
	},
})

export default Tabs
