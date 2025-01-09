import { Theme } from '@mui/material'

const Dialog = (theme: Theme) => ({
	MuiDialogTitle: {
		styleOverrides: {
			root: {
				padding: theme.spacing(3),
			},
		},
	},
	MuiDialogActions: {
		styleOverrides: {
			root: {
				columnGap: theme.spacing(1.5),
				'& > :not(:first-of-type)': {
					marginLeft: '0 !important',
				},
			},
		},
	},
	MuiDialogContent: {
		styleOverrides: {
			root: {
				padding: theme.spacing(0, 3),
			},
			dividers: {
				borderTop: 0,
				borderBottomStyle: 'dashed',
				paddingBottom: theme.spacing(3),
			},
		},
	},
	MuiDialog: {
		styleOverrides: {
			paperFullScreen: {
				borderRadius: 0,
			},
			paper: ({ ownerState }) => ({
				boxShadow: theme.customShadows.dialog,
				borderRadius: theme.shape.borderRadius * 2,
				...(!ownerState.fullScreen && {
					margin: theme.spacing(2),
				}),
			}),
		},
	},
})

export default Dialog
