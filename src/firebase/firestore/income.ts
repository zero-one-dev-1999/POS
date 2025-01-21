import { IFormValues } from '@/store/warehouse/income/types'
import { store } from '@/store'
import { warehouseIncomeActions } from '@/store/warehouse/income'
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, updateDoc } from 'firebase/firestore'
import { app } from '../config'
import { addProductsInWarehouse, getProductsInWarehouse, updateProductsInWarehouse } from './warehouse'
import { convertTimestampToDate } from '@/utils/date'

const db = getFirestore(app)

const incomeRef = collection(db, 'warehouse-income')

export const getIncomeDocs = async () => {
	store.dispatch(warehouseIncomeActions.setDataLoading(true))
	const response = await getDocs(incomeRef)

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
	}, 500)
}

export const createIncomeDoc = async (payload: IFormValues) => {
	store.dispatch(warehouseIncomeActions.setFormLoading(true))
	await addDoc(incomeRef, payload)

	const { id, products } = await getProductsInWarehouse()

	const resultProducts = [...products]

	payload.document_items.forEach(item => {
		if (resultProducts.find(product => product.product_id === item.product_id)) {
			const index = resultProducts.findIndex(product => product.product_id === item.product_id)
			resultProducts[index].quantity = resultProducts[index].quantity + (item?.quantity ?? 0)
			resultProducts[index].buying_price = item?.buying_price ?? resultProducts[index].buying_price
			resultProducts[index].selling_price = item?.selling_price ?? resultProducts[index].selling_price
		} else {
			// @ts-ignore
			resultProducts.push(item)
		}
	})

	if (!id) {
		addProductsInWarehouse(resultProducts)
	} else {
		updateProductsInWarehouse(id, resultProducts)
	}

	setTimeout(() => {
		store.dispatch(warehouseIncomeActions.setFormLoading(false))
		// getProductsData()
	}, 500)
}

export const updateStartIncomeDoc = async (id: string) => {
	store.dispatch(warehouseIncomeActions.setFormLoading(true))
	store.dispatch(warehouseIncomeActions.setFormIsUpdate(true))

	getDoc(doc(db, `warehouse-income`, id))
		.then(docSnap => {
			if (docSnap.exists()) {
				setTimeout(() => {
					store.dispatch(warehouseIncomeActions.setFormValues({ id: docSnap.id, ...docSnap.data(), date: docSnap.data().date.toDate() }))
					store.dispatch(warehouseIncomeActions.setFormLoading(false))
				}, 500)
			} else {
				// console.log('No such document!')
			}
		})
		.catch(error => {
			console.error('Error getting document:', error)
		})
}

const updatedProductItems = async (id: string) => {
	const response = await getDoc(doc(db, `warehouse-income`, id))
	return response.data()?.document_items ?? []
	// return response.exists()
}

export const updateIncomeDoc = async (payload: IFormValues) => {
	if (!payload.id) return

	store.dispatch(warehouseIncomeActions.setFormLoading(true))

	// warehouse-income part start
	const payloadId = payload.id
	const data = { ...payload }
	delete data.id
	await updateDoc(doc(db, `warehouse-income`, payloadId), data)

	setTimeout(() => {
		store.dispatch(warehouseIncomeActions.setFormLoading(false))
	}, 500)
	// warehouse-income part end

	// warehouse part start
	const { id, products } = await getProductsInWarehouse()

	const resultProducts = [...products]

	const oldProducts = await updatedProductItems(payload.id)

	if (oldProducts.length) {
		oldProducts.forEach(item => {
			const index = resultProducts.findIndex(product => product.product_id === item.product_id)
			resultProducts[index].quantity = resultProducts[index].quantity - (item?.quantity ?? 0)
		})
	}
	const newProducts = payload.document_items
	newProducts.forEach(item => {
		if (resultProducts.find(product => product.product_id === item.product_id)) {
			const index = resultProducts.findIndex(product => product.product_id === item.product_id)
			resultProducts[index].quantity = resultProducts[index].quantity + (item?.quantity ?? 0)
			resultProducts[index].buying_price = item?.buying_price ?? resultProducts[index].buying_price
			resultProducts[index].selling_price = item?.selling_price ?? resultProducts[index].selling_price
		} else {
			// @ts-ignore
			resultProducts.push(item)
		}
	})

	updateProductsInWarehouse(id as string, resultProducts)

	// warehouse part end
}

export const deleteIncomeDoc = async (payloadId: string) => {
	store.dispatch(warehouseIncomeActions.setDataLoading(true))

	const { id, products } = await getProductsInWarehouse()

	const resultProducts = [...products]

	const oldProducts = await updatedProductItems(payloadId)

	if (oldProducts.length) {
		oldProducts.forEach(item => {
			const index = resultProducts.findIndex(product => product.product_id === item.product_id)
			resultProducts[index].quantity = resultProducts[index].quantity - (item?.quantity ?? 0)
		})
	}

	updateProductsInWarehouse(id as string, resultProducts)

	await deleteDoc(doc(db, `warehouse-income`, payloadId))
	getIncomeDocs()
}

export const viewIncomeDoc = async (id: string) => {
	store.dispatch(warehouseIncomeActions.setDataLoading(true))
	const response = await getDoc(doc(db, `warehouse-income`, id))

	setTimeout(() => {
		store.dispatch(warehouseIncomeActions.setView({ id: response.id, ...response.data(), date: convertTimestampToDate(response.data()?.date) }))
		store.dispatch(warehouseIncomeActions.setDataLoading(false))
	}, 500)
}
