import { useSelector } from '@/hooks/use-selector'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, Grid, Grid2, IconButton, Stack } from '@mui/material'
import { FieldArray, Formik, FormikProps, FormikProvider, useFormik, useFormikContext, Form as FormikForm } from 'formik'
import { FC, Fragment, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'
import FormikSelect from '../select/FormikSelect'
import FormikInput from '../input/FormikInput'
import Iconify from '../iconify'
import { useDispatch } from '@/hooks/use-dispatch'
import { referenceMainActions } from '@/store/reference-main'
import { createReferenceMainDoc, getReferenceMainData } from '@/firebase/firestore/reference-main'
import Loader from '../loader'

const langList = [
	{ value: 'uz', label: 'O`zbek' },
	{ value: 'en', label: 'English' },
	{ value: 'ru', label: 'Russian' },
]

const Form: FC<{ controller: string }> = ({ controller }) => {
	const [t] = useTranslation()
	const dispatch = useDispatch()

	const { isOpen, isUpdate, isLoading } = useSelector(({ ReferenceMain: s }) => ({
		isOpen: s.form.isOpen,
		isUpdate: s.form.isUpdate,
		isLoading: s.loading.form,
	}))

	const formik = useFormik({
		initialValues: {
			translations: [{ lang_short_name: '', name: '' }],
		},
		validationSchema: Yup.object({
			translations: Yup.array().of(
				Yup.object({
					name: Yup.string().when('lang_short_name', {
						is: 'uz',
						then: scheme => scheme.required(),
					}),
				}),
			),
		}),
		onSubmit: values => {
			dispatch(referenceMainActions.setFormLoading(true))
			createReferenceMainDoc(controller, values)
			setTimeout(() => {
				dispatch(referenceMainActions.setFormLoading(false))
				dispatch(referenceMainActions.setFormIsOpen(false))
				formik.resetForm()
				getReferenceMainData(controller)
			}, 600)
		},
	})

	useEffect(() => {
		if (!isUpdate && isOpen) {
			formik.setFieldValue(`translations[0].lang_short_name`, langList.find(f => f.value === 'uz')?.value)
		}
	}, [isOpen, isUpdate])

	return (
		<FormikProvider value={formik}>
			<Dialog open={isOpen} fullWidth maxWidth='md'>
				<DialogTitle>{t('add')}</DialogTitle>
				<Divider />
				<DialogContent sx={{ my: 2 }}>
					<Loader loading={isLoading} />
					<FormikForm
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
						<Grid2 container spacing={2}>
							<FieldArray name='translations'>
								{({ push, remove }) =>
									formik.values.translations?.map((item, index) => (
										<Fragment key={index}>
											<Grid2 size={{ xs: 4 }}>
												<FormikSelect
													field={`translations[${index}].lang_short_name`}
													label={t('language')}
													options={langList}
													readOnly={item.lang_short_name === 'uz'}
													required={item.lang_short_name === 'uz'}
													getAvailableOptions={options => !formik.values.translations?.find(f => f?.lang_short_name === options.value)}
												/>
											</Grid2>
											<Grid2 size={{ xs: 8 }}>
												<Stack direction={'row'} alignItems={'flex-start'} justifyContent={'space-between'}>
													<Stack sx={{ width: '100%' }}>
														<FormikInput required={item.lang_short_name === 'uz'} field={`translations[${index}].name`} label={t('name')} />
													</Stack>
													<Stack spacing={1} direction='row' alignItems='center' justifyContent='center' pt={2.5}>
														{formik.values.translations?.length !== langList?.length && (
															<IconButton type='button' color='success' onClick={() => push(formik.initialValues.translations[0])}>
																<Iconify icon='ph:plus' />
															</IconButton>
														)}
														{formik.values.translations?.length > 1 && (
															<IconButton
																type='button'
																color='error'
																disabled={item.lang_short_name === 'uz'}
																onClick={() => {
																	remove(index)
																}}
															>
																<Iconify icon='ph:minus' />
															</IconButton>
														)}
													</Stack>
												</Stack>
											</Grid2>
										</Fragment>
									))
								}
							</FieldArray>
						</Grid2>
					</FormikForm>
				</DialogContent>
				<Divider />

				<DialogActions>
					<Button
						type='button'
						onClick={() => {
							dispatch(referenceMainActions.setFormIsOpen(false))
							formik.resetForm()
						}}
						color='error'
						variant='outlined'
					>
						{t('cancel')}
					</Button>
					<Button
						type='submit'
						color='success'
						variant='contained'
						onClick={() => {
							formik.handleSubmit()
						}}
					>
						{t('save')}
					</Button>
				</DialogActions>
			</Dialog>
		</FormikProvider>
	)
}

export default Form