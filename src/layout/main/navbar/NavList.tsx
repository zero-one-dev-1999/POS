import { Stack, Popover, appBarClasses } from '@mui/material'
import { useRef, useState, useEffect } from 'react'
import { useLocation } from 'react-router'
import PropTypes from 'prop-types'
import NavItem from './NavItem'
import useActiveLink from '@/hooks/use-active-link'

const NavSubList = ({ data, depth, config }) => (
	<Stack spacing={0.5}>
		{data.map(list => (
			<NavList data={list} config={config} depth={depth + 1} hasChild={!!list.children} key={list.title + list.path} />
		))}
	</Stack>
)

NavSubList.propTypes = {
	data: PropTypes.array,
	depth: PropTypes.number,
	config: PropTypes.object,
}

const NavList = ({ data, depth, config, hasChild }) => {
	const { active, isExternalLink } = useActiveLink(data.path)
	const { pathname } = useLocation()
	const navRef = useRef(null)

	const [open, setOpen] = useState(false)

	useEffect(() => {
		if (open) {
			handleClose()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pathname])

	useEffect(() => {
		const appBarEl = Array.from(document.querySelectorAll(`.${appBarClasses.root}`))

		// Reset styles when hover
		const styles = () => {
			document.body.style.overflow = ''
			document.body.style.padding = ''
			// Apply for Window
			appBarEl.forEach(elem => {
				// @ts-expect-error
				elem.style.padding = ''
			})
		}

		if (open) {
			styles()
		} else {
			styles()
		}
	}, [open])

	const handleOpen = () => {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
	}

	return (
		<>
			<NavItem
				// @ts-expect-error
				item={data}
				open={open}
				ref={navRef}
				depth={depth}
				active={active}
				config={config}
				onMouseEnter={handleOpen}
				onMouseLeave={handleClose}
				externalLink={isExternalLink}
			/>

			{hasChild && (
				<Popover
					open={open}
					anchorEl={navRef.current}
					sx={{
						pointerEvents: 'none',
					}}
					transformOrigin={depth === 1 ? { vertical: 'top', horizontal: 'left' } : { vertical: 'center', horizontal: 'left' }}
					anchorOrigin={depth === 1 ? { vertical: 'bottom', horizontal: 'left' } : { vertical: 'center', horizontal: 'right' }}
					slotProps={{
						paper: {
							onMouseEnter: handleOpen,
							onMouseLeave: handleClose,
							sx: {
								width: 'auto',
								minWidth: 160,
								...(open && {
									pointerEvents: 'auto',
								}),
								padding: '6px',
							},
						},
					}}
				>
					<NavSubList depth={depth} config={config} data={data.children} />
				</Popover>
			)}
		</>
	)
}

NavList.propTypes = {
	data: PropTypes.object,
	depth: PropTypes.number,
	hasChild: PropTypes.bool,
	config: PropTypes.object,
}

export default NavList
