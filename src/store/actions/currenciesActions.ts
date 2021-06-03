import { Dispatch } from 'redux'

import { SET_CURRENCIES } from 'store/types'
import { ICurrencyOption } from 'types'

export const setCurrencies = () => async (dispatch: Dispatch) => {
	// doing some network request...
	dispatch({
		type: SET_CURRENCIES,
		payload: currenciesOptions,
	})
}

const currenciesOptions: ICurrencyOption[] = [
	{
		label: 'BTC',
		value: 'btc',
		description: 'Bitcoin',
		icon: 'btc',
		hasFixed: true,
	},
	{
		label: 'ETH',
		value: 'eth',
		description: 'Ethereum',
		icon: 'eth',
		hasFixed: true,
	},
	{
		label: 'XRP',
		value: 'xrp',
		description: 'XRP',
		icon: 'ark',
		hasFixed: false,
	},
	{
		label: 'Abyss',
		value: 'abyss',
		description: 'The Abyss',
		icon: 'ardr',
		hasFixed: true,
	},
]
