import { FC } from 'react'
import { ISidebar } from './Sidebar.interface'
import styles from './Sidebar.module.scss'
import { useAllCategories } from './useAllCategories'

const Sidebar: FC<ISidebar> = () => {
	const { isLoading, data: categories } = useAllCategories()
	console.log(categories)

	return <div className={styles.header}>Sidebar</div>
}

export default Sidebar
