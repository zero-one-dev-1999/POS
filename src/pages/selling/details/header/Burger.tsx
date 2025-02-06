import Iconify from '@/components/iconify'
import { IconButton, Menu, MenuItem, Typography } from '@mui/material'
import { FC, MouseEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import SalesHistory from './sales-history'

const Burger: FC = () => {
	const [isOpenSaleHistory, setIsOpenSaleHistory] = useState(false)
	const [isOpenReturn, setIsOpenReturn] = useState(false)
	const [isOpenPayment, setIsOpenPayment] = useState(false)

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
	const open = Boolean(anchorEl)
	const [t] = useTranslation()
	const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget)
	}
	const handleClose = () => {
		setAnchorEl(null)
	}

	return (
		<>
			<IconButton size='small' aria-haspopup='true' onClick={handleClick} aria-expanded={open ? 'true' : undefined} aria-controls={open ? 'account-menu' : undefined}>
				<Iconify width={35} icon='iconamoon:menu-burger-horizontal-fill' />
			</IconButton>
			<Menu
				open={open}
				id='account-menu'
				anchorEl={anchorEl}
				onClose={handleClose}
				sx={{ ml: -3 }}
				onClick={handleClose}
				MenuListProps={{
					'aria-labelledby': 'basic-button',
				}}
				slotProps={{
					paper: {
						elevation: 0,
						sx: {
							overflow: 'visible',
							filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
							mt: 1.5,
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
				<MenuItem onClick={() => setIsOpenSaleHistory(true)} sx={{ gap: 2, display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
					<Iconify width={25} sx={{ color: 'green' }} icon='ri:file-list-2-line' />
					<Typography variant='subtitle1'>{t('sales-history')}</Typography>
				</MenuItem>

				<MenuItem onClick={() => setIsOpenReturn(true)} sx={{ gap: 2, display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
					<Iconify width={25} sx={{ color: 'green' }} icon='streamline:return-2-solid' />
					<Typography variant='subtitle1'>{t('Qaytarib olish')}</Typography>
				</MenuItem>
				<MenuItem onClick={() => setIsOpenPayment(true)} sx={{ gap: 2, display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
					<Iconify width={25} sx={{ color: 'green' }} icon='ri:secure-payment-fill' />
					<Typography variant='subtitle1'>{t(`To'lov qabul qilish`)}</Typography>
				</MenuItem>
			</Menu>

			<SalesHistory isOpen={isOpenSaleHistory} setIsOpen={setIsOpenSaleHistory} />
		</>
	)
}

export default Burger
