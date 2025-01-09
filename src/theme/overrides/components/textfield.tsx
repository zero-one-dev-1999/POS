import { alpha, inputBaseClasses, inputLabelClasses, filledInputClasses, outlinedInputClasses, Theme } from '@mui/material'

export default function TextField(theme: Theme) {
	const color = {
		focused: theme.palette.text.primary,
		active: theme.palette.text.secondary,
		placeholder: theme.palette.text.disabled,
	}

	const font = {
		label: theme.typography.body1,
		value: theme.typography.body2,
	}

	return {
		// HELPER
		MuiFormHelperText: {
			defaultProps: {
				component: 'div',
			},
			styleOverrides: {
				root: {
					marginTop: theme.spacing(1),
				},
			},
		},

		// STANDARD
		MuiInput: {
			styleOverrides: {
				underline: {
					'&:after': {
						borderBottomColor: color.focused,
					},
					'&:before': {
						borderBottomColor: alpha(theme.palette.grey[500], 0.32),
					},
				},
			},
		},

		// BASE
		MuiInputBase: {
			styleOverrides: {
				input: {
					...font.value,
					'&::placeholder': {
						opacity: 1,
						color: color.placeholder,
					},
				},
				root: {
					[`&.${inputBaseClasses.disabled}`]: {
						'& svg': {
							color: theme.palette.text.disabled,
						},
					},
				},
			},
		},

		// LABEL
		MuiFormLabel: {
			styleOverrides: {
				root: {
					...font.value,
					color: color.placeholder,
					[`&.${inputLabelClasses.shrink}`]: {
						...font.label,
						fontWeight: 600,
						color: color.active,
						[`&.${inputLabelClasses.focused}`]: {
							color: color.focused,
						},
						[`&.${inputLabelClasses.error}`]: {
							color: theme.palette.error.main,
						},
						[`&.${inputLabelClasses.disabled}`]: {
							color: theme.palette.text.disabled,
						},
						[`&.${inputLabelClasses.filled}`]: {
							transform: 'translate(12px, 6px) scale(0.75)',
						},
					},
				},
			},
		},

		// FILLED
		MuiFilledInput: {
			defaultProps: {
				disableUnderline: true,
			},
			styleOverrides: {
				root: {
					borderRadius: theme.shape.borderRadius,
					backgroundColor: alpha(theme.palette.grey[500], 0.08),
					'&:hover': {
						backgroundColor: alpha(theme.palette.grey[500], 0.16),
					},
					[`&.${filledInputClasses.focused}`]: {
						backgroundColor: alpha(theme.palette.grey[500], 0.16),
					},
					[`&.${filledInputClasses.disabled}`]: {
						backgroundColor: theme.palette.action.disabledBackground,
					},
					[`&.${filledInputClasses.error}`]: {
						backgroundColor: alpha(theme.palette.error.main, 0.08),
						[`&.${filledInputClasses.focused}`]: {
							backgroundColor: alpha(theme.palette.error.main, 0.16),
						},
					},
				},
			},
		},

		// OUTLINED
		MuiOutlinedInput: {
			styleOverrides: {
				notchedOutline: {
					borderColor: alpha(theme.palette.grey[500], 0.2),
					transition: theme.transitions.create(['border-color'], {
						duration: theme.transitions.duration.shortest,
					}),
				},
				root: {
					[`&.${outlinedInputClasses.focused}`]: {
						[`& .${outlinedInputClasses.notchedOutline}`]: {
							borderColor: color.focused,
						},
					},
					[`&.${outlinedInputClasses.error}`]: {
						[`& .${outlinedInputClasses.notchedOutline}`]: {
							borderColor: theme.palette.error.main,
						},
					},
					[`&.${outlinedInputClasses.disabled}`]: {
						[`& .${outlinedInputClasses.notchedOutline}`]: {
							borderColor: theme.palette.action.disabledBackground,
						},
					},
				},
			},
		},
	}
}
