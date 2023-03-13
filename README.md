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

# Creating MainProvider

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

# At this point

## We can use custom hook, where will be react query request that used service and

## in service will be used axios

```
const Sidebar: FC<ISidebar> = () => {
	const { isLoading, data: categories } = useAllCategories()

	return <div className={styles.header}>Sidebar</div>
}

export default Sidebar
```

# Configure Skeleton Loader

## Install

```
npm install react-loading-skeleton
```

## Skeleton Loader component

```
import cn from 'classnames'
import React, { FC } from 'react'
import Skeleton, { SkeletonProps } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const SkeletonLoader: FC<SkeletonProps> = ({ className, ...rest }) => {
	return (
		<Skeleton
			{...rest}
			baseColor="#1F2125"
			highlightColor="#292A2E"
			className={cn('rounded-lg', className)}
		/>
	)
}

export default SkeletonLoader

```

## Creating HeadProvider

```
import Head from 'next/head'
import { FC, PropsWithChildren } from 'react'

import Favicons from './Favicons'

const HeadProvider: FC<PropsWithChildren> = ({ children }) => {
	return (
		<>
			<Head>
				<meta charSet="UTF-8" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, maximum-scale=5"
				/>

				<Favicons />

				<meta name="theme-color" content={'#181B1E'} />
				<meta name="msapplication-navbutton-color" content={'#181B1E'} />
				<meta
					name="apple-mobile-web-app-status-bar-style"
					content={'#181B1E'}
				/>
				<link rel="manifest" href="/manifest.json" />
			</Head>
			{children}
		</>
	)
}

export default HeadProvider

```

### Creating constants file in configs folder

```
export const accentColor = '#E30B13'
export const bgColor = '#191B1F'

export const IS_SERVER = typeof window === 'undefined'
export const IS_CLIENT = typeof window !== 'undefined'
export const IS_PRODUCTION = process.env.APP_ENV === 'production'

```

### Creating Favicons component

```
const Favicons = () => {
	return (
		<>
			{/* https://iconifier.net/ */}
			<link
				rel="shortcut icon"
				href="/favicons/favicon.ico"
				type="image/x-icon"
			/>
			<link rel="apple-touch-icon" href="/favicons/apple-touch-icon.png" />
			<link
				rel="apple-touch-icon"
				sizes="57x57"
				href="/favicons/apple-touch-icon-57x57.png"
			/>
			<link
				rel="apple-touch-icon"
				sizes="72x72"
				href="/favicons/apple-touch-icon-72x72.png"
			/>
			<link
				rel="apple-touch-icon"
				sizes="76x76"
				href="/favicons/apple-touch-icon-76x76.png"
			/>
			<link
				rel="apple-touch-icon"
				sizes="114x114"
				href="/favicons/apple-touch-icon-114x114.png"
			/>
			<link
				rel="apple-touch-icon"
				sizes="120x120"
				href="/favicons/apple-touch-icon-120x120.png"
			/>
			<link
				rel="apple-touch-icon"
				sizes="144x144"
				href="/favicons/apple-touch-icon-144x144.png"
			/>
			<link
				rel="apple-touch-icon"
				sizes="152x152"
				href="/favicons/apple-touch-icon-152x152.png"
			/>
			<link
				rel="apple-touch-icon"
				sizes="180x180"
				href="/favicons/apple-touch-icon-180x180.png"
			/>
		</>
	)
}

export default Favicons

```

### Wrapping MainProvider

```
const MainProvider: FC<PropsWithChildren> = ({ children }) => {
	return (
		<HeadProvider>
			<Provider store={store}>
				<QueryClientProvider client={queryClient}>
					<Layout>{children}</Layout>
				</QueryClientProvider>
			</Provider>
		</HeadProvider>
	)
}
```

# 404 Page

- Create 404.tsx page in pages folder

```
/* I need to make a Heading component */

import Meta from '@/utils/Meta/Meta'

export default function Error404() {
	return (
		<Meta title="Page not found">
			<h1>404 - Page Not Found</h1>
		</Meta>
	)
}

```

# Progressbar

## Install

```
npm i nextjs-progressbar

```

## Adding near in fragment <></> with HeadProvider

```
			<NextNProgress
				color={accentColor}
				startPosition={0.3}
				stopDelayMs={200}
				height={3}
				showOnShallow={true}
			/>
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

### Creating Store file

```
import { configureStore } from '@reduxjs/toolkit'
import { reducers } from './rootReducer'

export const store = configureStore({
	reducer: reducers,
	devTools: true,
})

export type TypeRootState = ReturnType<typeof store.getState>

```

### Creating Root Reducer

```
/* import { reducer as toastrReducer } from 'react-redux-toastr'
 */
/* import { reducer as userReducer } from './user/user.slice' */

export const reducers = {
/* 	user: userReducer,
	toastr: toastrReducer, */
}

```

### Wrapping with react Provider Main Provider

```
const MainProvider: FC<PropsWithChildren> = ({ children }) => {
	return (
		<Provider store ={store}>
			<QueryClientProvider client={queryClient}>
				<Layout>{children}</Layout>
			</QueryClientProvider>
		</Provider>
	)
}
```

# Configure redux-toast

## Install

```
npm i react-redux-toastr  @types/react-redux-toastr
```

## Import styles in global.css

```
@import 'react-redux-toastr/src/styles/index';
```

## Configure reducer

- rootReducer.ts

```
import { reducer as toastrReducer } from 'react-redux-toastr'

export const reducers = {
	toastr: toastrReducer
}

```

- Show again rootReducer.ts

```
import { configureStore } from '@reduxjs/toolkit'
import { reducers } from './rootReducer'

export const store = configureStore({
	reducer: reducers,
	devTools: true,
})

export type TypeRootState = ReturnType<typeof store.getState>

```

## Creating Toast component

```
import React, { FC } from 'react'
import ReduxToastrLib from 'react-redux-toastr'

const ReduxToast:FC = () => {
	return (
		<ReduxToastrLib
			newestOnTop={false}
			preventDuplicates
			progressBar
			closeOnToastrClick
			timeOut={4000}
			transitionIn='fadeIn'
			transitionOut='fadeOut'
		/>
	)
}

export default ReduxToast
```

## Put this component in MainProvider

```
const MainProvider: FC<PropsWithChildren> = ({ children }) => {
	return (
		<HeadProvider>
			<Provider store={store}>
				<QueryClientProvider client={queryClient}>
					<ReduxToast />
					<Layout>{children}</Layout>
				</QueryClientProvider>
			</Provider>
		</HeadProvider>
	)
}

export default MainProvider
```

# React Hook Form & Auth

### Install libraries

```
npm i react-hook-form
npm install -D @tailwindcss/forms @tailwindcss/aspect-ratio
```

### Add plugins in tailwind.config.js

```
		require('@tailwindcss/forms'),
		require('@tailwindcss/aspect-ratio'),
```

## Creating auth.tsx page in pages folder of Next.js

```
import Home from '@/components/screens/home/Home'
import type { NextPage } from 'next'

const AuthPage: NextPage = () => {
	return <Auth />
}

export default AuthPage

```

## Generate Auth folder structure | Component

```
const AuthPage: NextPage = () => {
	return <Auth />
}

export default AuthPage
```

## Make a redirect functional after success registration, login

### Creating useAuth in hooks folder that return user

```
export const useAuth = () => ({
	user: null,
	isLoading: false
})
```

### Creating useAuthRedirect logic

```
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export const useAuthRedirect = () => {
	// To get user
	const { user } = useAuth()

	// query to get parametr, push to redirect
	const { query, push } = useRouter()

	const redirect = query.redirect ? String(query.redirect) : '/'

	// when we get user after completed register, login redirect
	useEffect(() => {
		if (user) push(redirect)
	}, [user, redirect, push])
}

```

## Writting interface IAuthInput

```
export interface IAuthInput {
	email: string
	password: string
}
```

## Writting Auth component

```
const Auth: FC<IAuth> = () => {
	// redirect when get user, after successed registration
	useAuthRedirect()

	// to get isLoading status
	const { isLoading } = useAuth()

	// type of forme with local state
	const [type, setType] = useState<'login' | 'register'>('login')

	// Init useForm
	const {
		register: registerInput,
		handleSubmit,
		formState,
		reset,
	} = useForm<IAuthInput>({
		mode: 'onChange',
	})

	// Empty functions
	const login = (data: any) => {}
	const register = (data: any) => {}

	// Interface show what contained in data
	const onSubmit: SubmitHandler<IAuthInput> = (data) => {
		if (type === 'login') login(data)
		else if (type === 'register') register(data)

		reset()
	}

	return <div className={styles.auth}>Auth</div>
}

export default Auth
```

## Form MarkUp

```
	return (
		<Meta title="Auth">
			<section className={styles.wrapper}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Heading title="Auth" className="mb-6" />

					{/* Auth Fields */}

					<div className={styles.buttons}>
						<Button
							type="submit"
							onClick={() => setType('login')}
							disabled={isLoading}
						>
							Login
						</Button>
						<Button
							type="submit"
							onClick={() => setType('register')}
							disabled={isLoading}
						>
							Register
						</Button>
					</div>
				</form>
			</section>
		</Meta>
	)
```

## Writting field

### Writting interface

```
export interface IFieldProps {
	placeholder: string
	error?: FieldError | undefined
}

type TypeInputPropsField = InputHTMLAttributes<HTMLInputElement> & IFieldProps

export interface IField extends TypeInputPropsField {}
```

### Forward ref for a Field

```
import cn from 'classnames'
import { forwardRef } from 'react'

import { IField } from './form.interface'
import styles from './form.module.scss'

// We are showing forwardRef type of element HTMLInputElement and then writting own interface to get access for a properties
const Field = forwardRef<HTMLInputElement, IField>(
	({ placeholder, error, type = 'text', style, ...rest }, ref) => {
		return (
			// common styles, while we have also upload field
			<div className={cn(styles.common, styles.field)} style={style}>
				<label>
					<span>{placeholder}</span>
					{/* providig ref to input element, without ref it will be on component refering, but for our library we need to provide throught component direct to input tag */}
					<input ref={ref} type={type} {...rest} />
				</label>
				{error && <div className={styles.error}>{error.message}</div>}
			</div>
		)
	}
)

Field.displayName = 'Field'

export default Field

```

## Writting AuthFields

### We are taking a property from useForm hook and provider to AuthFeilds component

### And in this component we are providing errors, and register function from useForm

### To Field component that take it through the forward ref

```
import { FC } from 'react'
import { FormState, UseFormRegister } from 'react-hook-form'

import Field from '@/components/ui/form-elements/Field'
import { IAuthInput } from './Auth.interface'
import { validEmail } from '@/utils/string/regex'


interface IAuthFields {
	register: UseFormRegister<any>
	formState: FormState<IAuthInput>
	isPasswordRequired?: boolean
}

const AuthFields: FC<IAuthFields> = ({
	register,
	formState: { errors },
	isPasswordRequired = false,
}) => {
	return (
		<>
			<Field
				{...register('email', {
					required: 'Email is required',
					pattern: {
						value: validEmail,
						message: 'Please enter a valid email address',
					},
				})}
				placeholder="E-Mail"
				error={errors.email}
			/>

			<Field
				{...register(
					'password',
					isPasswordRequired
						? {
								required: 'Password is required',
								minLength: {
									value: 6,
									message: 'Min length should more 6 symbols',
								},
						  }
						: {}
				)}
				placeholder="Password"
				type="password"
				error={errors.password}
			/>
		</>
	)
}

export default AuthFields

```

## Adding AuthField component to Auth Component in form

```

					<AuthFields
						formState={formState}
						register={registerInput}
						isPasswordRequired
					/>
```

# Redux Authorization

- Creating user folder in store folder with:
  - user.actions.ts
  - user.interface.ts
  - user.slice.ts

## user.interface.ts & user.type.ts

user.type.ts

```
export interface IUser {
	_id: string
	email: string
	password: string
	createdAt: string
	isAdmin: boolean
}
```

user.interface.ts

```
import { IUser } from "@/shared/types/user.types"

export interface IUserState {
	email: string
	isAdmin: boolean
}

export interface ITokens {
	accessToken: string
	refreshToken: string
}

export interface IInitialState {
	user: IUserState | null
	isLoading: boolean
}

export interface IEmailPassword {
	email: string
	password: string
}

export interface IAuthResponse extends ITokens{
	 user: IUser & {
		isAdmin: boolean
	 }
}
```

## Local storage utils function

```
export const getStoreLocal = (name: string) => {
	if (typeof localStorage !== 'undefined') {
		const ls = localStorage.getItem(name)
		return ls ? JSON.parse(ls) : null
	}
	return null
}

```

## Writting User slice file

```
import { getStoreLocal } from '@/utils/Storage/local-storage'
import { createSlice } from '@reduxjs/toolkit'
import { IInitialState } from './user.interface'

// Initial state take a user from Localstorage, if there is
const initialState: IInitialState = {
	isLoading: false,
	user: getStoreLocal('user'),
}

// Extra reducers for async requests
export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: (builder) => {}
})

export const {reducer} = userSlice
```

## Adding reducer to root reeducer

```
import { reducer as toastrReducer } from 'react-redux-toastr'
import {reducer as userReducer} from './user/user.slice'

export const reducers = {
	toastr: toastrReducer,
	user: userReducer
}

```

## Writting user.actions

- First generic is response from server and the second it's what we are providing in function
- thunkApi(it's after {email, password}) we are using to process errors and give reject

```
export const register = createAsyncThunk<IAuthResponse, IEmailPassword>(
	'auth/register',
	async ({ email, password }, thunkApi) => {
		try {
			const response = await AuthService.register(email, password)
			toastr.success('Registration', 'Completed successfully')
			return response.data
		} catch (error) {
			toastrError(error)
			return thunkApi.rejectWithValue(error)
		}
	}
)

- Here we are checkiung error and when expired, than dispatch logout function
export const checkAuth = createAsyncThunk<IAuthResponse>(
	'auth/check-auth',
	async (_, thunkApi) => {
		try {
			const response = await AuthService.getNewTokens()
			return response.data
		} catch (error) {
			if (errorCatch(error) === 'jwt expired') {
				toastrError(
					'Logout',
					'Your authorization  is finished, please sign it again'
				)
				thunkApi.dispatch(logout())
			}
			return thunkApi.rejectWithValue(error)
		}
	}
)

export const logout = createAsyncThunk('auth/logout', async (_, thunkApi) => {
	await AuthService.logout()
})

```

### toastError function in utils to display errors

```
import { errorCatch } from "api/api.helpers"
import { toastr } from "react-redux-toastr"

export const toastrError = (error: any, title?:string) => {
const message =  errorCatch(error)
toastr.error(title || 'Error request', message)
throw message
}
```

### ErrorCatch in api.helpers

```
export const errorCatch = (error: any): string =>
	error.response && error.response.data
		? typeof error.response.data.message === 'object'
			? error.response.data.message[0]
			: error.response.data.message
		: error.message

```

## AuthService

```
export const AuthService = {
	async register(email: string, password: string) {
		const response = await axiosClassic.post<IAuthResponse>(
			getAuthUrl('/registration'),
			{ email, password }
		)
		if (response.data.accessToken) {
			saveToStorage(response.data)
		}
		return response
	},
}
```

### AuthHelper to manipulate with tokens due Cookies, Localstorage

```
npm i js-cookie
npm i --save-dev @types/js-cookie`
```

- Save tokens to cookies, save user to localStorage

```
import Cookies from 'js-cookie'

import { IAuthResponse, ITokens } from '@/store/user/user.interface'

export const saveTokensStorage = (data: ITokens) => {
	Cookies.set('accessToken', data.accessToken)
	Cookies.set('refreshToken', data.refreshToken)
}

export const saveToStorage = (data: IAuthResponse) => {
	saveTokensStorage(data)
	localStorage.setItem('user', JSON.stringify(data.user))
}

export const removeTokensStorage = () => {
	Cookies.remove('accessToken')
	Cookies.remove('refreshToken')
	localStorage.removeItem('user')
}

```

## Writting user slice in extraReducer to async methods

```
extraReducers: (builder) => {
		builder
			/* Register */
			.addCase(register.pending, (state) => {
				state.isLoading = true
			})
			.addCase(register.fulfilled, (state, { payload }) => {
				state.isLoading = false
				state.user = payload.user
			})
			.addCase(register.rejected, (state) => {
				state.isLoading = false
				state.user = null
			}
		}
```

# Creating rooActions

```
import * as userActions from './user/user.actions'

export const allActions = {
	...userActions,
}

```

# Creating useActions

- binding with dispatch all hooks and memorizing

```
import { bindActionCreators } from '@reduxjs/toolkit'
import { useMemo } from 'react'
import { useDispatch } from 'react-redux'

import { allActions } from '@/store/rootActions'

export const useActions = () => {
	const dispatch = useDispatch()

	return useMemo(() => bindActionCreators(allActions, dispatch), [dispatch])
}

```

# UseTypedSelector

- typiyierung state

```
import { TypeRootState } from "@/store/store";
import { TypedUseSelectorHook, useSelector } from "react-redux";

export const useTypedSelector: TypedUseSelectorHook<TypeRootState> = useSelector
```

## Rewrite useAuth hook

- We are using to take a user

```
import { useTypedSelector } from "./useTypedSelector";

export const useAuth = () => useTypedSelector(state => state.user)
```

## Adding to Auth component our functions

```
	const { login, register } = useActions()
```
