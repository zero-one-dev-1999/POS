import Iconify from '@/components/iconify'
import FormikInput from '@/components/input/FormikInput'
import FormikSelect from '@/components/select/FormikSelect'
import { useDispatch } from '@/hooks/use-dispatch'
import { useSelector } from '@/hooks/use-selector'
import { Card, CardHeader, DialogActions, DialogContent, Divider, Grid2, IconButton, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { FieldArray, Formik, Form as FormikForm, FormikProps } from 'formik'
import { FC, useEffect, useLayoutEffect } from 'react'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'
import { warehouseIncomeActions } from '@/store/warehouse/income'

import Loader from '@/components/loader'
import { IFormValues } from '../../../store/warehouse/income/types'
import GoBackButton from '@/components/button/GoBackButton'
import { POS_WAREHOUSE_INCOME_INDEX_PAGE, POS_WAREHOUSE_INCOME_VIEW_PAGE } from '@/helpers/pages'
import SaveButton from '@/components/button/SaveButton'
import FormikDatePicker from '@/components/datepicker'
import { createIncomeDoc, updateIncomeDoc } from '@/firebase/firestore/income'

import { v4 as uuidv4 } from 'uuid'
import { generatePath, useNavigate } from 'react-router'

function generateNumericUUID(length = 6) {
	const uuid = uuidv4().replace(/\D/g, '')
	return uuid.slice(0, length)
}
const FormComponent: FC<FormikProps<IFormValues>> = ({ handleSubmit, values, initialValues, setFieldValue, setValues }) => {
	const [t] = useTranslation()
	const dispatch = useDispatch()

	const { isUpdate, isLoading, formValues } = useSelector(({ WarehouseIncome: s }) => ({
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

	useLayoutEffect(() => {
		return () => {
			dispatch(warehouseIncomeActions.resetForm())
		}
	}, [])

	useEffect(() => {
		if (!isUpdate) {
			setFieldValue('document_number', 'IDN-' + generateNumericUUID())
		}
	}, [isUpdate])

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
					<Grid2 size={4}>
						<FormikDatePicker field='date' label={t('date')} />
					</Grid2>
					<Grid2 size={4}>
						<FormikInput field='document_number' label={t('document-number')} />
					</Grid2>
					<Grid2 size={12}>
						<FieldArray name='document_items'>
							{({ push, remove }) => (
								<Table size='small'>
									<TableHead>
										<TableRow>
											<TableCell sx={{ width: '50px' }}>№</TableCell>
											<TableCell sx={{ minWidth: '300px' }}>{t('product')}</TableCell>
											<TableCell>{t('quantity')}</TableCell>
											<TableCell>{t('buying-price')}</TableCell>
											<TableCell>{t('selling-price')}</TableCell>
											<TableCell>{t('currency')}</TableCell>
											<TableCell sx={{ width: '50px' }}>
												<IconButton type='button' color='success' onClick={() => push(initialValues.document_items[0])}>
													<Iconify icon='ph:plus' />
												</IconButton>
											</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{values.document_items?.map((_, index) => (
											<TableRow key={index}>
												<TableCell>{index + 1}</TableCell>
												<TableCell>
													<FormikSelect
														withoutHelperText
														field={`document_items[${index}].product_id`}
														options={lists.productsList}
														getAvailableOptions={options => !values.document_items?.find(f => f?.product_id === options.value)}
														onChange={(val: { currency_id: number; category_id: number; unit_id: number }) => {
															if (val?.currency_id) {
																setFieldValue(`document_items[${index}].currency_id`, val?.currency_id)
																setFieldValue(`document_items[${index}].category_id`, val?.category_id)
																setFieldValue(`document_items[${index}].unit_id`, val?.unit_id)
															} else {
																setFieldValue(`document_items[${index}].currency_id`, '')
																setFieldValue(`document_items[${index}].category_id`, '')
																setFieldValue(`document_items[${index}].unit_id`, '')
															}
														}}
													/>
												</TableCell>
												<TableCell>
													<FormikInput withoutHelperText type='number' field={`document_items[${index}].quantity`} />
												</TableCell>
												<TableCell>
													<FormikInput withoutHelperText type='number' field={`document_items[${index}].buying_price`} />
												</TableCell>
												<TableCell>
													<FormikInput withoutHelperText type='number' field={`document_items[${index}].selling_price`} />
												</TableCell>
												<TableCell>
													<FormikSelect withoutHelperText readOnly field={`document_items[${index}].currency_id`} options={currenciesList} />
												</TableCell>
												<TableCell>
													<IconButton disabled={values.document_items?.length === 1} type='button' color='error' onClick={() => remove(index)}>
														<Iconify icon='ph:trash' />
													</IconButton>
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							)}
						</FieldArray>
					</Grid2>
				</Grid2>
			</DialogContent>
			<Divider />
			<DialogActions sx={{ py: 2, px: 3 }}>
				<GoBackButton path={POS_WAREHOUSE_INCOME_INDEX_PAGE} />
				<SaveButton />
			</DialogActions>
		</FormikForm>
	)
}

const Form: FC = () => {
	const [t] = useTranslation()
	const navigate = useNavigate()

	const { isUpdate } = useSelector(({ WarehouseIncome: s }) => ({
		isUpdate: s.form.isUpdate,
	}))

	return (
		<Card>
			<CardHeader title={t('income')} />
			<Divider sx={{ mt: 2 }} />
			<Formik
				component={FormComponent}
				initialValues={{
					date: new Date(),
					document_number: '',
					document_items: [
						{
							product_id: '',
							quantity: undefined,
							buying_price: undefined,
							selling_price: undefined,
							currency_id: '',
							category_id: '',
							unit_id: '',
						},
					],
				}}
				validationSchema={Yup.object({
					date: Yup.date().required(),
					document_items: Yup.array().of(
						Yup.object({
							product_id: Yup.string().required(),
							quantity: Yup.number().required(),
							buying_price: Yup.number().required(),
							selling_price: Yup.number().required(),
							currency_id: Yup.string().required(),
						}),
					),
				})}
				onSubmit={values => {
					;(isUpdate ? updateIncomeDoc : createIncomeDoc)(values, id => navigate(generatePath(POS_WAREHOUSE_INCOME_VIEW_PAGE, { id })))
				}}
			/>
		</Card>
	)
}

export default Form
