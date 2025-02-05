import { store } from '@/store'
import { addDoc, collection, getDocs, getFirestore, query, where } from 'firebase/firestore'
import { app } from '../config'
import { sellingActions } from '@/store/selling'
import { getProductName, ILanguage } from './lists'
import { IProduct, ISellingPayload } from '@/store/selling/types'
import { toastErrorMessage, toastSuccessMessage } from '@/utils/toast'
import { t } from 'i18next'
import { basketActions } from '@/store/selling/basket'
import { getProductsInWarehouse, updateProductsInWarehouse } from './warehouse'

const db = getFirestore(app)
export const getCategories = async () => {
	store.dispatch(sellingActions.setCategoriesLoading(true))

	const user_id = store.getState().App.user?.uid
	const language = localStorage.getItem('i18nextLng')
	const response = await getDocs(query(collection(db, 'reference-main-category'), where('user_id', '==', user_id)))

	store.dispatch(
		sellingActions.setCategoriesData(
			response.docs.map(doc => ({
				value: doc.id,
				label: doc.data().translations.find((f: ILanguage) => f.lang_short_name === language)?.name
					? doc.data().translations.find((f: ILanguage) => f.lang_short_name === language).name
					: doc.data().translations.find((f: ILanguage) => f.lang_short_name === 'uz')?.name || '',
			})),
		),
	)

	store.dispatch(sellingActions.setCategoriesLoading(false))
}

export const getProducts = async ({ product_name = '', category_id = '' }: { product_name?: string; category_id?: string }) => {
	store.dispatch(sellingActions.setProductsLoading(true))

	const user_id = store.getState().App.user?.uid
	const response = await getDocs(collection(db, 'warehouse'))

	const products = response.docs.map(doc => doc.data())?.length
		? response.docs
				.map(doc => doc.data())[0]
				.products.filter((f: IProduct) => {
					const isUserMatch = f.user_id === user_id
					let isCategoryMatch = true
					let isProductNameMatch = true

					if (category_id) {
						isCategoryMatch = f.category_id === category_id
					}
					if (product_name) {
						isProductNameMatch = getProductName(f.product_id).toLowerCase().includes(product_name.toLowerCase())
					}

					return isUserMatch && isCategoryMatch && isProductNameMatch
				})
		: []

	store.dispatch(sellingActions.setProductsData(products))
	store.dispatch(sellingActions.setProductsLoading(false))
}

export const sellingProducts = async (payload: ISellingPayload, cb: (props: ISellingPayload) => void) => {
	try {
		const user_id = store.getState().App.user?.uid
		store.dispatch(sellingActions.setLoading(true))
		await addDoc(collection(db, 'products-sold'), { ...payload, status: 1, user_id })

		setTimeout(() => {
			store.dispatch(basketActions.clearBasket())
			toastSuccessMessage(t('successfully'))
			store.dispatch(sellingActions.setLoading(false))
			cb(payload)
		}, 300)

		const { id: docId, products } = await getProductsInWarehouse()

		const resultProducts = products?.length ? [...products] : []

		payload.products.forEach((item: IProduct) => {
			if (resultProducts.find(product => product.product_id === item.product_id && product.user_id === user_id)) {
				const index = resultProducts.findIndex(product => product.product_id === item.product_id && product.user_id === user_id)
				resultProducts[index].quantity = resultProducts[index].quantity - (item?.count ?? 0)
			}
		})

		await updateProductsInWarehouse(docId as string, resultProducts)
		getProducts({})
	} catch (error) {
		console.log(error)
		toastErrorMessage(t('something-went-wrong'))
	}
}
