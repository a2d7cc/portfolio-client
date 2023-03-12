/* I need to make a Heading component */

import Heading from '@/components/ui/heading/Heading'
import Meta from '@/utils/Meta/Meta'

export default function Error404() {
	return (
		<Meta title="Page not found">
			<Heading title="404 - Page Not Found" />
		</Meta>
	)
}
