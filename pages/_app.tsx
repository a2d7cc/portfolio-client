import '@/assets/styles/globals.scss'
import { TypeComponentAuthFields } from '@/providers/AuthProvider/auth.types'
import MainProvider from '@/providers/MainProvider'
import type { AppProps } from 'next/app'

type TypeAppProps = AppProps & TypeComponentAuthFields

function MyApp({ Component, pageProps }: TypeAppProps) {
	return (
		<MainProvider Component={Component}>
			<Component {...pageProps} />
		</MainProvider>
	)
}

export default MyApp
