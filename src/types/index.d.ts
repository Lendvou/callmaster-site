export interface ICurrencyOption {
	label: string
	value: string
	description: string
	icon: any
	hasFixed: boolean
}

export type CurrentBlock = 'exchange' | 'checkout' | 'details'

export interface IUser {
	id: string
}

export interface UserCredentials {
	email: string
	password: string
}
