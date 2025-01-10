import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import uzTranslations from '@/locales/uz/translations.json'
import enTranslations from '@/locales/en/translations.json'
import ruTranslations from '@/locales/ru/translations.json'

i18n.use(initReactI18next).init({
	lng: localStorage.getItem('i18nextLng') || 'uz',
	fallbackLng: 'uz',
	resources: {
		uz: {
			translation: uzTranslations,
		},
		en: {
			translation: enTranslations,
		},
		ru: {
			translation: ruTranslations,
		},
	},
	interpolation: {
		escapeValue: false,
	},
	react: {
		nsMode: 'fallback',
		useSuspense: false,
	},
})

export default i18n
