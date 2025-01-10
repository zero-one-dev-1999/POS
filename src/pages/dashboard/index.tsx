import { Card, TextField } from '@mui/material'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

const DashboardPage: FC = () => {
	const [t, { language }] = useTranslation()

	return (
		<div>
			{t('dashboard')}
			<Card>64</Card>
		</div>
	)
}

export default DashboardPage
