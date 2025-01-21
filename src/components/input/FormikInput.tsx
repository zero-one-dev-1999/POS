import { Stack, TextField, InputLabel, FormControl, TextFieldProps } from '@mui/material'
import { useFormikContext } from 'formik'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

interface FormikInputProps {
	field: string
	min?: number
	max?: number
	label?: string
	readOnly?: boolean
	required?: boolean
	withoutHelperText?: boolean
}

const FormikInput: FC<TextFieldProps & FormikInputProps> = ({
	min,
	max,
	field,
	label,
	type = 'text',
	size = 'small',
	InputProps = {},
	readOnly = false,
	required = false,
	onChange,
	withoutHelperText = false,
	...props
}) => {
	const { getFieldMeta, getFieldProps } = useFormikContext()
	const [t] = useTranslation()

	const fieldProps = getFieldProps(field)
	const meta = getFieldMeta(field)

	return (
		<Stack spacing={0.2}>
			{label && <InputLabel required={required}>{label}</InputLabel>}
			<FormControl fullWidth>
				<TextField
					{...props}
					type={type}
					size={size}
					{...fieldProps}
					onChange={onChange ?? fieldProps.onChange}
					inputProps={{ max, min }}
					value={fieldProps.value || ''}
					// @ts-expect-error
					onWheel={e => e.target.blur()}
					InputProps={{ ...InputProps, readOnly }}
					error={Boolean(meta.touched && meta.error)}
					// @ts-expect-error
					helperText={!withoutHelperText ? Boolean(meta.touched && meta.error) && t(meta.error) : ''}
				/>
			</FormControl>
		</Stack>
	)
}

export default FormikInput
