import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, query, updateDoc, where } from 'firebase/firestore'
import { app } from '../config'
import { store } from '@/store'
import { productsActions } from '@/store/products'
import { getCategoryName, getCurrencyName, getUnitName, ILanguage } from './lists'
import { IProduct } from '@/pages/products/types'

const db = getFirestore(app)

const productsRef = collection(db, 'products')

export const getProductsData = async () => {
	const user_id = store.getState().App.user?.id
	const language = localStorage.getItem('i18nextLng')
	store.dispatch(productsActions.setDataLoading(true))

	const response = await getDocs(query(productsRef, where('user_id', '==', user_id)))

	setTimeout(() => {
		store.dispatch(
			productsActions.setData(
				response.docs.map(doc => ({
					id: doc.id,
					...doc.data(),
					name: doc.data().translations.find((lang: ILanguage) => lang.lang_short_name === language)?.name
						? doc.data().translations.find((lang: ILanguage) => lang.lang_short_name === language)?.name
						: doc.data().translations.find((lang: ILanguage) => lang.lang_short_name === 'uz')?.name || '',
					category_name: getCategoryName(doc.data().category_id),
					unit_name: getUnitName(doc.data().unit_id),
					currency_name: getCurrencyName(doc.data().currency_id),
				})),
			),
		)
		store.dispatch(productsActions.setDataLoading(false))
	}, 300)
}

export const createProductDoc = async (payload: IProduct) => {
	const user_id = store.getState().App.user?.id
	store.dispatch(productsActions.setFormLoading(true))
	await addDoc(productsRef, { ...payload, user_id, status: 1 })

	store.dispatch(productsActions.setFormLoading(false))
	store.dispatch(productsActions.setFormIsOpen(false))
	getProductsData()
}

export const updateStartProductDoc = async (id: string) => {
	store.dispatch(productsActions.setFormLoading(true))
	store.dispatch(productsActions.setFormIsOpen(true))
	store.dispatch(productsActions.setFormIsUpdate(true))

	getDoc(doc(db, `products`, id))
		.then(docSnap => {
			if (docSnap.exists()) {
				setTimeout(() => {
					store.dispatch(productsActions.setFormValues({ id: docSnap.id, ...docSnap.data() }))
					store.dispatch(productsActions.setFormLoading(false))
				}, 300)
			} else {
				// console.log('No such document!')
			}
		})
		.catch(error => {
			console.error('Error getting document:', error)
		})
}

export const updateProductDoc = async (payload: IProduct) => {
	if (!payload.id) return

	store.dispatch(productsActions.setFormLoading(true))
	const id = payload.id
	const data = { ...payload }
	delete data.id
	await updateDoc(doc(db, `products`, id), data)

	setTimeout(() => {
		store.dispatch(productsActions.setFormLoading(false))
		store.dispatch(productsActions.setFormIsOpen(false))
		getProductsData()
	}, 300)
}

export const deleteProductDoc = async (id: string) => {
	await deleteDoc(doc(db, `products`, id))
	getProductsData()
}
