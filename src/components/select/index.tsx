/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Autocomplete, AutocompleteProps, SxProps, TextField } from '@mui/material'
import { ChangeEvent, ReactNode, useCallback, useMemo } from 'react'

// @ts-expect-error
interface SelectProps<T, Multiple extends boolean | undefined = false, DisableClearable extends boolean | undefined = false, FreeSolo extends boolean | undefined = false>
	extends AutocompleteProps<T, Multiple, DisableClearable, FreeSolo> {
	options: readonly T[]
	error?: string | false
	helperText?: string
	required?: boolean
	textFieldOnChange?: (e: ChangeEvent<HTMLInputElement>) => void
	getAvailableOptions?: () => void
	withoutHelperText?: boolean
	inputSx?: SxProps
	setVal: (val: number | number[]) => void
	placeholder?: string
	renderInput?: (params: any) => ReactNode
}

const Select = <T, Multiple extends boolean | undefined = false, DisableClearable extends boolean | undefined = false, FreeSolo extends boolean | undefined = false>({
	value,
	error,
	setVal,
	onChange,
	helperText,
	inputSx = {},
	options = [],
	size = 'small',
	placeholder = '',
	required = false,
	textFieldOnChange,
	getAvailableOptions,
	withoutHelperText = false,
	...props
}: SelectProps<T, Multiple, DisableClearable, FreeSolo>) => {
	const selected = useMemo(() => {
		if (props.multiple && Array.isArray(value)) {
			// @ts-expect-error
			return options.filter(f => value.includes(f.value))
		}
		// @ts-expect-error
		return options.find(f => f.value === value) ?? null
	}, [value, options])

	const availableOptions = useMemo(() => {
		let filteredOptions = options

		if (getAvailableOptions) {
			;(Array.isArray(getAvailableOptions) ? getAvailableOptions : [getAvailableOptions]).forEach(fn => {
				filteredOptions = filteredOptions.filter(fn)
			})

			return filteredOptions
		}

		return filteredOptions
	}, [options, getAvailableOptions])

	const filterOptions = useCallback(
		(fOptions, state) => fOptions.filter(f => state.getOptionLabel(f).toLowerCase()?.replace(/\s/g, '').includes(state.inputValue?.replace(/\s/g, '').toLowerCase())),
		[],
	)

	return (
		<Autocomplete
			{...props}
			size={size}
			options={availableOptions}
			filterOptions={filterOptions}
			// @ts-expect-error
			value={props?.multiple ? (selected ?? []) : selected}
			// @ts-expect-error
			getOptionLabel={option => (option ? option?.label?.toString() : '')}
			// @ts-expect-error
			isOptionEqualToValue={(opt, selectedOption) => opt.value === selectedOption.value}
			onChange={(_, selectedValue) => {
				// @ts-expect-error
				setVal?.(props.multiple && Array.isArray(selectedValue) ? (selectedValue.map(s => s.value) ?? []) : (selectedValue?.value ?? undefined))
				// @ts-expect-error
				onChange?.(selectedValue)
			}}
			renderInput={params => (
				<TextField
					{...params}
					size={size}
					sx={{ ...inputSx }}
					error={Boolean(error)}
					onChange={textFieldOnChange}
					InputLabelProps={{ required }}
					helperText={!withoutHelperText && error && helperText}
					placeholder={placeholder ?? ''}
				/>
			)}
		/>
	)
}

export default Select
