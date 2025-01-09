import { alpha, tableRowClasses, tableCellClasses, Theme } from '@mui/material'

const Table = (theme: Theme) => ({
	MuiTableContainer: {
		styleOverrides: {
			root: {
				position: 'relative',
			},
		},
	},
	MuiTableRow: {
		styleOverrides: {
			root: {
				'&:last-of-type': {
					[`& .${tableCellClasses.root}`]: {
						borderColor: 'transparent',
					},
				},
				[`&.${tableRowClasses.selected}`]: {
					backgroundColor: alpha(theme.palette.primary.dark, 0.04),
					'&:hover': {
						backgroundColor: alpha(theme.palette.primary.dark, 0.08),
					},
				},
			},
		},
	},
	MuiTablePagination: {
		defaultProps: {
			backIconButtonProps: {
				size: 'small',
			},
			nextIconButtonProps: {
				size: 'small',
			},
		},
		styleOverrides: {
			toolbar: {
				height: 64,
			},
			root: {
				width: '100%',
			},
			actions: {
				marginRight: 8,
			},
			selectIcon: {
				right: 4,
				width: 16,
				height: 16,
				top: 'calc(50% - 8px)',
			},
			select: {
				paddingLeft: 8,
				'&:focus': {
					borderRadius: theme.shape.borderRadius,
				},
			},
		},
	},
	MuiTableCell: {
		styleOverrides: {
			root: {
				borderBottomStyle: 'dashed',
			},
			paddingCheckbox: {
				paddingLeft: theme.spacing(1),
			},
			head: {
				fontSize: 14,
				color: theme.palette.text.secondary,
				fontWeight: theme.typography.fontWeightSemiBold,
				backgroundColor: theme.palette.background.neutral,
			},
			stickyHeader: {
				backgroundColor: theme.palette.background.paper,
				backgroundImage: `linear-gradient(to bottom, ${theme.palette.background.neutral} 0%, ${theme.palette.background.neutral} 100%)`,
			},
		},
	},
})

export default Table
