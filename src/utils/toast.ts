import { toast } from 'react-toastify'

export const toastSuccessMessage = (message: string) => {
	toast.success(message, {
		theme: 'colored',
	})
}

export const toastErrorMessage = (message: string) => {
	toast.error(message, {
		theme: 'colored',
	})
}
