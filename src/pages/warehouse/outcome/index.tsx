import { FC } from 'react'
import { useTranslation } from 'react-i18next'

const Outcome: FC = () => {
	const [t] = useTranslation()
	return <div>{t('outcome')}</div>
}

export default Outcome
