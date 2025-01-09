import { alpha } from '@mui/material/styles'

const GREY = {
	0: '#FFFFFF',
	100: '#F9FAFB',
	200: '#F4F6F8',
	300: '#DFE3E8',
	400: '#C4CDD5',
	500: '#919EAB',
	600: '#637381',
	700: '#454F5B',
	800: '#212B36',
	900: '#161C24',
}

const PRIMARY = {
	dark: '#007867',
	main: '#00A76F',
	light: '#5BE49B',
	darker: '#004B50',
	lighter: '#C8FAD6',
	contrastText: '#FFFFFF',
}

const SECONDARY = {
	dark: '#5119B7',
	main: '#8E33FF',
	light: '#C684FF',
	darker: '#27097A',
	lighter: '#EFD6FF',
	contrastText: '#FFFFFF',
}

const INFO = {
	dark: '#006C9C',
	main: '#00B8D9',
	light: '#61F3F3',
	darker: '#003768',
	lighter: '#CAFDF5',
	contrastText: '#FFFFFF',
}

const SUCCESS = {
	dark: '#118D57',
	main: '#22C55E',
	light: '#77ED8B',
	darker: '#065E49',
	lighter: '#D3FCD2',
	contrastText: '#ffffff',
}

const WARNING = {
	dark: '#B76E00',
	main: '#FFAB00',
	light: '#FFD666',
	darker: '#7A4100',
	lighter: '#FFF5CC',
	contrastText: GREY[800],
}

const ERROR = {
	dark: '#B71D18',
	main: '#FF5630',
	light: '#FFAC82',
	darker: '#7A0916',
	lighter: '#FFE9D5',
	contrastText: '#FFFFFF',
}

const COMMON = {
	grey: GREY,
	info: INFO,
	error: ERROR,
	warning: WARNING,
	success: SUCCESS,
	primary: PRIMARY,
	secondary: SECONDARY,
	divider: alpha(GREY[500], 0.2),
	common: {
		black: '#000000',
		white: '#FFFFFF',
	},
	action: {
		hoverOpacity: 0.08,
		disabledOpacity: 0.48,
		focus: alpha(GREY[500], 0.24),
		hover: alpha(GREY[500], 0.08),
		disabled: alpha(GREY[500], 0.8),
		selected: alpha(GREY[500], 0.16),
		disabledBackground: alpha(GREY[500], 0.24),
	},
}

export const palette = (mode: 'light' | 'dark') => {
	const light = {
		...COMMON,
		mode: 'light',
		action: {
			...COMMON.action,
			active: GREY[600],
		},
		text: {
			primary: GREY[800],
			disabled: GREY[500],
			secondary: GREY[600],
		},
		background: {
			paper: '#FFFFFF',
			default: '#FFFFFF',
			neutral: GREY[200],
		},
	}

	const dark = {
		...COMMON,
		mode: 'dark',
		action: {
			...COMMON.action,
			active: GREY[500],
		},
		text: {
			primary: '#FFFFFF',
			disabled: GREY[600],
			secondary: GREY[500],
		},
		background: {
			paper: GREY[800],
			default: GREY[900],
			neutral: alpha(GREY[500], 0.12),
		},
	}

	return mode === 'light' ? light : dark
}
