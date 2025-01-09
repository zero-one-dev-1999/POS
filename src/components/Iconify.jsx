import { Icon } from '@iconify/react'
import Box from '@mui/material/Box'
import { forwardRef } from 'react'
import PropTypes from 'prop-types'

const Iconify = forwardRef(({ sx, icon, width = 20, ...other }, ref) => (
	<Box ref={ref} {...other} icon={icon} component={Icon} className='component-iconify' sx={{ width, height: width, ...sx }} />
))

Iconify.propTypes = {
	sx: PropTypes.object,
	width: PropTypes.number,
	icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
}

export default Iconify
