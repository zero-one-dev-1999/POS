import { Grid2, Stack } from '@mui/material'
import { FC, useLayoutEffect } from 'react'
import Categories from './categories'
import Products from './products'
import Details from './details'
import { getCategoriesList, getProductsList, getUnitsList } from '@/firebase/firestore/lists'

const Selling: FC = () => {
	useLayoutEffect(() => {
		getCategoriesList()
		getProductsList()
		getUnitsList()
	}, [])
	return (
		<Stack sx={{ px: 1.2, paddingTop: '20px', paddingBottom: '10px' }}>
			<Grid2 container spacing={1}>
				<Grid2 size={1}>
					<Stack sx={{ height: 'calc(100vh - 112px)' }}>
						<Categories />
					</Stack>
				</Grid2>
				<Grid2 size={8}>
					<Stack sx={{ height: 'calc(100vh - 112px)' }}>
						<Products />
					</Stack>
				</Grid2>
				<Grid2 size={3}>
					<Stack sx={{ height: 'calc(100vh - 112px)' }}>
						<Details />
					</Stack>
				</Grid2>
			</Grid2>
		</Stack>
	)
}

export default Selling
