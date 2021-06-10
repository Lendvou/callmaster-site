import React from 'react'
import { Link, useRouteMatch } from 'react-router-dom'

const Header = () => {
	const match = useRouteMatch()

	let currentPage = 'landing'
	if (match.path === '/processing') {
		currentPage = 'processing'
	}
	return (
		<div
			className={`header ${
				currentPage === 'processing' ? 'header__processing' : 'header__landing'
			}`}
		>
			<div className="header__wrapper">
				<Link to="/">
					<div className="mainlogo" />
					{/* <span className="mainlogo" /> */}
				</Link>
			</div>
		</div>
	)
}

export default Header
