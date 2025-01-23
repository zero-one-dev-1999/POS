import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../config'
import { appActions } from '@/store/app'
import { store } from '@/store'
import { toastErrorMessage, toastSuccessMessage } from '@/utils/toast'
import { t } from 'i18next'

export const registerUser = async (user: { email: string; password: string }) => {
	try {
		const response = await createUserWithEmailAndPassword(auth, user.email, user.password)
		console.log(response)
		if (response.user) {
			store.dispatch(appActions.setIsAuth(true))
			store.dispatch(appActions.setUser(response.user))
			toastSuccessMessage(t('successfully-registered'))
		}
	} catch (error) {
		toastErrorMessage(t('invalid-password-or-email'))
	}
}

export const loginUser = async (user: { email: string; password: string }) => {
	try {
		const response = await signInWithEmailAndPassword(auth, user.email, user.password)

		if (response.user) {
			store.dispatch(appActions.setIsAuth(true))
			store.dispatch(appActions.setUser(response.user))
			toastSuccessMessage(t('successfully-logged-in'))
		}
	} catch (error) {
		toastErrorMessage(t('invalid-password-or-email'))
	}
}

export const loginWithGoogle = async () => {
	try {
		const response = await signInWithPopup(auth, provider)
		if (response.user) {
			store.dispatch(appActions.setIsAuth(true))
			store.dispatch(appActions.setUser(response.user))
			toastSuccessMessage(t('successfully-logged-in'))
		}
	} catch (error) {
		toastErrorMessage(t('something-went-wrong'))
	}
}

export const logoutUser = async () => {
	await auth.signOut()
	store.dispatch(appActions.reset())
}
