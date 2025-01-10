interface ILang {
	value: 'uz' | 'ru' | 'en'
	label: string
	icon: string
}

const allLangs: ILang[] = [
	{
		value: 'uz',
		label: "O'zbekcha",
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

export { allLangs }
