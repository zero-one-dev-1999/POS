import { app } from '../config'
import { getFirestore, getDocs, collection, addDoc } from 'firebase/firestore'

const db = getFirestore(app)

interface IUser {
	name: string
	password: string
	id?: string
}

const usersRef = collection(db, 'users')

export const getUsers = async () => {
	const users = await getDocs(usersRef)

	return users.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}

export const addUser = async (user: IUser) => {
	await addDoc(usersRef, user)
}
