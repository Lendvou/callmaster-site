import { SET_CURRENCIES } from 'store/types'

const currencies = (state: any = {}, action: any) => {
	switch (action.type) {
		case SET_CURRENCIES:
			return action.payload
		default:
			return state
	}
}

export default currencies
