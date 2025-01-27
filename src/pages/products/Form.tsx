import Iconify from '@/components/iconify'
import FormikInput from '@/components/input/FormikInput'
import FormikSelect from '@/components/select/FormikSelect'
import { useDispatch } from '@/hooks/use-dispatch'
import { useSelector } from '@/hooks/use-selector'
import { Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid2, IconButton, Stack } from '@mui/material'
import { FieldArray, Formik, Form as FormikForm, FormikProps } from 'formik'
import { FC, Fragment, useEffect, useLayoutEffect } from 'react'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'
import { IProduct } from './types'
import { productsActions } from '@/store/products'
import { languageList } from '@/i18n/config'
import { createProductDoc, updateProductDoc } from '@/firebase/firestore/products'
import Loader from '@/components/loader'
import SaveButton from '@/components/button/SaveButton'
import CancelButton from '@/components/button/CancelButton'

const FormComponent: FC<FormikProps<IProduct>> = ({ handleSubmit, values, initialValues, resetForm, setFieldValue, setValues }) => {
	const [t] = useTranslation()
	const dispatch = useDispatch()

	const { isUpdate, isLoading, formValues } = useSelector(({ Products: s }) => ({
		isUpdate: s.form.isUpdate,
		isLoading: s.loading.form,
		formValues: s.form.values,
	}))

	const lists = useSelector(s => s.Lists.lists)
	const currenciesList = useSelector(s => s.Lists.currenciesList)

	useEffect(() => {
		if (isUpdate && formValues) {
			setValues(formValues)
		}
	}, [isUpdate, formValues])

	useEffect(() => {
		if (!isUpdate) {
			setFieldValue(`translations[0].lang_short_name`, languageList.find(f => f.value === 'uz')?.value)
		}
	}, [isUpdate])

	useLayoutEffect(() => {
		return () => {
			dispatch(productsActions.resetForm())
		}
	}, [])

	return (
		<FormikForm
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
			<Loader loading={isLoading} />
			<DialogContent sx={{ py: 3 }}>
				<Grid2 container spacing={2}>
					<Grid2 size={12}>
						<FormikSelect field='category_id' label={t('category')} options={lists.categoriesList} />
					</Grid2>
					<FieldArray name='translations'>
						{({ push, remove }) =>
							values.translations?.map((item, index) => (
								<Fragment key={index}>
									<Grid2 size={{ xs: 4 }}>
										<FormikSelect
											field={`translations[${index}].lang_short_name`}
											label={t('language')}
											options={languageList}
											readOnly={item.lang_short_name === 'uz'}
											required={item.lang_short_name === 'uz'}
											getAvailableOptions={options => !values.translations?.find(f => f?.lang_short_name === options.value)}
										/>
									</Grid2>
									<Grid2 size={{ xs: 8 }}>
										<Stack direction={'row'} alignItems={'flex-start'} justifyContent={'space-between'}>
											<Stack sx={{ width: '100%' }}>
												<FormikInput required={item.lang_short_name === 'uz'} field={`translations[${index}].name`} label={t('name')} />
											</Stack>
											<Stack spacing={1} direction='row' alignItems='center' justifyContent='center' pt={2.5}>
												{values.translations?.length !== languageList?.length && (
													<IconButton type='button' color='success' onClick={() => push(initialValues.translations[0])}>
														<Iconify icon='ph:plus' />
													</IconButton>
												)}
												{values.translations?.length > 1 && (
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
					<Grid2 size={6}>
						<FormikSelect field='unit_id' label={t('unit')} options={lists.unitsList} />
					</Grid2>
					<Grid2 size={6}>
						<FormikSelect field='currency_id' label={t('currency')} options={currenciesList} />
					</Grid2>
				</Grid2>
			</DialogContent>
			<Divider />
			<DialogActions>
				<CancelButton
					onClick={() => {
						dispatch(productsActions.setFormIsOpen(false))
						resetForm()
					}}
				/>
				<SaveButton />
			</DialogActions>
		</FormikForm>
	)
}

const Form: FC = () => {
	const [t] = useTranslation()

	const { isOpen, isUpdate } = useSelector(({ Products: s }) => ({
		isOpen: s.form.isOpen,
		isUpdate: s.form.isUpdate,
	}))

	return (
		<Dialog open={isOpen} fullWidth maxWidth='md'>
			<DialogTitle>{isUpdate ? t('edit') : t('add')}</DialogTitle>
			<Divider />
			<Formik
				component={FormComponent}
				initialValues={{
					translations: [{ lang_short_name: '', name: '' }],
					category_id: '',
					unit_id: '',
					currency_id: '',
				}}
				validationSchema={Yup.object({
					translations: Yup.array().of(
						Yup.object({
							name: Yup.string().when('lang_short_name', {
								is: 'uz',
								then: scheme => scheme.required(),
							}),
						}),
					),
					category_id: Yup.string().required(),
					unit_id: Yup.string().required(),
					currency_id: Yup.string().required(),
				})}
				onSubmit={values => {
					if (isUpdate) {
						updateProductDoc(values)
					} else {
						createProductDoc(values)
					}
				}}
			/>
		</Dialog>
	)
}

export default Form
