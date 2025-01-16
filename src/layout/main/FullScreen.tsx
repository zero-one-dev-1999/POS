import { IconButton } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import Iconify from '@/components/iconify'

const FullScreen = () => {
	const [isFullScreen, setFullScreen] = useState(false)

	const toggle = useCallback(() => {
		if (isFullScreen) {
			document.exitFullscreen()
			setFullScreen(false)
		} else {
			document.documentElement.requestFullscreen()
			setFullScreen(true)
		}
	}, [isFullScreen])

	useEffect(() => {
		const onFullScreenChange = () => {
			setFullScreen(document.fullscreenElement !== null)
		}

		document.addEventListener('fullscreenchange', onFullScreenChange)

		return () => {
			document.removeEventListener('fullscreenchange', onFullScreenChange)
		}
	}, [])

	return (
		<IconButton
			onClick={toggle}
			sx={{
				width: 48,
				height: 48,
				...(isFullScreen && {
					bgcolor: 'action.selected',
				}),
			}}
		>
			<Iconify width={48} icon={isFullScreen ? 'material-symbols:fullscreen-exit-rounded' : 'material-symbols:fullscreen-rounded'} />
		</IconButton>
	)
}

export default FullScreen
