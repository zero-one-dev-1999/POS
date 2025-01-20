import { Stack, InputLabel } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useFormikContext } from 'formik'
import { FC } from 'react'
import Select from '.'

interface IProps {
	field: string
	label?: string
	required?: boolean
	options: Array<{ value: number | string; label: string }>
	onlySelect?: boolean
	readOnly?: boolean
	[key: string]: any
}
const FormikSelect: FC<IProps & { getAvailableOptions?: (options: any) => boolean }> = ({ field, label, required, options = [], onlySelect = false, ...props }) => {
	const { getFieldMeta, getFieldProps, setFieldValue, setFieldTouched } = useFormikContext()
	const [t] = useTranslation()

	const fieldProps = getFieldProps(field)
	const meta = getFieldMeta(field)

	const select = (
		<Select
			fullWidth
			{...props}
			options={options}
			value={fieldProps.value}
			error={meta.touched && meta.error}
			onBlur={() => {
				setFieldTouched(field, true)
			}}
			{...(!onlySelect && {
				// @ts-expect-error
				helperText: t(meta.error),
			})}
			setVal={val => {
				setFieldValue(field, val)

				// childFields.forEach(childField => {
				// 	if (Array.isArray(childField)) {
				// 		// @ts-expect-error
				// 		getFieldMeta(childField[0]).value.forEach((v, index) => {
				// 			setFieldValue(`${childField[0]}[${index}].${childField[1]}`, getFieldMeta(`${childField[0]}[0].${childField[1]}`).initialValue)
				// 		})
				// 	} else {
				// 		setFieldValue(childField, getFieldMeta(childField).initialValue)
				// 	}
				// })
			}}
		/>
	)

	return onlySelect ? (
		select
	) : (
		<Stack width='100%' spacing={0.2}>
			{label && <InputLabel required={required}>{label}</InputLabel>}
			{select}
		</Stack>
	)
}

export default FormikSelect
