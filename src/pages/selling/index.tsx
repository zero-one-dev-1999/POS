import { FC } from 'react'
import { useTranslation } from 'react-i18next'

const Selling: FC = () => {
	const [t] = useTranslation()
	return <div>{t('selling')}</div>
}

export default Selling
