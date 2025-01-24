interface IMode {
	sub_color: string
	main_color: string
	order_card_bg: string
	product_card_bg: string
	order_card_bg_active: string
	product_card_bg_active: string
}

const darkMode: IMode = {
	sub_color: '#C4CDD5',
	main_color: '#FFFFFF',
	order_card_bg: '#161c24d0',
	product_card_bg: '#161c24d0',
	order_card_bg_active: '#0E1010',
	product_card_bg_active: '#0E1010',
}

const lightMode: IMode = {
	main_color: '#fff',
	sub_color: '#eceff1',
	order_card_bg: '#7D2EBC',
	product_card_bg: '#4862EA',
	order_card_bg_active: '#5C1A97',
	product_card_bg_active: '#4439C5',
}

const colors: string[] = ['#d32f2f', '#455a64', '#fbc02d', '#303f9f', '#c2185b', '#1976d2', '#7b1fa2', '#f57c00', '#5d4037', '#388e3c', '#2962ff', '#afb42b']

export { colors, darkMode, lightMode }
