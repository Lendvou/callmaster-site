import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser } from 'types'

export interface IUserState {
	token: string
	isAuth: boolean
	isNewUser: boolean
	user: Partial<IUser>
}

const initialState: IUserState = {
	token: '',
	isAuth: false,
	isNewUser: false,
	user: {},
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setAuthData: (state, { payload }: PayloadAction<IUserState>) => {
			return payload
		},
		resetAuthData: () => {
			return initialState
		},
	},
})

export const { setAuthData, resetAuthData } = userSlice.actions

export default userSlice.reducer
