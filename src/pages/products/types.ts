interface IProduct {
	id?: string
	category_id: string
	translations: { lang_short_name: string; name: string }[]
	unit_id: string
	currency_id: string
}

interface IData {
	id: string
	name: string
	unit_id: string
	currency_id: string
	category_id: string
}

export type { IProduct, IData }
