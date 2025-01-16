import { Button, Divider, Grid2, IconButton, InputAdornment, Stack, Typography } from '@mui/material'
import { FC, useState } from 'react'
import { Formik, Form, useFormikContext } from 'formik'
import * as Yup from 'yup'
import Iconify from '@/components/iconify'
import { loginUser } from '@/firebase/firestore/users'
import { Link } from 'react-router'
import { POS_REGISTER_PAGE } from '@/helpers/pages'
import { useTranslation } from 'react-i18next'
import FormikInput from '@/components/input/FormikInput'

const FormComponent: FC = () => {
	const [showPassword, setShowPassword] = useState(false)
	const [t] = useTranslation()
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
				<Stack>
					<Typography textAlign={'center'} variant='h3' mb={4}>
						{t('sign-in')}
					</Typography>
					<Grid2 container spacing={2}>
						<Grid2 size={12}>
							<FormikInput field='username' size='medium' label={t('username')} />
						</Grid2>
						<Grid2 size={12}>
							<FormikInput
								field='password'
								size='medium'
								label={t('password')}
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
						{t('sign-in')}
					</Button>
					<Divider variant='middle' sx={{ borderStyle: 'dashed' }}>
						{t('or')}
					</Divider>

					<Link to={POS_REGISTER_PAGE} style={{ margin: '24px 0' }}>
						<Button type='button' variant='contained' sx={{ width: '100%' }} size='large'>
							{t('sign-up')}
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
			onSubmit={(values: { username: string; password: string }) => loginUser(values)}
			initialValues={{ username: '', password: '' }}
			validationSchema={Yup.object({
				username: Yup.string().required(),
				password: Yup.string().required(),
			})}
		/>
	)
}

export default LoginPage
