import { Button, Divider, Grid2, IconButton, InputAdornment, Stack, Typography } from '@mui/material'
import { Form, Formik, useFormikContext } from 'formik'
import { FC, useState } from 'react'
import FormikInput from '@/components/FormikInput'
import Iconify from '@/components/Iconify'
import { POS_LOGIN_PAGE } from '@/helpers/pages'
import { Link } from 'react-router'
import * as Yup from 'yup'
import { registerUser } from '@/firebase/firestore/users'

const FormComponent: FC = () => {
	const [showPassword, setShowPassword] = useState(false)
	const { handleSubmit } = useFormikContext()

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
				<Stack sx={{ width: '50%' }}>
					<Typography textAlign={'center'} variant='h3' mb={4}>
						Sign Up
					</Typography>
					<Grid2 container spacing={2}>
						<Grid2 size={12}>
							<FormikInput field='username' size='medium' label='Userusername' />
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
						<Grid2 size={12}>
							<FormikInput
								field='confirm_password'
								size='medium'
								label='Confirm Password'
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
						Sign Up
					</Button>
					<Divider variant='middle' sx={{ borderStyle: 'dashed' }}>
						or
					</Divider>

					<Link to={POS_LOGIN_PAGE} style={{ margin: '24px 0' }}>
						<Button type='button' variant='contained' sx={{ width: '100%' }} size='large'>
							Sign In
						</Button>
					</Link>
				</Stack>
			</Stack>
		</Form>
	)
}

const LoginPage: FC = () => {
	return (
		<Formik
			component={FormComponent}
			onSubmit={(values: { username: string; password: string; confirm_password: string }) => registerUser({ username: values.username, password: values.password })}
			initialValues={{ username: '', password: '', confirm_password: '' }}
			validationSchema={Yup.object({
				username: Yup.string().required(),
				password: Yup.string().required(),
				confirm_password: Yup.string().when('password', (password, schema, field) =>
					password && field.value ? schema.oneOf([Yup.ref('password')]).required('Not matched') : schema,
				),
			})}
		/>
	)
}

export default LoginPage