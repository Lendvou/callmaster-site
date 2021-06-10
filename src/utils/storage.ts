const getUserToken = async () => {
	const token = await localStorage.getItem('feathers-jwt')
	return token
}

const removeUserToken = async () => {
	await localStorage.removeItem('feathers-jwt')
}

const setSecret = async (pin: string) => {
	await localStorage.setItem('@secret', pin)
}

const getSecret = async () => {
	const pin = await localStorage.getItem('@secret')
	return pin
}

type Credentials = {
	email: string
	password: string
}
const setUserCredentials = async (pin: Credentials) => {
	const str = JSON.stringify(pin)
	await localStorage.setItem('userCredentials', str)
}

const getUserCredentials = async () => {
	const pin = await localStorage.getItem('userCredentials')
	return pin ? JSON.parse(pin) : null
}

const removeSecret = async () => {
	try {
		await localStorage.removeItem('@secret')
	} catch (e) {
		//
	}
}

export {
	getUserToken,
	removeUserToken,
	setSecret,
	getSecret,
	removeSecret,
	setUserCredentials,
	getUserCredentials,
}
