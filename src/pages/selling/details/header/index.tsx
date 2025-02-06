import { Stack, Typography } from '@mui/material'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import Currency from './Currency'
import Burger from './Burger'

const Header: FC = () => {
	const [t] = useTranslation()

	return (
		<Stack sx={{ height: '40px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
			<Typography variant='h4'>{t('basket')}</Typography>
			<Stack direction={'row'} alignItems={'center'} gap={1}>
				<Currency />
				<Burger />
			</Stack>
		</Stack>
	)
}

export default Header
