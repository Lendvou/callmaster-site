import apiClient from 'utils/apiClient'
import { getUserCredentials, setUserCredentials } from 'utils/storage'

import { setAuthData, resetAuthData } from 'store/user'

import { PromiseThunk } from 'store/types'

export const handleAutoLogin = (): PromiseThunk<void> => async (dispatch) => {
	const credentials = await getUserCredentials()

	console.log('handle auto', credentials)

	if (!credentials) {
		try {
			await registerUser()
			await dispatch(logIn(true))
		} catch (e) {
			console.error('Error while creating or logging user', e)
		}
		return
	}

	try {
		await dispatch(checkIsUserAuth())
	} catch (e) {
		if (e.code === 401) {
			// token expired
			await dispatch(logIn(false))
		}
	}
}

const registerUser = async () => {
	const data = {
		email:
			new Date().getTime() + Math.round(Math.random() * 100000) + '@mail.ru',
		password: 'client-secret-pass-92',
		role: 'client',
	}
	const user = await apiClient.service('users').create(data)
	await setUserCredentials({
		email: user.email,
		password: 'client-secret-pass-92',
	})
	console.log('register user result', user)
}

export const checkIsUserAuth = (): PromiseThunk => async (dispatch) => {
	const { accessToken, user: currentUser } = await apiClient.reAuthenticate()
	dispatch(
		setAuthData({
			isAuth: true,
			isNewUser: false,
			token: accessToken,
			user: currentUser,
		})
	)
}

export const logIn =
	(isNewUser: boolean): PromiseThunk =>
	async (dispatch) => {
		const userCredentials = await getUserCredentials()

		const { accessToken, user: currentUser } = await apiClient.authenticate({
			email: userCredentials.email,
			password: userCredentials.password,
			strategy: 'local',
		})
		console.log('login user result', accessToken, currentUser)

		dispatch(
			setAuthData({
				isAuth: true,
				isNewUser,
				token: accessToken,
				user: currentUser,
			})
		)
	}

export const logOut = (): PromiseThunk<any> => async (dispatch) => {
	await apiClient.logout()
	dispatch(resetAuthData())
}
