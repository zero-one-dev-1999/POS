import { SxProps, TextField, TextFieldProps } from '@mui/material'
import { FC } from 'react'
import { NumericFormat } from 'react-number-format'

interface IProps {
	value: number | string
	onChange: (value: { floatValue: number }) => void
	sx?: SxProps
	label: string
}

const NumericInput: FC<TextFieldProps & IProps> = ({ value, label, onChange, sx = {}, ...props }) => {
	return (
		// @ts-ignore
		<NumericFormat
			{...props}
			customInput={TextField}
			type='text'
			variant='outlined'
			label={label}
			value={value}
			// @ts-ignore
			onValueChange={onChange}
			thousandSeparator=' '
			allowNegative={false}
			sx={sx}
		/>
	)
}

export default NumericInput
