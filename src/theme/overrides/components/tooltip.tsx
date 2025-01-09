import { Theme } from '@mui/material'

const Tooltip = (theme: Theme) => {
	const isLight = theme.palette.mode === 'light'

	return {
		MuiTooltip: {
			styleOverrides: {
				arrow: {
					color: theme.palette.grey[isLight ? 800 : 700],
				},
				tooltip: {
					backgroundColor: theme.palette.grey[isLight ? 800 : 700],
				},
			},
		},
	}
}

export default Tooltip
