import { Icon } from '@iconify/react'
import { forwardRef } from 'react'
import { SxProps, Box } from '@mui/material'

const Iconify = forwardRef(({ sx, icon, width = 20, ...other }: { sx?: SxProps; icon: string; width?: number }, ref) => (
	<Box ref={ref} {...other} icon={icon} component={Icon} className='component-iconify' sx={{ width, height: width, ...sx }} />
))

export default Iconify
