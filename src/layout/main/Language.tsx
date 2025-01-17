import { languageList } from '@/i18n/config'
import { Avatar, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material'
import { MouseEvent, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

const Language = () => {
	const { t, i18n } = useTranslation()
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
	const open = Boolean(anchorEl)

	const currentLang = useMemo(() => languageList.find(f => f.value === i18n.language), [i18n.language])

	const handleClick = (event: MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget)
	}
	const handleClose = () => {
		setAnchorEl(null)
	}

	const handleSelect = (lang: 'uz' | 'en' | 'ru') => {
		i18n.changeLanguage(lang)
		localStorage.setItem('i18nextLng', lang)
	}

	return (
		<>
			<Tooltip title={t('language')}>
				<IconButton onClick={handleClick} size='small' aria-controls={open ? 'language' : undefined} aria-haspopup='true' aria-expanded={open ? 'true' : undefined}>
					<Avatar sx={{ width: 36, height: 36 }} src={currentLang?.icon} />
				</IconButton>
			</Tooltip>
			<Menu
				anchorEl={anchorEl}
				id='language'
				open={open}
				onClose={handleClose}
				onClick={handleClose}
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
				{languageList.map(lang => (
					<MenuItem key={lang.value} onClick={() => handleSelect(lang.value)} sx={{ pr: 6 }} selected={lang.value === currentLang?.value}>
						<Avatar src={lang.icon} />
						<Typography variant='body2'>{lang.label}</Typography>
					</MenuItem>
				))}
			</Menu>
		</>
	)
}

export default Language
