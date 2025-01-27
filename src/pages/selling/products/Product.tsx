import { IProduct } from '@/store/selling/types'
import { useModeContext } from '@/theme/modeContext'
import { Card, Stack, Typography } from '@mui/material'
import { FC, useEffect, useState } from 'react'
import { darkMode, lightMode } from '../config'
import { getCategoryName, getProductName } from '@/firebase/firestore/lists'
import { fNumber } from '@/utils/format-number'
import { basketActions, productsCountOnBasket } from '@/store/selling/basket'
import { useDispatch } from '@/hooks/use-dispatch'
import { useSelector } from '@/hooks/use-selector'

const Product: FC<IProduct> = ({ category_id, currency_id, product_id, quantity, selling_price, ...product }) => {
	const [styles, setStyles] = useState(lightMode)
	const { mode } = useModeContext()
	const dispatch = useDispatch()

	const { orders } = useSelector(({ Basket: s }) => ({
		orders: s.products,
	}))

	const handleClick = () => {
		dispatch(
			basketActions.addProduct({
				...product,
				category_id,
				currency_id,
				product_id,
				quantity,
				selling_price,
				product_name: getProductName(product_id),
				category_name: getCategoryName(category_id),
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
			p={2}
			// spacing={1}
			component={Card}
			alignItems='center'
			onClick={() => (quantity - productsCountOnBasket(orders, product_id) > 0 ? handleClick() : () => {})}
			sx={{
				height: '100%',
				userSelect: 'none',
				transition: 'all 0.2s ease',
				background: styles.product_card_bg,
				boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
				opacity: quantity - productsCountOnBasket(orders, product_id) === 0 ? (mode === 'light' ? 0.8 : 0.6) : 1,
				cursor: 'pointer',
				// ...(isActive &&
				// 	activeTab !== 1 && {
				// 		transform: 'scale(0.97)',
				// 		background: styles.product_card_bg_active,
				// 		boxShadow: '10px 10px 40px rgba(0, 0, 0, 0.1)',
				// 	}),
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				':active':
					quantity - productsCountOnBasket(orders, product_id) > 0
						? {
								transform: 'scale(0.95)',
								background: styles.product_card_bg_active,
								boxShadow: '10px 10px 40px rgba(0, 0, 0, 0.1)',
							}
						: {},
			}}
		>
			<Stack alignItems='center'>
				<Typography
					color='GrayText'
					variant='subtitle1'
					sx={{
						mb: 0.5,
						lineHeight: '120%',
						color: styles.sub_color,
					}}
				>
					{getProductName(product_id)}
				</Typography>

				<Typography color='GrayText' variant='caption' sx={{ color: styles.sub_color }}>
					{getCategoryName(category_id)}
				</Typography>
				<Typography variant='button' color={styles.main_color}>
					{fNumber(Number(selling_price))} {currency_id}
				</Typography>
			</Stack>

			<Typography
				variant='h5'
				textAlign={'right'}
				sx={{
					width: '100%',
					color: styles.sub_color,
					mb: -0.6,
				}}
			>
				{fNumber(quantity - productsCountOnBasket(orders, product_id))}
			</Typography>
		</Stack>
	)
}

export default Product
