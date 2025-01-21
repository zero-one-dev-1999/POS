import { store } from '@/store'
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore'
import { app } from '../config'
import { sellingActions } from '@/store/selling'
import { ILanguage } from './lists'
import { IProduct } from '@/store/selling/types'

const db = getFirestore(app)
export const getCategories = async () => {
	store.dispatch(sellingActions.setCategoriesLoading(true))

	const user_id = store.getState().App.user?.id
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

	setTimeout(() => {
		store.dispatch(sellingActions.setCategoriesLoading(false))
	}, 400)
}

export const getProducts = async () => {
	store.dispatch(sellingActions.setProductsLoading(true))

	const user_id = store.getState().App.user?.id
	const response = await getDocs(collection(db, 'warehouse'))

	store.dispatch(
		sellingActions.setProductsData(
			response.docs.map(doc => doc.data())?.length ? response.docs.map(doc => doc.data())[0].products.filter((f: IProduct) => f.user_id === user_id) : [],
		),
	)

	setTimeout(() => {
		store.dispatch(sellingActions.setProductsLoading(false))
	}, 400)
}
