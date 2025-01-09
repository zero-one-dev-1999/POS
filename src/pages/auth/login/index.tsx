import { Button, Grid2, IconButton, InputAdornment, Stack, Typography } from '@mui/material'
import { FC, useEffect, useState } from 'react'
import { Formik, Form, useFormikContext } from 'formik'
import * as Yup from 'yup'
import FormikInput from '@/components/FormikInput'
import Iconify from '@/components/Iconify'
import { addUser, getUsers } from '@/firebase/firestore/users'

const FormComponent: FC = () => {
	const [showPassword, setShowPassword] = useState(false)
	const { handleSubmit } = useFormikContext()

	useEffect(() => {
		const fetchUsers = async () => {
			const data = await getUsers()
			console.log(data)
		}

		fetchUsers()
	}, [])

	return (
		<Form
			autoComplete='off'
			onSubmit={e => {
				e.preventDefault()
				handleSubmit(e)
			}}
			onKeyDown={e => {
				if (e.key === 'Enter') {
					e.preventDefault()
				}
			}}
		>
			<Stack sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }} spacing={2}>
				<Stack>
					<Typography textAlign={'center'} variant='h3' mb={4}>
						Sign In
					</Typography>
					<Grid2 container spacing={2}>
						<Grid2 size={12}>
							<FormikInput field='name' size='medium' label='Username' />
						</Grid2>
						<Grid2 size={12}>
							<FormikInput
								field='password'
								size='medium'
								label='Password'
								type={showPassword ? 'text' : 'password'}
								InputProps={{
									endAdornment: (
										<InputAdornment position='end'>
											<IconButton edge='end' onClick={() => setShowPassword(!showPassword)}>
												<Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
											</IconButton>
										</InputAdornment>
									),
								}}
							/>
						</Grid2>
					</Grid2>
					<Button type='submit' variant='contained' color='success' sx={{ my: 4 }} size='large'>
						Sign In
					</Button>
				</Stack>
			</Stack>
		</Form>
	)
}

const LoginPage: FC = () => {
	return (
		<Formik
			component={FormComponent}
			onSubmit={values => addUser(values)}
			initialValues={{ name: '', password: '' }}
			validationSchema={Yup.object({
				name: Yup.string().required(),
				password: Yup.string().required(),
			})}
		/>
	)
}

export default LoginPage
