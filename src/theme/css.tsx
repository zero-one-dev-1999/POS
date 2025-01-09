import { autocompleteClasses } from '@mui/material/Autocomplete'
import { checkboxClasses } from '@mui/material/Checkbox'
import { menuItemClasses } from '@mui/material/MenuItem'
import { dividerClasses } from '@mui/material/Divider'
import { alpha, Theme } from '@mui/material/styles'

export const paper = ({ theme, bgcolor, dropdown }) => ({
	...bgBlur({
		blur: 20,
		opacity: 0.9,
		color: theme.palette.background.paper,
		...(!!bgcolor && {
			color: bgcolor,
		}),
	}),
	backgroundSize: '50%, 50%',
	backgroundRepeat: 'no-repeat, no-repeat',
	backgroundPosition: 'top right, left bottom',
	backgroundImage: 'url(/assets/cyan-blur.png), url(/assets/red-blur.png)',
	...(dropdown && {
		padding: theme.spacing(0.5),
		boxShadow: theme.customShadows.dropdown,
		borderRadius: theme.shape.borderRadius * 1.25,
	}),
})

export const menuItem = (theme: Theme) => ({
	...theme.typography.body2,
	padding: theme.spacing(0.75, 1),
	borderRadius: theme.shape.borderRadius * 0.75,
	'&:not(:last-of-type)': {
		marginBottom: 4,
	},
	[`&+.${dividerClasses.root}`]: {
		margin: theme.spacing(0.5, 0),
	},
	[`& .${checkboxClasses.root}`]: {
		padding: theme.spacing(0.5),
		marginLeft: theme.spacing(-0.5),
		marginRight: theme.spacing(0.5),
	},
	[`&.${autocompleteClasses.option}[aria-selected="true"]`]: {
		backgroundColor: theme.palette.action.selected,
		'&:hover': {
			backgroundColor: theme.palette.action.hover,
		},
	},
	[`&.${menuItemClasses.selected}`]: {
		backgroundColor: theme.palette.action.selected,
		fontWeight: theme.typography.fontWeightSemiBold,
		'&:hover': {
			backgroundColor: theme.palette.action.hover,
		},
	},
})

export const bgBlur = props => {
	const color = props?.color || '#000000'
	const blur = props?.blur || 6
	const opacity = props?.opacity || 0.8
	const imgUrl = props?.imgUrl

	if (imgUrl) {
		return {
			position: 'relative',
			backgroundImage: `url(${imgUrl})`,
			'&:before': {
				top: 0,
				left: 0,
				zIndex: 9,
				width: '100%',
				content: '""',
				height: '100%',
				position: 'absolute',
				backdropFilter: `blur(${blur}px)`,
				backgroundColor: alpha(color, opacity),
				WebkitBackdropFilter: `blur(${blur}px)`,
			},
		}
	}

	return {
		backdropFilter: `blur(${blur}px)`,
		backgroundColor: alpha(color, opacity),
		WebkitBackdropFilter: `blur(${blur}px)`,
	}
}

export const bgGradient = props => {
	const direction = props?.direction || 'to bottom'
	const startColor = props?.startColor
	const endColor = props?.endColor
	const imgUrl = props?.imgUrl
	const color = props?.color

	if (imgUrl) {
		return {
			backgroundSize: 'cover',
			backgroundRepeat: 'no-repeat',
			backgroundPosition: 'center center',
			background: `linear-gradient(${direction}, ${startColor || color}, ${endColor || color}), url(${imgUrl})`,
		}
	}

	return {
		background: `linear-gradient(${direction}, ${startColor}, ${endColor})`,
	}
}

export const textGradient = value => ({
	WebkitBackgroundClip: 'text',
	WebkitTextFillColor: 'transparent',
	background: `-webkit-linear-gradient(${value})`,
})

export const hideScroll = {
	x: {
		overflowX: 'scroll',
		scrollbarWidth: 'none',
		msOverflowStyle: 'none',
		'&::-webkit-scrollbar': {
			display: 'none',
		},
	},
	y: {
		overflowY: 'scroll',
		scrollbarWidth: 'none',
		msOverflowStyle: 'none',
		'&::-webkit-scrollbar': {
			display: 'none',
		},
	},
}
