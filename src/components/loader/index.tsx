import { Stack, useTheme, LinearProgress, alpha, SxProps } from '@mui/material'

interface IProps {
	color?: string
	blur?: number
	opacity?: number
}

interface ILoaderProps {
	loading?: boolean
	sx?: SxProps
}

const bgBlur = (props: IProps) => {
	const color = props?.color || '#000000'
	const blur = props?.blur || 6
	const opacity = props?.opacity || 0.8

	return {
		backdropFilter: `blur(${blur}px)`,
		backgroundColor: alpha(color, opacity),
		WebkitBackdropFilter: `blur(${blur}px)`,
	}
}

const Loader = ({ sx, loading = false }: ILoaderProps) => {
	const theme = useTheme()

	return (
		loading && (
			<Stack
				alignItems='center'
				justifyContent='center'
				sx={{
					top: 0,
					left: 0,
					width: 1,
					height: 1,
					zIndex: 9,
					position: 'absolute',
					...bgBlur({ color: theme.palette.background.paper }),
					...sx,
				}}
			>
				<LinearProgress color='inherit' sx={{ width: 1, maxWidth: 320 }} />
			</Stack>
		)
	)
}

export default Loader
