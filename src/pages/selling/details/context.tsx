import { sellingProducts } from '@/firebase/firestore/selling'
import { useSelector } from '@/hooks/use-selector'
import { ISellingPayload } from '@/store/selling/types'
import { useConfirm } from 'material-ui-confirm'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

interface IValues {
	course: string
	terminal: string
	currency: string
	paid_price: string
	debt: string
	discount_value: string
	client_id: string | undefined
	discount_type: 'cash' | 'percent'
}

interface ICheckModal {
	isOpen: boolean
	props: ISellingPayload | null
}

const initialValues: IValues = {
	course: '',
	terminal: '',
	currency: '',
	paid_price: '',
	debt: '',
	discount_value: '',
	client_id: undefined,
	discount_type: 'cash',
}

const DetailsContext = createContext<any>(null)

const useDetailsContext = () => useContext(DetailsContext)

const DetailsProvider = ({ children }) => {
	const [paymentModal, setPaymentModal] = useState({ isOpen: false })
	const [currencyId, setCurrencyId] = useState<string | null>(null)
	const [values, setValues] = useState<IValues>(initialValues)
	const [isMix, setIsMix] = useState(false)
	const [isDebt, setIsDebt] = useState(false)
	const [checkModal, setCheckModal] = useState<ICheckModal>({ isOpen: false, props: null })
	const confirm = useConfirm()
	const [t] = useTranslation()

	const { page, orders } = useSelector(({ Basket: s }) => ({
		page: s.page,
		orders: s.products,
		loading: s.loading,
	}))
	const currenciesList = useSelector(s => s.Lists.currenciesList)

	const products = useMemo(() => orders?.[page - 1] ?? [], [page, orders])

	const totalPrice = useMemo(
		() => products.reduce((acc, cur) => acc + cur.selling_price * currenciesList.find(f => f.value === cur.currency_id)?.[currencyId as string] * cur.count, 0),
		[products, currencyId, currenciesList],
	)

	const discountPrice = useMemo(() => {
		if (values.discount_type === 'percent') {
			return (+totalPrice / 100) * +values.discount_value
		}
		return values.discount_value
	}, [totalPrice, values.discount_value, values.discount_type])

	const resultPrice = useMemo(() => +totalPrice - +discountPrice, [totalPrice, discountPrice])

	const paidPrice = useMemo(
		() => +values.terminal + +values.paid_price + +values.debt + +values.course * +values.currency,
		[values.terminal, values.paid_price, values.currency, values.course, values.debt],
	)

	const refundSum = useMemo(() => {
		if (paidPrice > resultPrice) {
			return paidPrice - resultPrice
		}
		return null
	}, [resultPrice, paidPrice])

	const handleSale = () => {
		confirm({
			title: t('are-you-sure'),
			cancellationText: t('no'),
			confirmationText: t('yes'),
			titleProps: { textAlign: 'center' },
			cancellationButtonProps: { color: 'error', variant: 'outlined' },
			confirmationButtonProps: { color: 'success', variant: 'contained' },
			dialogProps: { maxWidth: 'xs' },
		}).then(() => {
			sellingProducts(
				{
					discount_price: discountPrice as number,
					cash: +values.paid_price + +values.course * +values.currency,
					terminal: +values.terminal,
					debt: +values.debt,
					client_id: values.client_id || '',
					currency_id: currencyId,
					products,
				},
				(payload: ISellingPayload) => {
					setPaymentModal({ isOpen: false })
					setValues(initialValues)
					setCheckModal({
						isOpen: true,
						props: payload,
					})
				},
			)
		})
	}

	const handleResetCheckModal = () => {
		setCheckModal({
			isOpen: false,
			props: null,
		})
	}

	const isBtnDisabled = useMemo(() => paidPrice < resultPrice, [values.debt, paidPrice, resultPrice, values.client_id])

	useEffect(() => {
		if (!paymentModal.isOpen) {
			setValues(initialValues)
			setIsMix(false)
			setIsDebt(false)
		}
	}, [paymentModal.isOpen])

	return (
		<DetailsContext.Provider
			value={{
				currencyId,
				setCurrencyId,
				paymentModal,
				setPaymentModal,
				totalPrice,
				products,
				values,
				setValues,
				handleSale,
				isMix,
				setIsMix,
				isDebt,
				setIsDebt,
				handleResetCheckModal,
				resultPrice,
				discountPrice,
				refundSum,
				isBtnDisabled,
				checkModal,
				setCheckModal,
			}}
		>
			{children}
		</DetailsContext.Provider>
	)
}

export { DetailsProvider, useDetailsContext }
export type { IValues }
