import Layout from '@/components/Layout/Layout'
import { FC } from 'react'
import { IHome } from './home.interface'

const Home: FC<IHome> = () => {
	return (
		<Layout>
			<div>Home</div>
		</Layout>
	)
}

export default Home
