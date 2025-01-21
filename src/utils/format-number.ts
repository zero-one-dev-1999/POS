import numeral from 'numeral'

export const fNumber = (number: number | undefined) =>
	numeral(number ?? '')
		?.format('0,0.00')
		?.replace(/\.00$/, '')
		?.replace(/,/g, ' ')
