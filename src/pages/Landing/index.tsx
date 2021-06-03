import React from 'react'

import ExchangeForm from 'components/ExchangeForm'
import CurrencyCard from 'components/CurrencyCard'

const Landing = () => {
	return (
		<div className="landing">
			<div className="landing__wrapper">
				<div className="landing__front">
					<div className="landing__front-text">
						<h1>Your simple access to crypto</h1>
						<p>
							Fast and secure way to exchange and purchase 150+
							cryptocurrencies. 24/7 live-chat support.
						</p>
					</div>
					<div className="landing__front-form">
						<ExchangeForm withActionButton />
					</div>
				</div>
				<div className="landing__cards">
					<CurrencyCard />
					<CurrencyCard />
					<CurrencyCard />
				</div>
			</div>
		</div>
	)
}

export default Landing
