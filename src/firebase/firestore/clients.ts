import { addDoc, collection, getDocs, getFirestore, query, where } from 'firebase/firestore'
import { app } from '../config'
import { store } from '@/store'
import { listsActions } from '@/store/lists'

const db = getFirestore(app)

export const getClientsList = async () => {
	const user_id = store.getState().App.user?.uid
	const response = await getDocs(query(collection(db, 'clients'), where('user_id', '==', user_id)))

	store.dispatch(
		listsActions.setList({
			clientsList: response.docs.map(doc => ({
				value: doc.id,
				label: doc.data().first_name + ' ' + doc.data().last_name,
			})),
		}),
	)
}

interface IClient {
	first_name: string
	last_name: string
	phone_number: string
}
export const createClient = async (data: IClient, setLoading: (value: boolean) => void, cb: (id: string) => void) => {
	const clientsList = store.getState().Lists.lists.clientsList
	setLoading(true)
	const response = await addDoc(collection(db, 'clients'), { ...data, user_id: store.getState().App.user?.uid })

	store.dispatch(
		listsActions.setList({
			clientsList: [{ value: response.id, label: data.first_name + ' ' + data.last_name }, ...clientsList],
		}),
	)

	setTimeout(() => {
		cb(response.id)
		setLoading(false)
	}, 400)
}
