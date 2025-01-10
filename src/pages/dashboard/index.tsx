import { useSelector } from '@/hooks/use-selector'
import { FC } from 'react'

const DashboardPage: FC = () => {
	const user = useSelector(s => s.App.user)

	console.log(user)

	return <div>DashboardPage</div>
}

export default DashboardPage
