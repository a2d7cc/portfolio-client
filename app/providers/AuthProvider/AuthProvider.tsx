import { useActions } from '@/hooks/useActions'
import { useAuth } from '@/hooks/useAuth'
import Cookies from 'js-cookie'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { FC, PropsWithChildren, useEffect } from 'react'
import { TypeComponentAuthFields } from './auth.types'

const DynamicCheckRole = dynamic(() => import('./CheckRole'), { ssr: false })

const AuthProvider: FC<TypeComponentAuthFields & PropsWithChildren> = ({
	children,
	Component: { isOnlyAdmin, isOnlyUser },
}) => {
	const { user } = useAuth()
	const { logout, checkAuth } = useActions()

	const { pathname } = useRouter()

	// Check acessToken on load page
	useEffect(() => {
		const accessToken = Cookies.get('accessToken')
		if (accessToken) checkAuth()
	}, []) // eslint-disable-line react-hooks/exhaustive-deps

	// Check token on change pages
	useEffect(() => {
		const refreshToken = Cookies.get('refreshToken')
		if (!refreshToken && user) {
			logout()
		}
	}, [pathname]) // eslint-disable-line react-hooks/exhaustive-deps

	return !isOnlyAdmin && !isOnlyUser ? (
		<>{children}</>
	) : (
		<DynamicCheckRole Component={{ isOnlyAdmin, isOnlyUser }}>
			{children}
		</DynamicCheckRole>
	)
}

export default AuthProvider
