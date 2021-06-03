import React, { useEffect, ReactNode } from 'react'
import { useDispatch } from 'react-redux'

import Header from 'components/Header'

import { setCurrencies } from 'store/actions/currenciesActions'

export const MainLayout = (props: { children: ReactNode }) => {
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(setCurrencies())
	}, [dispatch])

	return (
		<div className="main-layout">
			<Header />
			{props.children}
		</div>
	)
}

export default MainLayout
