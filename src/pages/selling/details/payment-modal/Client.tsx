import Iconify from '@/components/iconify'
import FormikInput from '@/components/input/FormikInput'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid2, IconButton, Typography } from '@mui/material'
import { Form, FormikProvider, useFormik } from 'formik'
import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'
import { IValues, useDetailsContext } from '../context'
import { createClient } from '@/firebase/firestore/clients'
import Loader from '@/components/loader'

const ClientModal: FC = () => {
	const [t] = useTranslation()
	const [loading, setLoading] = useState(false)

	const {
		clientModal: { isOpen },
		setClientModal,
		setValues,
	} = useDetailsContext()

	const formik = useFormik({
		initialValues: {
			first_name: '',
			last_name: '',
			phone_number: '',
		},
		validationSchema: Yup.object({
			first_name: Yup.string().required(),
			last_name: Yup.string(),
			phone_number: Yup.string().required(),
		}),
		onSubmit: values => {
			createClient(values, setLoading, id => {
				setValues((prev: IValues) => ({ ...prev, client_id: id }))
				setClientModal({ isOpen: false })
			})
		},
	})

	useEffect(() => {
		if (!isOpen) {
			formik.resetForm()
		}
	}, [isOpen])

	return (
		<FormikProvider value={formik}>
			<Form
				autoComplete='off'
				onSubmit={e => {
					e.preventDefault()
					formik.handleSubmit(e)
				}}
				onKeyDown={e => {
					if (e.key === 'Enter') {
						e.preventDefault()
					}
				}}
			>
				<Dialog open={isOpen} fullWidth maxWidth='sm'>
					<Loader loading={loading} />
					<DialogTitle sx={{ px: 2, py: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
						<Typography variant='h5'>{t('client')}</Typography>
						<IconButton color='error' size='small' onClick={() => setClientModal({ isOpen: false })}>
							<Iconify icon='eva:close-fill' width={36} />
						</IconButton>
					</DialogTitle>
					<Divider />
					<DialogContent sx={{ p: 2 }}>
						<Grid2 container spacing={2}>
							<Grid2 size={12}>
								<FormikInput required field='first_name' label={t('first-name')} />
							</Grid2>
							<Grid2 size={12}>
								<FormikInput field='last_name' label={t('last-name')} />
							</Grid2>
							<Grid2 size={12}>
								<FormikInput required field='phone_number' label={t('phone-number')} />
							</Grid2>
						</Grid2>
					</DialogContent>
					<Divider />
					<DialogActions sx={{ p: 2 }}>
						<Button onClick={() => setClientModal({ isOpen: false })} variant='outlined' color='error'>
							{t('cancel')}
						</Button>
						<Button
							variant='contained'
							color='success'
							onClick={() => {
								formik.handleSubmit()
							}}
							disabled={loading}
						>
							{t('save')}
						</Button>
					</DialogActions>
				</Dialog>
			</Form>
		</FormikProvider>
	)
}

export default ClientModal
