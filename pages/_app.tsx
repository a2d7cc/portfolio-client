import '@/assets/styles/globals.css'
import MainProvider from '@/providers/MainProvider'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<MainProvider>
			<Component {...pageProps} />
		</MainProvider>
	)
}

export default MyApp
