import { IProduct } from '@/store/selling/types'
import { Button, Card, IconButton, Stack, TextField, Typography } from '@mui/material'
import { FC, useEffect, useRef, useState } from 'react'
import { useModeContext } from '@/theme/modeContext'
import Iconify from '@/components/iconify'
import { useDispatch } from '@/hooks/use-dispatch'
import { basketActions, productsCountOnBasket } from '@/store/selling/basket'
import { fNumber } from '@/utils/format-number'
import { useSelector } from '@/hooks/use-selector'
import { darkMode, lightMode } from '../../config'
import { useDetailsContext } from '../context'

const Product: FC<IProduct> = ({ count, selling_price, product_id, currency_id, quantity, product_name, category_name }) => {
	const [styles, setStyles] = useState(lightMode)
	const { mode } = useModeContext()
	const dispatch = useDispatch()
	const qtyRef = useRef<HTMLInputElement>(null)

	const { page, orders } = useSelector(({ Basket: s }) => ({
		page: s.page,
		orders: s.products,
	}))

	const currenciesList = useSelector(s => s.Lists.currenciesList)
	const { currencyId } = useDetailsContext()

	const handleRemoveItem = () => {
		dispatch(basketActions.removeProduct(product_id))
	}

	const handleIncrement = () => {
		dispatch(basketActions.incrementCount(product_id))
	}

	const handleDecrement = () => {
		dispatch(basketActions.decrementCount(product_id))
	}

	const handleQtyFocus = () => {
		qtyRef.current?.select()
		// onFocus()
	}

	const handleKeyDown = event => {
		if (event.key === '.' || event.key === ',') {
			event.preventDefault()
		}
	}

	const handleChangeQty = value => {
		const qty = productsCountOnBasket(
			[...orders].filter((_, index) => index !== page - 1),
			product_id,
		)

		dispatch(
			basketActions.changeCount({
				product_id,
				value: quantity >= +value + qty ? +value : quantity - qty,
			}),
		)
	}

	useEffect(() => {
		if (mode === 'light') {
			setStyles(lightMode)
		} else {
			setStyles(darkMode)
		}
	}, [mode])
	return (
		<Stack
			p={1.2}
			component={Card}
			sx={{
				background: styles.order_card_bg,
				boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
				mb: 1,
				// ...(isActive && {
				// 	transform: 'scale(0.99)',
				// 	background: styles.order_card_bg_active,
				// }),
			}}
		>
			<Stack
				sx={{
					gap: 2,
					display: 'flex',
					flexDirection: 'row',
					position: 'relative',
					alignItems: 'flex-start',
					justifyContent: 'space-between',
				}}
			>
				<Typography variant='subtitle1' sx={{ color: styles?.main_color }}>
					{product_name}
				</Typography>
				<IconButton color='error' sx={{ mt: -1.4, mr: -1.2 }} onClick={handleRemoveItem}>
					<Iconify width={28} icon='mingcute:delete-2-fill' />
				</IconButton>
			</Stack>
			<Typography
				mb={1}
				variant='caption'
				sx={{
					gap: 1,
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'center',
					color: styles.sub_color,
					justifyContent: 'space-between',
				}}
			>
				<span>{category_name}</span>
				<span style={{ fontSize: '15px', fontWeight: 'bold', color: styles.main_color }}>
					{fNumber(Number(selling_price))} {currency_id}
				</span>
			</Typography>
			<Stack
				sx={{
					gap: 1,
					display: 'flex',
					alignItems: 'center',
					flexDirection: 'row',
					justifyContent: 'space-between',
				}}
			>
				<Stack spacing={0.3} direction='row' alignItems='center'>
					<Button color='error' variant='contained' sx={{ minWidth: '0px' }} onClick={handleDecrement} disabled={count === 1}>
						<Iconify icon='ic:round-minus' />
					</Button>
					<Stack>
						<TextField
							size='small'
							inputRef={qtyRef}
							onFocus={handleQtyFocus}
							onKeyDown={handleKeyDown}
							onChange={e => {
								handleChangeQty(e.target.value)
							}}
							value={String(count).split('').includes('.') ? Number(count).toFixed(2) : count}
							inputProps={{
								style: {
									color: '#fff',
									padding: '1px',
									outline: 'none',
									fontSize: '24px',
									textAlign: 'center',
								},
							}}
							sx={{
								width: '80px',
								'& .MuiOutlinedInput-root': {
									'&:hover fieldset': {
										borderColor: '#CBD6F2',
									},
									'&.Mui-focused fieldset': {
										borderColor: '#CBD6F2',
									},
								},
							}}
						/>
					</Stack>
					<Button color='success' variant='contained' sx={{ minWidth: '0px' }} onClick={handleIncrement}>
						<Iconify icon='ic:round-plus' />
					</Button>
				</Stack>
				<Typography sx={{ color: styles.sub_color }} variant='h6'>
					{fNumber(Number(selling_price) * currenciesList.find(f => f.value === currency_id)?.[currencyId] * count)} {currencyId}
				</Typography>
			</Stack>
		</Stack>
	)
}

export default Product
