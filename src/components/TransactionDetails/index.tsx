import React from 'react'
import QrCode from 'qrcode.react'

const TransactionDetails = () => {
	return (
		<div className="details">
			<div className="details__transactionId">
				<span className="details__label">Transaction ID:</span>
				<span className="details__value text-black font-14">
					ncv5jegxvajwxvhg
				</span>
				<span className="details__clip-icon" />
			</div>
			<div className="details__description">
				Please send the exact amount from your wallet or exchange account to the
				following address
			</div>
			<div className="details__wrapper">
				<div className="details__row">
					<span className="details__label">Send</span>
					<span className="details__value">0.1 BTC</span>
				</div>
				<div className="details__row">
					<span className="details__label">To address</span>
					<span className="details__value">
						3E3vQfDfgUAyZcmEYctvhy3uXhrjzfUs1q
					</span>
					<span className="details__copy">Copy address</span>
				</div>
				<div className="details__row">
					<div className="details__qrcode">
						<QrCode
							level="H"
							size={180}
							fgColor="#557f96"
							value="3E3vQfDfgUAyZcmEYctvhy3uXhrjzfUs1q"
						/>
					</div>
				</div>
			</div>

			<div className="details__wrapper">
				<div className="details__row">
					<span className="details__timer">34:06:08</span>
					<span className="details__timerDescription">
						You have 36 hours to send funds otherwise the transaction will be
						canceled automaticaly
					</span>
				</div>
			</div>
		</div>
	)
}

export default TransactionDetails
