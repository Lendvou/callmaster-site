export interface ICurrencyOption {
	label: string
	value: string
	description: string
	icon: any
	hasFixed: boolean
}

export type CurrentBlock = 'exchange' | 'checkout' | 'details'
