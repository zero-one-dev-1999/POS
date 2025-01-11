import { Theme } from '@mui/material'

const Card = (theme: Theme) => ({
	MuiCardContent: {
		styleOverrides: {
			root: {
				padding: theme.spacing(3),
			},
		},
	},
	MuiCard: {
		styleOverrides: {
			root: {
				zIndex: 0,
				position: 'relative',
				// @ts-expect-error
				boxShadow: theme.customShadows.card,
				borderRadius: theme.shape.borderRadius * 2,
				// padding: theme.spacing(2),
			},
		},
	},
	MuiCardHeader: {
		styleOverrides: {
			root: {
				padding: theme.spacing(3, 3, 0),
			},
		},
		defaultProps: {
			titleTypographyProps: { variant: 'h6' },
			subheaderTypographyProps: { variant: 'body2', marginTop: theme.spacing(0.5) },
		},
	},
})

export default Card
