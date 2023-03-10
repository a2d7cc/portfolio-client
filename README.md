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
	return <div>
		<QueryClientProvider client={queryClient}>

		</QueryClientProvider>
	</div>
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
