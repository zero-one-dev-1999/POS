import { FC } from 'react'
import { useTranslation } from 'react-i18next'

const DashboardPage: FC = () => {
	const [t] = useTranslation()

	return <div>{t('dashboard')}</div>
}

export default DashboardPage
