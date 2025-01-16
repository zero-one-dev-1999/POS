import { addDoc, collection, getDocs, getFirestore, getDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { app } from '../config'
import { referenceMainActions } from '@/store/reference-main'
import { store } from '@/store'

const db = getFirestore(app)

export const getReferenceMainData = async (controller: string) => {
	store.dispatch(referenceMainActions.setDataLoading(true))
	const response = await getDocs(collection(db, `reference-main-${controller}`))
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
	}, 600)
}

export const createReferenceMainDoc = async (controller: string, payload: any) => {
	await addDoc(collection(db, `reference-main-${controller}`), payload)
}

export const updateStartReferenceMainDoc = async (controller: string, id: string) => {
	getDoc(doc(db, `reference-main-${controller}`, id))
		.then(docSnap => {
			if (docSnap.exists()) {
				store.dispatch(referenceMainActions.setFormValues({ id: docSnap.id, ...docSnap.data() }))
			} else {
				// console.log('No such document!')
			}
		})
		.catch(error => {
			console.error('Error getting document:', error)
		})
}

export const updateReferenceMainDoc = async (controller: string, payload: any) => {
	await updateDoc(doc(db, `reference-main-${controller}`, payload.id), { translations: payload.translations })
}

export const deleteReferenceMainDoc = async (controller: string, id: string) => {
	await deleteDoc(doc(db, `reference-main-${controller}`, id))
}
