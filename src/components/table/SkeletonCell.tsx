import { Skeleton } from '@mui/material'
import { FC } from 'react'

const SkeletonCell: FC = () => (
	<Skeleton
		height={45}
		animation='wave'
		sx={{
			'&:after': {
				animationDelay: '1s',
				animationTimingFunction: 'ease-in',
			},
		}}
	/>
)

export default SkeletonCell
