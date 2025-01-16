import { addDoc, collection, getDocs, getFirestore } from 'firebase/firestore'
import { app } from '../config'
import { referenceMainActions } from '@/store/reference-main'
import { store } from '@/store'

const db = getFirestore(app)

const language = localStorage.getItem('i18nextLng')

export const getReferenceMainPagination = async (controller: string) => {
	const response = await getDocs(collection(db, `reference-main-${controller}`))

	store.dispatch(
		referenceMainActions.setPagination({
			page: 1,
			sizePerPage: 10,
			totalSize: response.docs.length,
			pageCount: Math.ceil(response.docs.length / 10),
		}),
	)
}

export const getReferenceMainData = async (controller: string) => {
	store.dispatch(referenceMainActions.setDataLoading(true))
	const response = await getDocs(collection(db, `reference-main-${controller}`))

	const {
		ReferenceMain: { pagination },
	} = store.getState()

	const data = [...response.docs.map(doc => ({ id: doc.id, ...doc.data() }))]

	console.log(data.slice((pagination.page - 1) * pagination.sizePerPage, pagination.page * pagination.sizePerPage))

	setTimeout(() => {
		store.dispatch(
			referenceMainActions.setData(
				response.docs
					.map(doc => ({ id: doc.id, ...doc.data() }))
					// @ts-ignore
					.map(item => ({ ...item, name: item.translations.find(lang => lang.lang_short_name === language)?.name ?? '' })),
			),
		)
		store.dispatch(referenceMainActions.setDataLoading(false))
	}, 600)
}

export const createReferenceMainDoc = async (controller: string, payload: any) => {
	await addDoc(collection(db, `reference-main-${controller}`), payload)
}
