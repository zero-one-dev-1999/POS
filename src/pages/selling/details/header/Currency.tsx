import { useSelector } from '@/hooks/use-selector'
import { Avatar, Button, Menu, MenuItem, Tooltip, Typography } from '@mui/material'
import { FC, MouseEvent, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDetailsContext } from '../context'

const Currency: FC = () => {
	const [t] = useTranslation()
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
	const open = Boolean(anchorEl)

	const { currencyId, setCurrencyId } = useDetailsContext()

	const currenciesList = useSelector(s => s.Lists.currenciesList)

	const currencyLabel = useMemo(() => currenciesList.find(f => f.value === currencyId)?.label, [currencyId, currenciesList])

	const handleClick = (event: MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget)
	}
	const handleClose = () => {
		setAnchorEl(null)
	}

	useEffect(() => {
		if (!localStorage.getItem('currencyId')) {
			console.log(111)
			setCurrencyId('UZS')
			localStorage.setItem('currencyId', 'UZS')
		} else {
			setCurrencyId(localStorage.getItem('currencyId') as string)
		}
	}, [])

	return (
		<>
			<Tooltip title={t('trading-currency')}>
				<Button
					color='info'
					variant='contained'
					onClick={handleClick}
					aria-controls={open ? 'language' : undefined}
					aria-haspopup='true'
					aria-expanded={open ? 'true' : undefined}
					sx={{ padding: '6px 8px', minWidth: '32px' }}
				>
					{currencyLabel}
				</Button>
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
				{currenciesList.map(item => (
					<MenuItem
						key={item.value}
						onClick={() => {
							setCurrencyId(item.value)
							localStorage.setItem('currencyId', item.value)
						}}
						selected={item.value === currencyId}
						sx={{ pr: 6 }}
					>
						{/* <Avatar src={lang.icon} /> */}
						<Typography variant='body2'>{item.label}</Typography>
					</MenuItem>
				))}
			</Menu>
		</>
	)
}

export default Currency
