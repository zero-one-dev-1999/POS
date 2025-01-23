import { IFormValues } from '@/store/warehouse/income/types'
import { store } from '@/store'
import { warehouseIncomeActions } from '@/store/warehouse/income'
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, query, updateDoc, where } from 'firebase/firestore'
import { app } from '../config'
import { addProductsInWarehouse, getProductsInWarehouse, updateProductsInWarehouse } from './warehouse'
import { convertTimestampToDate } from '@/utils/date'
import { toastErrorMessage, toastSuccessMessage } from '@/utils/toast'
import { t } from 'i18next'

const db = getFirestore(app)

const incomeRef = collection(db, 'warehouse-income')

export const getIncomeDocs = async () => {
	try {
		const user_id = store.getState().App.user?.uid
		store.dispatch(warehouseIncomeActions.setDataLoading(true))
		const response = await getDocs(query(incomeRef, where('user_id', '==', user_id)))

		setTimeout(() => {
			store.dispatch(
				warehouseIncomeActions.setData(
					response.docs.map(doc => ({
						id: doc.id,
						...doc.data(),
						date: convertTimestampToDate(doc.data().date),
					})),
				),
			)
			store.dispatch(warehouseIncomeActions.setDataLoading(false))
		}, 300)
	} catch (error) {
		toastErrorMessage(t('something-went-wrong'))
	}
}

export const createIncomeDoc = async (payload: IFormValues, cb: (id: string) => void) => {
	try {
		const user_id = store.getState().App.user?.uid
		store.dispatch(warehouseIncomeActions.setFormLoading(true))
		const response = await addDoc(incomeRef, { ...payload, status: 1, user_id })

		setTimeout(() => {
			toastSuccessMessage(t('successfully-created'))
			store.dispatch(warehouseIncomeActions.setFormLoading(false))
			cb(response.id)
		}, 300)
	} catch (error) {
		toastErrorMessage(t('something-went-wrong'))
	}
}

export const updateStartIncomeDoc = async (id: string) => {
	try {
		store.dispatch(warehouseIncomeActions.setFormLoading(true))
		store.dispatch(warehouseIncomeActions.setFormIsUpdate(true))

		getDoc(doc(db, `warehouse-income`, id))
			.then(docSnap => {
				if (docSnap.exists()) {
					setTimeout(() => {
						store.dispatch(warehouseIncomeActions.setFormValues({ id: docSnap.id, ...docSnap.data(), date: docSnap.data().date.toDate() }))
						store.dispatch(warehouseIncomeActions.setFormLoading(false))
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

export const updateIncomeDoc = async (payload: IFormValues, cb: (id: string) => void) => {
	try {
		if (!payload.id) return

		store.dispatch(warehouseIncomeActions.setFormLoading(true))

		// warehouse-income part start
		const payloadId = payload.id
		const data = { ...payload }
		delete data.id
		await updateDoc(doc(db, `warehouse-income`, payloadId), data)

		setTimeout(() => {
			toastSuccessMessage(t('successfully-updated'))
			store.dispatch(warehouseIncomeActions.setFormLoading(false))
			cb(payloadId)
		}, 300)
		// warehouse-income part end
	} catch (error) {
		toastErrorMessage(t('something-went-wrong'))
	}
}

type ICallbackOrNull = () => void | undefined

export const deleteIncomeDoc = async (payloadId: string, cb?: ICallbackOrNull) => {
	try {
		store.dispatch(warehouseIncomeActions.setDataLoading(true))
		await deleteDoc(doc(db, `warehouse-income`, payloadId))
		toastSuccessMessage(t('successfully-deleted'))
		if (cb) {
			cb()
		} else {
			getIncomeDocs()
		}
	} catch (error) {
		toastErrorMessage(t('something-went-wrong'))
	}
}

export const viewIncomeDoc = async (id: string) => {
	try {
		store.dispatch(warehouseIncomeActions.setDataLoading(true))
		const response = await getDoc(doc(db, `warehouse-income`, id))
		store.dispatch(warehouseIncomeActions.setView({ id: response.id, ...response.data(), date: convertTimestampToDate(response.data()?.date) }))
		store.dispatch(warehouseIncomeActions.setDataLoading(false))
	} catch (error) {
		toastErrorMessage(t('something-went-wrong'))
	}
}

export const saveAndFinishIncomeDoc = async (id: string) => {
	try {
		store.dispatch(warehouseIncomeActions.setDataLoading(true))

		const response = await getDoc(doc(db, `warehouse-income`, id))
		const data = response.data() ?? {}

		// warehouse-income part start

		setTimeout(() => {
			toastSuccessMessage(t('successfully-saved'))
			store.dispatch(warehouseIncomeActions.setStatus(2))
			store.dispatch(warehouseIncomeActions.setDataLoading(false))
		}, 300)

		await updateDoc(doc(db, `warehouse-income`, id), {
			...data,
			status: 2,
		})

		// warehouse-income part end

		// warehouse part start
		const user_id = store.getState().App.user?.uid
		const { id: docId, products } = await getProductsInWarehouse()

		const resultProducts = products?.length ? [...products] : []

		data.document_items.forEach(item => {
			if (resultProducts.find(product => product.product_id === item.product_id && product.user_id === user_id)) {
				const index = resultProducts.findIndex(product => product.product_id === item.product_id && product.user_id === user_id)
				resultProducts[index].quantity = resultProducts[index].quantity + (item?.quantity ?? 0)
				resultProducts[index].buying_price = item?.buying_price ?? resultProducts[index].buying_price
				resultProducts[index].selling_price = item?.selling_price ?? resultProducts[index].selling_price
			} else {
				resultProducts.push({ ...item, user_id })
			}
		})

		if (!docId) {
			addProductsInWarehouse(resultProducts)
		} else {
			updateProductsInWarehouse(docId, resultProducts)
		}
		// warehouse part end
	} catch (error) {
		toastErrorMessage(t('something-went-wrong'))
	}
}
