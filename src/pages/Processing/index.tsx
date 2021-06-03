import React, { useState } from 'react'

import ExchangeForm from 'components/ExchangeForm'
import Checkout from 'components/Checkout'
import TransactionDetails from 'components/TransactionDetails'

import { CurrentBlock } from 'types'

const Processing = () => {
	const [currentBlock, setCurrentBlock] = useState<CurrentBlock>('exchange')

	return (
		<div className="processing">
			<div className="processing__form">
				{currentBlock === 'exchange' && (
					<ExchangeForm
						title="Calculate amount"
						withDetails
						withWalletAddress
						whenClickNextStep={(val: CurrentBlock) => setCurrentBlock(val)}
					/>
				)}
				{currentBlock === 'checkout' && (
					<Checkout
						whenClickConfirm={(val: CurrentBlock) => setCurrentBlock(val)}
					/>
				)}
				{currentBlock === 'details' && <TransactionDetails />}
			</div>
		</div>
	)
}

export default Processing
