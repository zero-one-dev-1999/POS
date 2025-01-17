interface ILang {
	value: 'uz' | 'ru' | 'en'
	label: string
	icon: string
}

const languageList: ILang[] = [
	{
		value: 'uz',
		label: "O'zbek",
		icon: '/flags/uz.svg',
	},
	{
		value: 'ru',
		label: 'Русский',
		icon: '/flags/ru.svg',
	},
	{
		value: 'en',
		label: 'English',
		icon: '/flags/en.svg',
	},
]

export { languageList }
