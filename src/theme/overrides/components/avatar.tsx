import { alpha, avatarGroupClasses } from '@mui/material'

const COLORS = ['default', 'primary', 'secondary', 'info', 'success', 'warning', 'error']

const colorByName = name => {
	const charAt = name.charAt(0)

	if (['A', 'C', 'F'].includes(charAt)) return 'primary'
	if (['E', 'D', 'H'].includes(charAt)) return 'secondary'
	if (['I', 'K', 'L'].includes(charAt)) return 'info'
	if (['M', 'N', 'P'].includes(charAt)) return 'success'
	if (['Q', 'S', 'T'].includes(charAt)) return 'warning'
	if (['V', 'X', 'Y'].includes(charAt)) return 'error'
	return 'default'
}

const Avatar = theme => ({
	MuiAvatarGroup: {
		defaultProps: {
			max: 4,
		},
		styleOverrides: {
			avatar: {
				fontSize: 16,
				fontWeight: theme.typography.fontWeightSemiBold,
				'&:first-of-type': {
					fontSize: 12,
					color: theme.palette.primary.dark,
					backgroundColor: theme.palette.primary.lighter,
				},
			},
			root: ({ ownerState }) => ({
				justifyContent: 'flex-end',
				...(ownerState.variant === 'compact' && {
					width: 40,
					height: 40,
					position: 'relative',
					[`& .${avatarGroupClasses.avatar}`]: {
						width: 28,
						margin: 0,
						height: 28,
						position: 'absolute',
						'&:last-of-type': {
							top: 0,
							right: 0,
						},
						'&:first-of-type': {
							left: 0,
							bottom: 0,
							zIndex: 9,
						},
					},
				}),
			}),
		},
	},
	MuiAvatar: {
		variants: COLORS.map(color =>
			color === 'default'
				? {
						props: { color: 'default' },
						style: {
							color: theme.palette.text.secondary,
							backgroundColor: alpha(theme.palette.grey[500], 0.24),
						},
					}
				: {
						props: { color },
						style: {
							color: theme.palette[color].contrastText,
							backgroundColor: theme.palette[color].main,
						},
					},
		),

		styleOverrides: {
			rounded: {
				borderRadius: theme.shape.borderRadius * 1.5,
			},
			colorDefault: ({ ownerState }) => {
				const color = colorByName(`${ownerState.alt}`)

				return {
					...(!!ownerState.alt && {
						...(color !== 'default'
							? {
									color: theme.palette[color].contrastText,
									backgroundColor: theme.palette[color].main,
								}
							: {
									color: theme.palette.text.secondary,
									backgroundColor: alpha(theme.palette.grey[500], 0.24),
								}),
					}),
				}
			},
		},
	},
})

export default Avatar
