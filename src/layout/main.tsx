import React, { useEffect, ReactNode, useState } from 'react'
import { useTypedDispatch } from 'store'

import Header from 'components/Header'
import Chat from 'components/Chat'

import { handleAutoLogin } from 'store/user/thunkActions'

export const MainLayout = (props: { children: ReactNode }) => {
	const dispatch = useTypedDispatch()

	const [isLoading, setIsLoading] = useState<boolean>(true)

	useEffect(() => {
		const init = async () => {
			// @ts-ignore
			await dispatch(handleAutoLogin())
			setIsLoading(false)
		}
		init()
	}, [dispatch])

	return isLoading ? (
		<div>Loading...</div>
	) : (
		<div className="main-layout">
			<Header />
			{props.children}

			<Chat />
		</div>
	)
}

export default MainLayout
