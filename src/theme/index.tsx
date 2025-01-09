import { palette } from './palette'
import { darkMode } from './options/dark-mode'
import { useMemo } from 'react'
import { typography } from './typography'
import { shadows } from './shadows'
import { customShadows } from './custom-shadows'
import { merge } from 'lodash'
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import PropTypes from 'prop-types'
import { CssBaseline } from '@mui/material'
import { ConfirmProvider } from 'material-ui-confirm'
import { componentsOverrides } from './overrides'
import { useModeContext } from './modeContext'

export const ThemeProvider = ({ children }) => {
	const { mode } = useModeContext()

	const darkModeOption = darkMode(mode as 'light' | 'dark')

	const baseOption = useMemo(
		() => ({
			typography,
			shadows: shadows('light'),
			palette: palette('light'),
			shape: { borderRadius: 8 },
			customShadows: customShadows('light'),
		}),
		[],
	)

	const memoizedValue = useMemo(() => merge(baseOption, darkModeOption), [baseOption, darkModeOption])

	const theme = createTheme(memoizedValue)

	theme.components = merge(
		{
			MuiInputLabel: {
				styleOverrides: {
					root: ({ theme }) => ({ color: theme.palette.text.primary }),
				},
			},
		},
		componentsOverrides(theme),
	)

	return (
		<MuiThemeProvider theme={theme}>
			<CssBaseline />
			<ConfirmProvider>{children}</ConfirmProvider>
		</MuiThemeProvider>
	)
}

ThemeProvider.propTypes = {
	children: PropTypes.node,
}

export default ThemeProvider
