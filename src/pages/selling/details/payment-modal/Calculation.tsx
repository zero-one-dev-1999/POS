import { useSelector } from '@/hooks/use-selector'
import { Button, Card, Checkbox, Divider, FormControl, FormControlLabel, Grid2, IconButton, InputAdornment, Stack, Typography, useTheme } from '@mui/material'
import { FC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useDetailsContext } from '../context'
import Iconify from '@/components/iconify'
import { fNumber } from '@/utils/format-number'
import NumericInput from '@/components/input/NumericInput'
import Loader from '@/components/loader'

const StartAdornment = (icon: string) => (
	<InputAdornment position='start'>
		<Iconify width={26} icon={icon} />
	</InputAdornment>
)

const Calculation: FC = () => {
	const [t] = useTranslation()
	const theme = useTheme()

	const currenciesList = useSelector(s => s.Lists.currenciesList)

	const loading = useSelector(s => s.Selling.loading)

	const { currencyId, isMix, setIsMix, handleSale, isDebt, setIsDebt, values, setValues, resultPrice, isBtnDisabled, discountPrice, refundSum } = useDetailsContext()

	const totalPaid = useMemo(() => {
		if (isMix) {
			return +values.paid_price + +values.terminal + +values.course * +values.currency
		}
		return +values.paid_price
	}, [isMix, values.paid_price, values.terminal, values.course, values.currency])

	const inputStyle = useMemo(
		() => ({
			'& .MuiInputBase-input': {
				fontSize: '18px',
				textAlign: 'center',
				padding: '14px 16px',
			},
			'& .MuiInputLabel-root': {
				fontSize: '22px',
				fontWeight: 'bold',
				marginTop: '-2px',
				padding: '0 12px 0 4px',
				backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#212B36',
			},
		}),
		[theme.palette.mode],
	)

	return (
		<Card sx={{ height: 'calc(100vh - 97px)', px: 2, pt: '6px', pb: '50px', position: 'relative' }}>
			<Loader loading={loading} />
			<Stack sx={{ height: 'calc(100vh - 168px)', overflowY: 'auto', scrollbarWidth: 'thin' }}>
				<Stack sx={{ gap: 3, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', mb: 1 }}>
					<FormControlLabel
						label='Mix'
						sx={{ '& .MuiFormControlLabel-label': { fontSize: '18px', userSelect: 'none' } }}
						control={
							<Checkbox
								checked={isMix}
								sx={{ '& .MuiSvgIcon-root': { fontSize: 32 } }}
								onChange={e => {
									setIsMix(e.target.checked)
									const course = currenciesList.find(item => item.value === (currencyId === 'USD' ? 'UZS' : 'USD'))?.[currencyId]
									setValues({
										...values,
										terminal: '',
										currency: '',
										course: course,
										// course: currencyId === 'UZS' ? course : course.toFixed(5),
									})
								}}
							/>
						}
					/>
					<FormControlLabel
						label='Nasiya'
						sx={{ '& .MuiFormControlLabel-label': { fontSize: '18px', userSelect: 'none' } }}
						control={
							<Checkbox
								checked={isDebt}
								sx={{ '& .MuiSvgIcon-root': { fontSize: 32 } }}
								onChange={e => {
									setIsDebt(e.target.checked)
									const price = +values.terminal + +values.paid_price + +values.currency * +values.course
									setValues({
										...values,
										debt: e.target.checked && resultPrice > price ? resultPrice - price : '',
									})
								}}
							/>
						}
					/>
				</Stack>
				<Grid2 container spacing={3}>
					<Grid2 size={12}>
						<FormControl fullWidth>
							<NumericInput
								value={values.discount_value}
								label={t('discount')}
								onChange={(val: any) => {
									setValues({ ...values, discount_value: val.floatValue || '' })
								}}
								sx={inputStyle}
								slotProps={{
									input: {
										startAdornment: StartAdornment('mdi:discount'),
										endAdornment: (
											<InputAdornment position='end'>
												<IconButton
													sx={{ marginRight: '-6px' }}
													color={values.discount_type === 'cash' ? 'success' : 'default'}
													onClick={() => {
														setValues({ ...values, discount_type: 'cash' })
													}}
												>
													<Iconify width={36} icon='ri:money-dollar-box-fill' />
												</IconButton>
												<IconButton
													sx={{ marginRight: '-12px' }}
													color={values.discount_type === 'percent' ? 'success' : 'default'}
													onClick={() => {
														setValues({ ...values, discount_type: 'percent' })
													}}
												>
													<Iconify width={36} icon='mdi:percent-box' />
												</IconButton>
											</InputAdornment>
										),
									},
								}}
							/>
						</FormControl>
					</Grid2>
					<Grid2 size={12}>
						<Typography variant='h6' textAlign='center'>
							{t('payment-sum')} - {fNumber(Number(resultPrice))}
						</Typography>
					</Grid2>

					<Grid2 size={12}>
						<FormControl fullWidth>
							<NumericInput
								value={values.paid_price}
								label={t('Naqd')}
								onChange={(val: any) => {
									setValues({ ...values, paid_price: val.floatValue || '' })
								}}
								sx={inputStyle}
								slotProps={{
									input: {
										startAdornment: StartAdornment('fluent-emoji-flat:money-bag'),
										endAdornment: (
											<InputAdornment position='end'>
												<IconButton
													sx={{ marginRight: '-8px' }}
													onClick={() => {
														const mixedTotalPaid = +values.terminal + +values.course * +values.currency
														setValues({ ...values, paid_price: resultPrice - mixedTotalPaid })
													}}
												>
													<Iconify width={30} icon='fluent-emoji-flat:magnet' />
												</IconButton>
											</InputAdornment>
										),
									},
								}}
							/>
						</FormControl>
					</Grid2>
					{isMix && (
						<>
							<Grid2 size={12}>
								<FormControl fullWidth>
									<NumericInput
										value={values.terminal}
										label={t('Terminal')}
										onChange={(val: any) => {
											setValues({ ...values, terminal: val.floatValue || '' })
										}}
										sx={inputStyle}
										slotProps={{
											input: {
												startAdornment: StartAdornment('hugeicons:atm-02'),
											},
										}}
									/>
								</FormControl>
							</Grid2>

							<Grid2 size={6}>
								<FormControl fullWidth>
									<NumericInput
										value={values.currency}
										label={t('Valyuta')}
										onChange={(val: any) => {
											setValues({ ...values, currency: val.floatValue || '' })
										}}
										sx={inputStyle}
										slotProps={{
											input: {
												startAdornment: (
													<InputAdornment position='start'>
														<Typography variant='subtitle1' color='success'>
															{currencyId === 'UZS' ? 'USD' : 'UZS'}
														</Typography>
													</InputAdornment>
												),
											},
										}}
									/>
								</FormControl>
							</Grid2>
							<Grid2 size={6}>
								<FormControl fullWidth>
									<NumericInput
										value={values.course}
										label={t('Kurs')}
										onChange={(val: any) => {
											setValues({ ...values, course: val.floatValue || '' })
										}}
										sx={inputStyle}
										slotProps={{
											input: {
												startAdornment: StartAdornment('solar:course-up-bold'),
											},
										}}
									/>
								</FormControl>
							</Grid2>
						</>
					)}
					{isDebt && (
						<Grid2 size={12}>
							<FormControl fullWidth>
								<NumericInput
									value={values.debt}
									label={t('Nasiya')}
									onChange={(val: any) => {
										setValues({ ...values, debt: val.floatValue || '' })
									}}
									sx={inputStyle}
									slotProps={{
										input: {
											startAdornment: StartAdornment('flat-color-icons:debt'),
										},
									}}
								/>
							</FormControl>
						</Grid2>
					)}
				</Grid2>

				<Typography variant='h6' sx={{ mt: 2 }} textAlign='center'>
					{t(`To'landi`)} - {fNumber(Number(totalPaid ?? 0))}
				</Typography>
				{values?.discount_value ? (
					<Typography variant='h6' textAlign='center'>
						{t('Chegirma')} - {fNumber(discountPrice ?? 0)}
					</Typography>
				) : (
					''
				)}

				{!isDebt &&
					(totalPaid > resultPrice ? (
						<Typography variant='h6' textAlign='center'>
							{t('Qaytim')} - {fNumber(Number(refundSum ?? 0))}
						</Typography>
					) : totalPaid < resultPrice ? (
						<Typography variant='h6' textAlign='center'>
							{t('Qoldi')} - {fNumber(resultPrice - totalPaid)}
						</Typography>
					) : (
						''
					))}
			</Stack>
			<Stack sx={{ position: 'absolute', bottom: '8px', left: 0, width: '100%', px: 2, height: '56px' }}>
				<Divider sx={{ mb: '6px' }} />
				<Button disabled={isBtnDisabled} onClick={handleSale} color='success' variant='contained' sx={{ height: '50px', fontSize: '18px' }}>
					{t('save')}
				</Button>
			</Stack>
		</Card>
	)
}

export default Calculation
