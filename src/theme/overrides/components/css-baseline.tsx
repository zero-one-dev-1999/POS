const CssBaseline = () => ({
	MuiCssBaseline: {
		styleOverrides: {
			'*': {
				boxSizing: 'border-box',
			},
			'#root, #__next': {
				width: '100%',
				height: '100%',
			},
			body: {
				margin: 0,
				padding: 0,
				width: '100%',
				height: '100%',
			},
			img: {
				maxWidth: '100%',
				display: 'inline-block',
				verticalAlign: 'bottom',
			},
			html: {
				margin: 0,
				padding: 0,
				width: '100%',
				height: '100%',
				WebkitOverflowScrolling: 'touch',
			},
			input: {
				'&[type=number]': {
					MozAppearance: 'textfield',
					'&::-webkit-outer-spin-button': {
						margin: 0,
						WebkitAppearance: 'none',
					},
					'&::-webkit-inner-spin-button': {
						margin: 0,
						WebkitAppearance: 'none',
					},
				},
			},
		},
	},
})

export default CssBaseline
