interface IDocItem {
	product_id: string
	quantity: number | undefined
	buying_price: number | undefined
	selling_price: number | undefined
	currency_id: string
}

interface IFormValues {
	id?: string
	date: Date | null | undefined
	document_number: string
	document_items: IDocItem[]
}

interface IData {
	id: string
	name: string
	unit_id: string
	currency_id: string
	category_id: string
}

export type { IFormValues, IData }
