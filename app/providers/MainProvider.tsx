import Layout from '@/components/Layout/Layout'
import { store } from '@/store/store'
import { FC, PropsWithChildren } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'
import { TypeComponentAuthFields } from './AuthProvider/auth.types'
import AuthProvider from './AuthProvider/AuthProvider'
import HeadProvider from './HeadProvider/HeadProvider'
import ReduxToast from './ReduxToast'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
})

const MainProvider: FC<TypeComponentAuthFields & PropsWithChildren> = ({ children, Component }) => {
	return (
		<HeadProvider>
			<Provider store={store}>
				<QueryClientProvider client={queryClient}>
					<ReduxToast />
					<AuthProvider Component={Component}>
						<Layout>{children}</Layout>
					</AuthProvider>
				</QueryClientProvider>
			</Provider>
		</HeadProvider>
	)
}

export default MainProvider
