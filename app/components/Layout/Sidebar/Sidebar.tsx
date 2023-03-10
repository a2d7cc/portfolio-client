import { FC } from 'react'
import { ISidebar } from './Sidebar.interface'
import styles from './Sidebar.module.scss'

const Sidebar: FC<ISidebar> = () => {
	return <div className={styles.header}>Sidebar</div>
}

export default Sidebar
