import Meta from '@/utils/Meta/Meta'
import { FC } from 'react'
import { IHome } from './home.interface'

const Home: FC<IHome> = () => {
	return (
		<Meta title="Portfolio" description="Welcome to my developer site">
			<div>Home</div>
		</Meta>
	)
}

export default Home
