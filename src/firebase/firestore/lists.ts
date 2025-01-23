import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore'
import { app } from '../config'
import { store } from '@/store'
import { listsActions } from '@/store/lists'
import { IIncomeDocItem } from '@/store/warehouse/income/types'

const db = getFirestore(app)

export interface ILanguage {
	lang_short_name: string
	name: string
}

interface IOption {
	value: string
	label: string
}
export const getCategoriesList = async () => {
	const user_id = store.getState().App.user?.uid
	const language = localStorage.getItem('i18nextLng')
	const response = await getDocs(query(collection(db, 'reference-main-category'), where('user_id', '==', user_id)))

	store.dispatch(
		listsActions.setList({
			categoriesList: response.docs.map(doc => ({
				value: doc.id,
				label: doc.data().translations.find((f: ILanguage) => f.lang_short_name === language)?.name
					? doc.data().translations.find((f: ILanguage) => f.lang_short_name === language).name
					: doc.data().translations.find((f: ILanguage) => f.lang_short_name === 'uz')?.name || '',
			})),
		}),
	)
}

export const getCategoryName = (id: string) => {
	const {
		Lists: { lists },
	} = store.getState()

	if (!lists.categoriesList.length) return ''

	return lists.categoriesList.find((f: IOption) => f.value === id)?.label
}

export const getUnitsList = async () => {
	const user_id = store.getState().App.user?.uid
	const language = localStorage.getItem('i18nextLng')
	const response = await getDocs(query(collection(db, 'reference-main-unit'), where('user_id', '==', user_id)))

	store.dispatch(
		listsActions.setList({
			unitsList: response.docs.map(doc => ({
				value: doc.id,
				label: doc.data().translations.find((f: ILanguage) => f.lang_short_name === language)?.name
					? doc.data().translations.find((f: ILanguage) => f.lang_short_name === language).name
					: doc.data().translations.find((f: ILanguage) => f.lang_short_name === 'uz')?.name || '',
			})),
		}),
	)
}

export const getUnitName = (id: string) => {
	const {
		Lists: { lists },
	} = store.getState()

	if (!lists.unitsList.length) return ''

	return lists.unitsList.find((f: IOption) => f.value === id)?.label
}

export const getCurrenciesList = async () => {
	const user_id = store.getState().App.user?.uid
	const language = localStorage.getItem('i18nextLng')
	const response = await getDocs(query(collection(db, 'reference-main-currency'), where('user_id', '==', user_id)))

	store.dispatch(
		listsActions.setList({
			currenciesList: response.docs.map(doc => ({
				value: doc.id,
				label: doc.data().translations.find((f: ILanguage) => f.lang_short_name === language)?.name
					? doc.data().translations.find((f: ILanguage) => f.lang_short_name === language).name
					: doc.data().translations.find((f: ILanguage) => f.lang_short_name === 'uz')?.name || '',
			})),
		}),
	)
}

export const getCurrencyName = (id: string) => {
	const {
		Lists: { lists },
	} = store.getState()

	if (!lists.currenciesList.length) return ''

	return lists.currenciesList.find((f: IOption) => f.value === id)?.label
}

export const getProductsList = async () => {
	const user_id = store.getState().App.user?.uid
	const language = localStorage.getItem('i18nextLng')
	const response = await getDocs(query(collection(db, 'products'), where('user_id', '==', user_id)))

	store.dispatch(
		listsActions.setList({
			productsList: response.docs.map(doc => ({
				currency_id: doc.data().currency_id,
				category_id: doc.data().category_id,
				unit_id: doc.data().unit_id,
				value: doc.id,
				label: doc.data().translations.find((f: ILanguage) => f.lang_short_name === language)?.name
					? doc.data().translations.find((f: ILanguage) => f.lang_short_name === language).name
					: doc.data().translations.find((f: ILanguage) => f.lang_short_name === 'uz')?.name || '',
			})),
		}),
	)
}

export const getProductName = (id: string) => {
	const {
		Lists: { lists },
	} = store.getState()

	if (!lists.productsList.length) return ''

	return lists.productsList.find((f: IOption) => f.value === id)?.label
}

export const getProductsInWarehouseList = async () => {
	const user_id = store.getState().App.user?.uid
	const response = await getDocs(collection(db, 'warehouse'))

	const products = response.docs.map(doc => doc.data())?.length ? response.docs.map(doc => doc.data())[0].products.filter((f: any) => f.user_id === user_id) : []

	store.dispatch(
		listsActions.setList({
			productsInWarehouseList: products.map((item: IIncomeDocItem) => ({
				currency_id: item.currency_id,
				remain: item.quantity,
				value: item.product_id,
				label: getProductName(item.product_id),
			})),
		}),
	)
}
