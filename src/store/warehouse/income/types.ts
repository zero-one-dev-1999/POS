interface IDocItem {
	product_id: string
	quantity: number | undefined
	buying_price: number | undefined
	selling_price: number | undefined
	currency_id: string
}

interface IFormValues {
	id?: string
	date: Date | null | string
	document_number: string
	document_items: IDocItem[]
}

interface IData {
	id: string
	date: string
	document_number: string
	document_items: IDocItem[]
}

export type { IFormValues, IData }
