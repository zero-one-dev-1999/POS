import { addDoc, collection, doc, getDocs, getFirestore, updateDoc } from 'firebase/firestore'
import { app } from '../config'
import { IFormValues } from '@/pages/warehouse/income/types'

const db = getFirestore(app)

const productsInWarehouseRef = collection(db, 'warehouse')

export const getProductsInWarehouse = async () => {
	const productsResponse = await getDocs(productsInWarehouseRef)
	const products = productsResponse.docs.map(doc => ({ id: doc.id, products: doc.data().products }))

	if (products.length) {
		return {
			id: products[0].id,
			products: products[0].products,
		}
	}

	return {
		id: null,
		products: [],
	}
}

export const addProductsInWarehouse = async (payload: IFormValues['document_items']) => {
	addDoc(productsInWarehouseRef, { products: payload })
}

export const updateProductsInWarehouse = async (id: string, payload) => {
	await updateDoc(doc(db, `warehouse`, id), { products: payload })
}
