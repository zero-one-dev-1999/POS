import { store } from '@/store'
import { app } from '../config'
import { getFirestore, getDocs, collection, addDoc, query, where } from 'firebase/firestore'
import { appActions } from '@/store/app'

const db = getFirestore(app)

interface IUser {
	username: string
	password: string
	id?: string
}

const usersRef = collection(db, 'users')

export const getUsers = async () => {
	const users = await getDocs(usersRef)

	return users.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}

export const registerUser = async (user: IUser) => {
	const q = query(usersRef, where('username', '==', user.username))

	const querySnapshot = await getDocs(q)

	if (querySnapshot.empty) {
		await addDoc(usersRef, user)
		alert('User successfully registered!')
	} else {
		alert('User already exists')
	}
}

export const loginUser = async (user: IUser) => {
	const q = query(usersRef, where('username', '==', user.username), where('password', '==', user.password))

	const querySnapshot = await getDocs(q)

	if (!querySnapshot.empty) {
		const userDoc = querySnapshot.docs[0]

		store.dispatch(appActions.setIsAuth(true))
		store.dispatch(appActions.setUser({ id: userDoc.id, ...userDoc.data() }))

		alert('Successfully!')
	} else {
		alert('Invalid username or password')
	}
}
