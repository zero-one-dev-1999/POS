import LazyImage from '@/components/image'
import { useModeContext } from '@/theme/modeContext'
import { FC } from 'react'
import { Link } from 'react-router'

const Logo: FC = () => {
	const { mode } = useModeContext()
	return (
		<Link to='/'>
			<LazyImage src={mode === 'light' ? '/logo-pos-light.png' : '/logo-pos-dark.png'} alt='Descriptive Text' height='40' />
		</Link>
	)
}

export default Logo
