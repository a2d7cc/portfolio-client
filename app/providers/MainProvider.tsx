import Layout from '@/components/Layout/Layout'
import { FC, PropsWithChildren } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
})

const MainProvider: FC<PropsWithChildren> = ({ children }) => {
	return (
		<div>
			<QueryClientProvider client={queryClient}>
				<Layout>{children}</Layout>
			</QueryClientProvider>
		</div>
	)
}

export default MainProvider
