import React from 'react'
import { useField, useFormikContext } from 'formik'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { FormControl, InputLabel, Stack, TextField, TextFieldProps } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'

interface FormikDatePickerProps {
	field: string
	label: string
	required?: boolean
	inputFormat?: string
	size?: 'small' | 'medium'
	textFieldProps?: TextFieldProps
	[key: string]: any
}

const FormikDatePicker: React.FC<FormikDatePickerProps> = ({ field, label, size = 'small', required = false, inputFormat = 'MM/DD/YYYY', textFieldProps, ...props }) => {
	const { setFieldValue } = useFormikContext()
	const [fieldProps, meta] = useField(field)

	const value = fieldProps.value ? dayjs(fieldProps.value) : null

	const handleChange = (newValue: any) => {
		const valueToSave = newValue ? newValue.toDate() : null
		setFieldValue(field, valueToSave)
	}

	return (
		<Stack spacing={0.2}>
			{label && <InputLabel required={required}>{label}</InputLabel>}
			<FormControl fullWidth>
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<DatePicker
						{...props}
						value={value}
						onChange={handleChange}
						// @ts-expect-error
						inputFormat={inputFormat}
						renderInput={(params: TextFieldProps) => (
							<TextField fullWidth {...params} {...textFieldProps} error={meta.touched && Boolean(meta.error)} helperText={meta.touched && meta.error} />
						)}
						slotProps={{ textField: { size } }}
					/>
				</LocalizationProvider>
			</FormControl>
		</Stack>
	)
}

export default FormikDatePicker
