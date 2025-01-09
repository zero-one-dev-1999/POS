import { useAuthContext } from './use-auth-context'
import { Navigate } from 'react-router-dom'
import { FC, PropsWithChildren } from 'react'
import { POS_LOGIN_PAGE } from '@/helpers/pages'

const AuthGuard: FC<PropsWithChildren> = ({ children }) => {
	const { isAuth } = useAuthContext()

	if (!isAuth) {
		return <Navigate to={POS_LOGIN_PAGE} />
	}

	return <>{children}</>
}

export default AuthGuard
