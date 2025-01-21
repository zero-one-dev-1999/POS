import Iconify from '@/components/iconify'
import FormikInput from '@/components/input/FormikInput'
import FormikSelect from '@/components/select/FormikSelect'
import { useDispatch } from '@/hooks/use-dispatch'
import { useSelector } from '@/hooks/use-selector'
import { Card, CardHeader, Chip, DialogActions, DialogContent, Divider, Grid2, IconButton, InputAdornment, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { FieldArray, Formik, Form as FormikForm, FormikProps } from 'formik'
import { FC, useEffect, useLayoutEffect } from 'react'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'
import { warehouseOutcomeActions } from '@/store/warehouse/outcome'

import Loader from '@/components/loader'
import GoBackButton from '@/components/button/GoBackButton'
import { POS_WAREHOUSE_OUTCOME_INDEX_PAGE, POS_WAREHOUSE_OUTCOME_VIEW_PAGE } from '@/helpers/pages'
import SaveButton from '@/components/button/SaveButton'
import FormikDatePicker from '@/components/datepicker'
import { createOutcomeDoc, updateOutcomeDoc } from '@/firebase/firestore/outcome'

import { v4 as uuidv4 } from 'uuid'
import { generatePath, useNavigate } from 'react-router'
import { IOutcomeFormValues } from '@/store/warehouse/outcome/types'

function generateNumericUUID(length = 6) {
	const uuid = uuidv4().replace(/\D/g, '')
	return uuid.slice(0, length)
}
const FormComponent: FC<FormikProps<IOutcomeFormValues>> = ({ handleSubmit, values, initialValues, setFieldValue, setValues }) => {
	const [t] = useTranslation()
	const dispatch = useDispatch()

	const { isUpdate, isLoading, formValues } = useSelector(({ WarehouseOutcome: s }) => ({
		isUpdate: s.form.isUpdate,
		isLoading: s.loading.form,
		formValues: s.form.values,
	}))

	const lists = useSelector(s => s.Lists.lists)

	useEffect(() => {
		if (isUpdate && formValues) {
			setValues(formValues)
		}
	}, [isUpdate, formValues])

	useLayoutEffect(() => {
		return () => {
			dispatch(warehouseOutcomeActions.resetForm())
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
											<TableCell>{t('currency')}</TableCell>
											<TableCell sx={{ width: '50px' }}>
												<IconButton type='button' color='success' onClick={() => push(initialValues.document_items[0])}>
													<Iconify icon='ph:plus' />
												</IconButton>
											</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{values.document_items?.map((item, index) => (
											<TableRow key={index}>
												<TableCell>{index + 1}</TableCell>
												<TableCell>
													<FormikSelect
														withoutHelperText
														field={`document_items[${index}].product_id`}
														options={lists.productsInWarehouseList}
														getAvailableOptions={options => !values.document_items?.find(f => f?.product_id === options.value)}
														onChange={(val: { currency_id: string }) => {
															setFieldValue(`document_items[${index}].quantity`, undefined)
															if (val?.currency_id) {
																setFieldValue(`document_items[${index}].currency_id`, val?.currency_id)
															} else {
																setFieldValue(`document_items[${index}].currency_id`, '')
															}
														}}
													/>
												</TableCell>
												<TableCell>
													<FormikInput
														withoutHelperText
														disabled={!item.product_id}
														type='number'
														field={`document_items[${index}].quantity`}
														onChange={e => {
															const remain = lists.productsInWarehouseList?.find(f => f?.value === item.product_id)?.remain
															if (Number(e.target.value) > remain) {
																setFieldValue(`document_items[${index}].quantity`, remain)
																alert(t('not-enough-quantity'))
															} else {
																setFieldValue(`document_items[${index}].quantity`, e.target.value)
															}
														}}
														InputProps={{
															endAdornment: (
																<InputAdornment position='end'>
																	{lists.productsInWarehouseList?.find(f => f?.value === item.product_id)?.remain > 0 ? (
																		<Chip size='small' color='warning' label={lists.productsInWarehouseList?.find(f => f?.value === item.product_id)?.remain} />
																	) : (
																		''
																	)}
																</InputAdornment>
															),
														}}
													/>
												</TableCell>
												<TableCell>
													<FormikSelect withoutHelperText readOnly field={`document_items[${index}].currency_id`} options={lists.currenciesList} />
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
				<GoBackButton path={POS_WAREHOUSE_OUTCOME_INDEX_PAGE} />
				<SaveButton />
			</DialogActions>
		</FormikForm>
	)
}

const Form: FC = () => {
	const [t] = useTranslation()
	const navigate = useNavigate()

	const { isUpdate } = useSelector(({ WarehouseOutcome: s }) => ({
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
							currency_id: '',
						},
					],
				}}
				validationSchema={Yup.object({
					date: Yup.date().required(),
					document_items: Yup.array().of(
						Yup.object({
							product_id: Yup.string().required(),
							quantity: Yup.number().required(),
							currency_id: Yup.string().required(),
						}),
					),
				})}
				onSubmit={values => {
					;(isUpdate ? updateOutcomeDoc : createOutcomeDoc)(values, id => navigate(generatePath(POS_WAREHOUSE_OUTCOME_VIEW_PAGE, { id })))
				}}
			/>
		</Card>
	)
}

export default Form
