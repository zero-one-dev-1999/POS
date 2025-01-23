import { addDoc, collection, getDocs, getFirestore, getDoc, doc, updateDoc, deleteDoc, query, where } from 'firebase/firestore'
import { app } from '../config'
import { referenceMainActions } from '@/store/reference-main'
import { store } from '@/store'
import { toastErrorMessage, toastSuccessMessage } from '@/utils/toast'
import { t } from 'i18next'

const db = getFirestore(app)

export const getReferenceMainData = async (controller: string) => {
	try {
		const user_id = store.getState().App.user?.uid

		store.dispatch(referenceMainActions.setDataLoading(true))
		const response = await getDocs(query(collection(db, `reference-main-${controller}`), where('user_id', '==', user_id)))
		const language = localStorage.getItem('i18nextLng')

		setTimeout(() => {
			store.dispatch(
				referenceMainActions.setData(
					response.docs
						.map(doc => ({ id: doc.id, ...doc.data() }))
						// @ts-ignore
						.map((item: { id: string; translations: { lang_short_name: string; name: string }[] }) => ({
							...item,
							name: item.translations.find(lang => lang.lang_short_name === language)?.name
								? item.translations.find(lang => lang.lang_short_name === language)?.name
								: item.translations.find(lang => lang.lang_short_name === 'uz')?.name || '',
						})),
				),
			)
			store.dispatch(referenceMainActions.setDataLoading(false))
		}, 300)
	} catch (error) {
		toastErrorMessage(t('something-went-wrong'))
	}
}

export const createReferenceMainDoc = async (controller: string, payload: any) => {
	try {
		const user_id = store.getState().App.user?.uid
		await addDoc(collection(db, `reference-main-${controller}`), { ...payload, user_id, status: 1 })
		toastSuccessMessage(t('successfully-created'))
	} catch (error) {
		toastErrorMessage(t('something-went-wrong'))
	}
}

export const updateStartReferenceMainDoc = async (controller: string, id: string) => {
	try {
		getDoc(doc(db, `reference-main-${controller}`, id))
			.then(docSnap => {
				if (docSnap.exists()) {
					store.dispatch(referenceMainActions.setFormValues({ id: docSnap.id, ...docSnap.data() }))
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

export const updateReferenceMainDoc = async (controller: string, payload: any) => {
	try {
		await updateDoc(doc(db, `reference-main-${controller}`, payload.id), { translations: payload.translations })

		toastSuccessMessage(t('successfully-updated'))
	} catch (error) {
		toastErrorMessage(t('something-went-wrong'))
	}
}

export const deleteReferenceMainDoc = async (controller: string, id: string) => {
	try {
		await deleteDoc(doc(db, `reference-main-${controller}`, id))
		toastSuccessMessage(t('successfully-deleted'))
	} catch (error) {
		toastErrorMessage(t('something-went-wrong'))
	}
}
