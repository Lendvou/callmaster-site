import React from 'react'

const CurrencyCard = () => {
	return (
		<div className="currencycard">
			<div className="currencycard__header">
				<h2>Bitcoin</h2>
				<span>$9552.01</span>
			</div>
			<div className="currencycard__body">
				<div className="currencycard__datanums">
					<span className="currencycard__datanums-percent">-0.04%</span>
					<span className="currencycard__datanums-time">24 hours change</span>
				</div>
				<div className="currencycard__datavisual">
					<span />
				</div>
			</div>
			<div className="currencycard__actions">
				<button>Buy now</button>
			</div>
		</div>
	)
}

export default CurrencyCard
