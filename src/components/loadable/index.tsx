import { Suspense } from 'react'
import Loader from '../loader'

const Loadable = Component => props => (
	<Suspense fallback={<Loader loading={true} />}>
		<Component {...props} />
	</Suspense>
)

export default Loadable
