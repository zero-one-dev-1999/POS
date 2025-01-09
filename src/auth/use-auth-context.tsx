import { useSelector } from '@/hooks/use-selector'

const useAuthContext = () =>
	useSelector(({ App: s }) => ({
		user: s.user,
		hasAccess: s.hasAccess,
		isAuth: s.isAuth,
	}))

export { useAuthContext }
