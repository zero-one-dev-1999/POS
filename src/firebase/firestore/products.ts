import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, query, updateDoc, where } from 'firebase/firestore'
import { app } from '../config'
import { store } from '@/store'
import { productsActions } from '@/store/products'
import { getCategoryName, getUnitName, ILanguage } from './lists'
import { IProduct } from '@/pages/products/types'
import { t } from 'i18next'
import { toastErrorMessage, toastSuccessMessage } from '@/utils/toast'

const db = getFirestore(app)

const productsRef = collection(db, 'products')

export const getProductsData = async () => {
	try {
		const user_id = store.getState().App.user?.uid
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
						currency_name: doc.data().currency_id,
					})),
				),
			)
			store.dispatch(productsActions.setDataLoading(false))
		}, 300)
	} catch (error) {
		toastErrorMessage(t('something-went-wrong'))
	}
}

export const createProductDoc = async (payload: IProduct) => {
	try {
		const user_id = store.getState().App.user?.uid
		store.dispatch(productsActions.setFormLoading(true))
		await addDoc(productsRef, { ...payload, user_id, status: 1 })

		store.dispatch(productsActions.setFormLoading(false))
		store.dispatch(productsActions.setFormIsOpen(false))

		toastSuccessMessage(t('successfully-created'))

		getProductsData()
	} catch (error) {
		toastErrorMessage(t('something-went-wrong'))
	}
}

export const updateStartProductDoc = async (id: string) => {
	try {
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
					toastErrorMessage(t('something-went-wrong'))
				}
			})
			.catch(error => {
				console.error('Error getting document:', error)
			})
	} catch (error) {
		toastErrorMessage(t('something-went-wrong'))
	}
}

export const updateProductDoc = async (payload: IProduct) => {
	try {
		if (!payload.id) return

		store.dispatch(productsActions.setFormLoading(true))
		const id = payload.id
		const data = { ...payload }
		delete data.id
		await updateDoc(doc(db, `products`, id), data)

		setTimeout(() => {
			toastSuccessMessage(t('successfully-updated'))
			store.dispatch(productsActions.setFormLoading(false))
			store.dispatch(productsActions.setFormIsOpen(false))
			getProductsData()
		}, 300)
	} catch (error) {
		toastErrorMessage(t('something-went-wrong'))
	}
}

export const deleteProductDoc = async (id: string) => {
	try {
		await deleteDoc(doc(db, `products`, id))
		toastSuccessMessage(t('successfully-deleted'))
		getProductsData()
	} catch (error) {
		toastErrorMessage(t('something-went-wrong'))
	}
}
