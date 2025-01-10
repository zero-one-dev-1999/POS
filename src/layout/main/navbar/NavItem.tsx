import { Box, Tooltip, ListItemText } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { forwardRef } from 'react'
import PropTypes from 'prop-types'
import Iconify from '@/components/Iconify'
import { StyledIcon, StyledItem } from './styles'
import { Link } from 'react-router'
// @ts-expect-error
const NavItem = forwardRef(({ open, item, depth, config, active, externalLink, ...other }, ref) => {
	const { info, icon, path, roles, title, caption, disabled, children } = item
	const [t] = useTranslation()
	const subItem = depth !== 1

	const renderContent = (
		// @ts-expect-error
		<StyledItem ref={ref} {...other} open={open} depth={depth} disableGutters active={active} config={config} disabled={disabled}>
			{icon && (
				<StyledIcon
					// @ts-expect-error
					size={config.iconSize}
					sx={{
						...(subItem && { mr: 1.5 }),
					}}
				>
					<Iconify icon={icon} />
				</StyledIcon>
			)}

			{!(config.hiddenLabel && !subItem) && (
				<ListItemText
					primary={t(title)}
					sx={{
						...(!subItem && {
							ml: 1,
						}),
					}}
					primaryTypographyProps={{
						noWrap: true,
						typography: 'body2',
						fontWeight: active ? 'fontWeightBold' : 'fontWeightMedium',
						...(subItem && {
							fontWeight: active ? 'fontWeightSemiBold' : 'fontWeightMedium',
						}),
					}}
				/>
			)}

			{info && (
				<Box component='span' sx={{ ml: 0.5, lineHeight: 0 }}>
					{info}
				</Box>
			)}

			{caption && (
				<Tooltip arrow title={caption}>
					<Iconify width={16} icon='eva:info-outline' sx={{ ml: 0.5, color: 'text.disabled' }} />
				</Tooltip>
			)}

			{!!children && <Iconify width={16} sx={{ ml: 1.5, flexShrink: 0 }} icon={subItem ? 'eva:arrow-ios-forward-fill' : 'eva:arrow-ios-downward-fill'} />}
		</StyledItem>
	)

	if (roles && !roles.includes(`${config.currentRole}`)) {
		return null
	}
	if (externalLink) {
		return (
			<Link to={path} style={{ textDecoration: 'none' }}>
				{renderContent}
			</Link>
		)
	}

	// Default
	return (
		<Link to={path} style={{ textDecoration: 'none' }}>
			{renderContent}
		</Link>
	)
})

NavItem.propTypes = {
	// @ts-expect-error
	open: PropTypes.bool,
	item: PropTypes.object,
	active: PropTypes.bool,
	depth: PropTypes.number,
	config: PropTypes.object,
	externalLink: PropTypes.bool,
}

export default NavItem
