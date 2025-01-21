interface IOutcomeDocItem {
	product_id: string
	quantity: number | undefined
	currency_id: string
	buying_price?: number | undefined
	selling_price?: number | undefined
}

interface IOutcomeFormValues {
	id?: string
	date: Date | null | string
	document_number: string
	document_items: IOutcomeDocItem[]
	status?: 1 | 2
}

interface IData {
	id: string
	date: string
	document_number: string
	document_items: IOutcomeDocItem[]
}

export type { IOutcomeFormValues, IData, IOutcomeDocItem }
