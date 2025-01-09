import { Button, Card, TextField, Typography } from '@mui/material'
import { FC } from 'react'
import { useModeContext } from './theme/modeContext'

const Minasa: FC = () => {
	const { changeMode } = useModeContext()

	return (
		<Card variant='outlined' sx={{ m: 2 }}>
			<Button variant='contained' color='primary' onClick={() => changeMode('light')}>
				Light
			</Button>
			<Button variant='contained' color='primary' onClick={() => changeMode('dark')} sx={{ marginLeft: 1 }}>
				Dark
			</Button>
			<br />
			<br />
			<TextField size='small' />
			<Typography variant='h2'>Hello world</Typography>
		</Card>
	)
}

export default Minasa
