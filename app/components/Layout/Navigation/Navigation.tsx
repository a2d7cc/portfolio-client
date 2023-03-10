import { FC } from 'react'
import { INavigation } from './Navigation.interface'
import styles from './Navigation.module.scss'

const Navigation: FC<INavigation> = () => {
	return <div className={styles.header}>Navigation</div>
}

export default Navigation
