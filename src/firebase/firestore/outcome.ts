import { store } from '@/store'
import { warehouseOutcomeActions } from '@/store/warehouse/outcome'
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, query, updateDoc, where } from 'firebase/firestore'
import { app } from '../config'
import { getProductsInWarehouse, updateProductsInWarehouse } from './warehouse'
import { convertTimestampToDate } from '@/utils/date'
import { IOutcomeDocItem, IOutcomeFormValues } from '@/store/warehouse/outcome/types'
import { t } from 'i18next'
import { toastErrorMessage, toastSuccessMessage } from '@/utils/toast'

const db = getFirestore(app)

const outcomeRef = collection(db, 'warehouse-outcome')

export const getOutcomeDocs = async () => {
	try {
		const user_id = store.getState().App.user?.uid
		store.dispatch(warehouseOutcomeActions.setDataLoading(true))
		const response = await getDocs(query(outcomeRef, where('user_id', '==', user_id)))

		setTimeout(() => {
			store.dispatch(
				warehouseOutcomeActions.setData(
					response.docs.map(doc => ({
						id: doc.id,
						...doc.data(),
						date: convertTimestampToDate(doc.data().date),
					})),
				),
			)
			store.dispatch(warehouseOutcomeActions.setDataLoading(false))
		}, 300)
	} catch (error) {
		toastErrorMessage(t('something-went-wrong'))
	}
}

export const createOutcomeDoc = async (payload: IOutcomeFormValues, cb: (id: string) => void) => {
	try {
		const user_id = store.getState().App.user?.uid
		store.dispatch(warehouseOutcomeActions.setFormLoading(true))
		const response = await addDoc(outcomeRef, { ...payload, status: 1, user_id })

		setTimeout(() => {
			toastSuccessMessage(t('successfully-created'))
			store.dispatch(warehouseOutcomeActions.setFormLoading(false))
			cb(response.id)
		}, 300)
	} catch (error) {
		toastErrorMessage(t('something-went-wrong'))
	}
}

export const updateStartOutcomeDoc = async (id: string) => {
	try {
		store.dispatch(warehouseOutcomeActions.setFormLoading(true))
		store.dispatch(warehouseOutcomeActions.setFormIsUpdate(true))

		getDoc(doc(db, `warehouse-outcome`, id))
			.then(docSnap => {
				if (docSnap.exists()) {
					setTimeout(() => {
						store.dispatch(warehouseOutcomeActions.setFormValues({ id: docSnap.id, ...docSnap.data(), date: docSnap.data().date.toDate() }))
						store.dispatch(warehouseOutcomeActions.setFormLoading(false))
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

export const updateOutcomeDoc = async (payload: IOutcomeFormValues, cb: (id: string) => void) => {
	try {
		if (!payload.id) return

		store.dispatch(warehouseOutcomeActions.setFormLoading(true))

		// warehouse-outcome part start
		const payloadId = payload.id
		const data = { ...payload }
		delete data.id
		await updateDoc(doc(db, `warehouse-outcome`, payloadId), data)

		setTimeout(() => {
			toastSuccessMessage(t('successfully-updated'))
			store.dispatch(warehouseOutcomeActions.setFormLoading(false))
			cb(payloadId)
		}, 300)
		// warehouse-outcome part end
	} catch (error) {
		toastErrorMessage(t('something-went-wrong'))
	}
}

type ICallbackOrNull = () => void | undefined

export const deleteOutcomeDoc = async (payloadId: string, cb?: ICallbackOrNull) => {
	try {
		store.dispatch(warehouseOutcomeActions.setDataLoading(true))
		await deleteDoc(doc(db, `warehouse-outcome`, payloadId))
		toastSuccessMessage(t('successfully-deleted'))
		if (cb) {
			cb()
		} else {
			getOutcomeDocs()
		}
	} catch (error) {
		toastErrorMessage(t('something-went-wrong'))
	}
}

export const viewOutcomeDoc = async (id: string) => {
	try {
		store.dispatch(warehouseOutcomeActions.setDataLoading(true))
		const response = await getDoc(doc(db, `warehouse-outcome`, id))
		store.dispatch(warehouseOutcomeActions.setView({ id: response.id, ...response.data(), date: convertTimestampToDate(response.data()?.date) }))
		store.dispatch(warehouseOutcomeActions.setDataLoading(false))
	} catch (error) {
		toastErrorMessage(t('something-went-wrong'))
	}
}

export const saveAndFinishOutcomeDoc = async (id: string) => {
	try {
		store.dispatch(warehouseOutcomeActions.setDataLoading(true))

		const response = await getDoc(doc(db, `warehouse-outcome`, id))
		const data = response.data() ?? {}

		// warehouse-outcome part start

		setTimeout(() => {
			toastSuccessMessage(t('successfully-saved'))
			store.dispatch(warehouseOutcomeActions.setStatus(2))
			store.dispatch(warehouseOutcomeActions.setDataLoading(false))
		}, 300)

		await updateDoc(doc(db, `warehouse-outcome`, id), {
			...data,
			status: 2,
		})

		// warehouse-outcome part end

		// warehouse part start
		const user_id = store.getState().App.user?.uid
		const { id: docId, products } = await getProductsInWarehouse()

		const resultProducts = products?.length ? [...products] : []

		data.document_items.forEach((item: IOutcomeDocItem) => {
			if (resultProducts.find(product => product.product_id === item.product_id && product.user_id === user_id)) {
				const index = resultProducts.findIndex(product => product.product_id === item.product_id && product.user_id === user_id)
				resultProducts[index].quantity = resultProducts[index].quantity - (item?.quantity ?? 0)
			}
		})

		updateProductsInWarehouse(docId as string, resultProducts)

		// warehouse part end
	} catch (error) {
		toastErrorMessage(t('something-went-wrong'))
	}
}
