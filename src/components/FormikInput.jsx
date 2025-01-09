import { Stack, TextField, InputLabel, FormControl } from '@mui/material'
import { useFormikContext } from 'formik'
import { useTranslation } from 'react-i18next'

const FormikInput = ({ min, max, field, label, type = 'text', size = 'small', InputProps = {}, readOnly = false, required = false, withoutHelperText = false, ...props }) => {
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
					inputProps={{ max, min }}
					value={fieldProps.value || ''}
					onWheel={e => e.target.blur()}
					InputProps={{ ...InputProps, readOnly }}
					error={Boolean(meta.touched && meta.error)}
					helperText={!withoutHelperText ? Boolean(meta.touched && meta.error) && t(meta.error) : ''}
				/>
			</FormControl>
		</Stack>
	)
}

export default FormikInput
