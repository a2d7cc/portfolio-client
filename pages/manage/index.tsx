import { NextPageAuth } from '@/providers/AuthProvider/auth.types'
import { NextPage } from 'next'

const AdminPage: NextPageAuth = () => {
	return <div>AdminPage</div>
}

AdminPage.isOnlyAdmin = true

export default AdminPage
