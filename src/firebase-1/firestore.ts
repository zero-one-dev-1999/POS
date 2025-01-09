/* eslint-disable @typescript-eslint/no-explicit-any */
import { getFirestore, collection, addDoc, getDocs } from '@/firebase-1/firestore'
import app from './firebase'

const db = getFirestore(app)

export const getProducts = async () => {
	const querySnapshot = await getDocs(collection(db, 'products'))
	return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}

export const addProduct = async (product: any) => {
	try {
		const docRef = await addDoc(collection(db, 'products'), product)
		console.log('Document written with ID: ', docRef.id)
	} catch (e) {
		console.error('Error adding document: ', e)
	}
}
