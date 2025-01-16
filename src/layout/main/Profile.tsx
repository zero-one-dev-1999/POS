import { useSelector } from '@/hooks/use-selector'
import { Avatar, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material'
import { FC, MouseEvent, useState } from 'react'
import Iconify from '@/components/iconify'
import { useDispatch } from '@/hooks/use-dispatch'
import { appActions } from '@/store/app'
import { useTranslation } from 'react-i18next'

const Profile: FC = () => {
	const [t] = useTranslation()
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
	const open = Boolean(anchorEl)

	const dispatch = useDispatch()

	const user = useSelector(s => s.App.user)

	const handleClick = (event: MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget)
	}
	const handleClose = () => {
		setAnchorEl(null)
	}

	const logout = () => {
		dispatch(appActions.reset())
		handleClose()
	}

	return (
		<>
			<Tooltip title={t('profile')}>
				<IconButton onClick={handleClick} size='small' aria-controls={open ? 'profile' : undefined} aria-haspopup='true' aria-expanded={open ? 'true' : undefined}>
					<Avatar sx={{ width: 40, height: 40 }}>{String(user?.username?.[0]).toUpperCase()}</Avatar>
				</IconButton>
			</Tooltip>
			<Menu
				anchorEl={anchorEl}
				id='profile'
				open={open}
				onClose={handleClose}
				slotProps={{
					paper: {
						elevation: 0,
						sx: {
							overflow: 'visible',
							filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
							mt: 1.5,
							'& .MuiAvatar-root': {
								width: 32,
								height: 32,
								ml: -0.5,
								mr: 1,
							},
							'&::before': {
								content: '""',
								display: 'block',
								position: 'absolute',
								top: 0,
								right: 14,
								width: 10,
								height: 10,
								bgcolor: 'background.paper',
								transform: 'translateY(-50%) rotate(45deg)',
								zIndex: 0,
							},
						},
					},
				}}
				transformOrigin={{ horizontal: 'right', vertical: 'top' }}
				anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
			>
				<MenuItem
					disableRipple
					disableTouchRipple
					sx={{
						pr: 6,
						'&:hover': {
							backgroundColor: 'transparent',
							cursor: 'default',
						},
					}}
				>
					<Typography variant='body2'>{user?.username}</Typography>
				</MenuItem>

				<MenuItem
					sx={{
						pr: 6,
					}}
					onClick={logout}
				>
					<Avatar color='error' variant='circular'>
						<Iconify icon='mdi:logout' />
					</Avatar>
					<Typography variant='body2'>{t('logout')}</Typography>
				</MenuItem>
			</Menu>
		</>
	)
}

export default Profile
