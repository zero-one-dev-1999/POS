import { FC } from 'react'
import Iconify from '../Iconify'

interface IProps {
	controller: string
}

const ReferenceMain: FC<IProps> = ({ controller }) => {
	return (
		<div>
			{controller}
			<Iconify icon='material-symbols:arrow-right' />
		</div>
	)
}

export default ReferenceMain
