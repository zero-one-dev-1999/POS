import { FC } from 'react'
import { useTranslation } from 'react-i18next'

const Income: FC = () => {
	const [t] = useTranslation()
	return <div>{t('income')}</div>
}

export default Income
