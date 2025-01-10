import { matchPath, useLocation } from 'react-router-dom'
import { useMemo } from 'react'

const useActiveLink = (path: string, deep = true) => {
	const { pathname } = useLocation()

	return useMemo(
		() => ({
			isExternalLink: path?.startsWith('http'),
			active: path ? !!matchPath({ path, end: !deep }, pathname) : false,
		}),
		[path, deep, pathname],
	)
}

export default useActiveLink
