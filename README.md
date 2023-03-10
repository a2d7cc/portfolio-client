# Install Project

```
npx create-next-app@12.3.4 client --ts
```

# Tailwind

- https://tailwindcss.com/docs/guides/nextjs

# Settings prettiers, tsconfig, next.config, .env

# Writting Layout

# Install react-query, axios

# Creating Axios

```
export const axiosClassic = axios.create({
	baseURL: API_URL,
	headers: getContentType(),
})

```

## Client react-query

```

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

```

## Wrap with this provider \_app.tsx file from Next

```
function MyApp({ Component, pageProps }: AppProps) {
	return (

    <MainProvider>
			<Component {...pageProps} />
		</MainProvider>
	)
}
```

# Creating Service

```
export const CategoryService = {
	async getAll() {
		return axiosClassic.get<ICategory[]>(getCategoryUrl(''))
	},
}

```

# Creating Hooks

```
export const useAllCategories = () => {
	const { isLoading, data } = useQuery(
		'all categories',
		() => CategoryService.getAll(),
		{
			select: ({ data }) => data,
		}
	)

	return { isLoading, data }
}

```

# Creating helper Url functions

## Api

```
export const API_URL = `${process.env.APP_URL}/api`

export const getUserUrl = (string: string) => `/user${string}`
export const getAuthUrl = (string: string) => `/auth${string}`
export const getCategoryUrl = (string: string) => `/category${string}`
export const getArticleUrl = (string: string) => `/article${string}`

```

## Links for routing inner site

```
export const getCategoryUrlLink = (slug: string) => `/category/${slug}`
export const getArticleUrlLink = (slug: string) => `/article/${slug}`

export const getAdminUrlLink = (url: string) => `/manage/${url}`
export const getAdminHomeUrlLink = () => getAdminUrlLink('').slice(0, -1)

```

## Creating Meta component

```
import Head from 'next/head'
import { useRouter } from 'next/router'
import { FC } from 'react'

import logoImage from '@/assets/images/logo.svg'

import { onlyText } from '@/utils/string/clearText'

import { siteName, titleMerge } from '@/configs/seo.config'
import { ISeo } from './Meta.interface'

const Meta: FC<ISeo> = ({ children, title, description, image }) => {
	const { asPath } = useRouter()
	const currentUrl = `${process.env.APP_URL}${asPath}`

	return (
		<>
			<title itemProp="headline">{titleMerge(title)}</title>
			{description ? (
				<Head>
					<meta
						itemProp="description"
						name="description"
						content={onlyText(description, 152)}
					/>
					<link rel="canonical" href={currentUrl} />
					<meta property="og:locale" content="en" />
					<meta property="og:title" content={titleMerge(title)} />
					<meta property="og:url" content={currentUrl} />
					<meta property="og:image" content={image || logoImage.src} />
					<meta property="og:site_name" content={siteName} />
					<meta
						property="og:description"
						content={onlyText(description, 197)}
					/>
				</Head>
			) : (
				<meta name="robots" content="noindex, nofollow" />
			)}
			{children}
		</>
	)
}

export default Meta

```

# Install redux
```
npm i @reduxjs/toolkit react-redux

```