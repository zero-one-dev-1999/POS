import { collection, getDocs, getFirestore } from 'firebase/firestore'
import { app } from '../config'
import { store } from '@/store'
import { listsActions } from '@/store/lists'

const db = getFirestore(app)

export interface ILanguage {
	lang_short_name: string
	name: string
}

interface IOption {
	value: string
	label: string
}
export const getCategoriesList = async () => {
	const language = localStorage.getItem('i18nextLng')
	const response = await getDocs(collection(db, 'reference-main-category'))

	store.dispatch(
		listsActions.setList({
			categoriesList: response.docs.map(doc => ({
				value: doc.id,
				label: doc.data().translations.find((f: ILanguage) => f.lang_short_name === language)?.name
					? doc.data().translations.find((f: ILanguage) => f.lang_short_name === language).name
					: doc.data().translations.find((f: ILanguage) => f.lang_short_name === 'uz')?.name || '',
			})),
		}),
	)
}

export const getCategoryName = (id: string) => {
	const {
		Lists: { lists },
	} = store.getState()

	if (!lists?.categoriesList) return ''

	return lists.categoriesList.find((f: IOption) => f.value === id)?.label
}

export const getUnitsList = async () => {
	const language = localStorage.getItem('i18nextLng')
	const response = await getDocs(collection(db, 'reference-main-unit'))

	store.dispatch(
		listsActions.setList({
			unitsList: response.docs.map(doc => ({
				value: doc.id,
				label: doc.data().translations.find((f: ILanguage) => f.lang_short_name === language)?.name
					? doc.data().translations.find((f: ILanguage) => f.lang_short_name === language).name
					: doc.data().translations.find((f: ILanguage) => f.lang_short_name === 'uz')?.name || '',
			})),
		}),
	)
}

export const getUnitName = (id: string) => {
	const {
		Lists: { lists },
	} = store.getState()

	if (!lists?.unitsList) return ''

	return lists.unitsList.find((f: IOption) => f.value === id)?.label
}

export const getCurrenciesList = async () => {
	const language = localStorage.getItem('i18nextLng')
	const response = await getDocs(collection(db, 'reference-main-currency'))

	store.dispatch(
		listsActions.setList({
			currenciesList: response.docs.map(doc => ({
				value: doc.id,
				label: doc.data().translations.find((f: ILanguage) => f.lang_short_name === language)?.name
					? doc.data().translations.find((f: ILanguage) => f.lang_short_name === language).name
					: doc.data().translations.find((f: ILanguage) => f.lang_short_name === 'uz')?.name || '',
			})),
		}),
	)
}

export const getCurrencyName = (id: string) => {
	const {
		Lists: { lists },
	} = store.getState()

	if (!lists?.currenciesList) return ''

	return lists.currenciesList.find((f: IOption) => f.value === id)?.label
}
