import React from 'react'

import { CurrentBlock } from 'types'

type CheckoutProps = {
	whenClickConfirm: (val: CurrentBlock) => void
}

const Checkout = (props: CheckoutProps) => {
	const { whenClickConfirm } = props

	return (
		<div className="checkout">
			<div className="checkout__wrapper">
				<div className="checkout__title">
					<h3>Checkout</h3>
					<button onClick={() => whenClickConfirm('exchange')}>
						&nbsp;&nbsp; Back
					</button>
				</div>
				<div className="checkout__row">
					<div className="checkout__column">
						<span className="checkout__label">You send</span>
						<span className="checkout__value font-bold">0.1 BTC</span>
					</div>
					<div className="checkout__column">
						<span className="checkout__label">You get approximately</span>
						<span className="checkout__value font-bold">3.99284012 ETH</span>
					</div>
				</div>
				<div className="checkout__row without-border">
					<div className="checkout__column">
						<span className="checkout__label">Exchange fee</span>
						<span className="checkout__value">0.01000712 ETH</span>
						<span className="checkout__notice">
							The exchange fee is already included in the displayed amount
							you’ll get
						</span>
					</div>
					<div className="checkout__column">
						<span className="checkout__label">Network fee</span>
						<span className="checkout__value">0.003 ETH</span>
						<span className="checkout__notice">
							Will be excluded from the final amount
						</span>
					</div>
				</div>
				<div className="checkout__row without-border">
					<div className="checkout__column">
						<div className="checkout__label">Recipient address</div>
						<div className="checkout__value">
							0x7Da7345CF4016D42e43e9004a8648c385F649a1D
						</div>
					</div>
				</div>
			</div>

			<div className="checkout__wrapper">
				<button
					className="green-button"
					onClick={() => whenClickConfirm('details')}
				>
					Confirm &amp; make payment
				</button>
			</div>
		</div>
	)
}

export default Checkout
