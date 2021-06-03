import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Btc, Eth, Ark, Ardr } from 'react-cryptocoins'
import Collapsible from 'react-collapsible'
// import { useSelector } from 'react-redux'

import SelectField from './SelectField'

import { ICurrencyOption } from 'types'

type ExchangeFormProps = {
	title?: string
	style?: object
	withActionButton?: boolean
	withDetails?: boolean
	withWalletAddress?: boolean
	whenClickNextStep?: (val: 'exchange' | 'checkout' | 'details') => void
}

const ExchangeForm = (props: ExchangeFormProps) => {
	const {
		style,
		title,
		withActionButton,
		withDetails,
		withWalletAddress,
		whenClickNextStep,
	} = props

	const history = useHistory()

	// const currencies = useSelector((state: any) => state.currencies)

	const [fromValue, setFromValue] = useState('0')
	const [toValue, setToValue] = useState('0')
	const [exchangeFrom, setExchangeFrom] = useState(currenciesOptions[0])
	const [exchangeTo, setExchangeTo] = useState(currenciesOptions[1])
	const [mode, setMode] = useState('floating')
	const [walletAddress, setWalletAddress] = useState('')
	const [isTermsChecked, setIsTermsChecked] = useState(false)

	useEffect(() => {
		convert('0.1', 'from')
	}, [])

	const convert = (
		value: string,
		type: 'from' | 'to',
		from = exchangeFrom,
		to = exchangeTo
	) => {
		const current = exchangeRates.find(
			(el) => el.exchangeFrom === from.value && el.exchangeTo === to.value
		)
		if (!current) return false

		if (type === 'from') {
			setFromValue(value)
			setToValue((+value * current.rate).toFixed(6))
		} else if (type === 'to') {
			setToValue(value)
			setFromValue((+value / current.rate).toFixed(6))
		}
	}

	const swapSelectValues = (): void => {
		setExchangeFrom(exchangeTo)
		setExchangeTo(exchangeFrom)
		convert(fromValue, 'from', exchangeTo, exchangeFrom)
	}

	const onSelectChange = (
		selectOption: ICurrencyOption,
		type: 'from' | 'to'
	) => {
		if (
			(type === 'from' && selectOption.value === exchangeFrom.value) ||
			(type === 'to' && selectOption.value === exchangeTo.value)
		) {
			return
		}

		if (
			selectOption.value === exchangeTo.value ||
			selectOption.value === exchangeFrom.value
		) {
			swapSelectValues()
			return
		}

		if (type === 'from') {
			setExchangeFrom(selectOption)
			convert(fromValue, type, selectOption)
		} else if (type === 'to') {
			setExchangeTo(selectOption)
			convert(toValue, type, selectOption)
		}
	}

	return (
		<>
			<div className="exchangeform" style={style}>
				<div className="exchangeform__wrapper">
					{title && <h3 className="exchangeform__title">{title}</h3>}
					<div className="exchangeform__modes">
						<button
							className={`exchangeform__mode ${
								mode === 'floating' ? 'isActiveFloating' : ''
							}`}
							onClick={() => setMode('floating')}
						>
							Floating rate
						</button>
						<button
							className={`exchangeform__mode ${
								mode === 'fixed' ? 'isActiveFixed' : ''
							}`}
							onClick={() => setMode('fixed')}
						>
							Fixed rate
						</button>
					</div>

					<div className="exchangeform__fields">
						<SelectField
							inputValue={fromValue}
							selectValue={exchangeFrom}
							options={currenciesOptions}
							whenInputChange={(value: string) => convert(value, 'from')}
							whenSelectChange={(value: any) => onSelectChange(value, 'from')}
						/>

						<div className="exchangeform__info">
							<div className="exchangeform__info-rate">
								<span className="lock-unlocked-icon" />
								<span className="exchangeform__info-rate--text">
									{fromValue} {exchangeFrom.label} ~ {toValue}{' '}
									{exchangeTo.label}
								</span>
							</div>
							<button
								className="exchangeform__info-swap"
								onClick={swapSelectValues}
							>
								<span />
							</button>
						</div>

						<SelectField
							inputValue={toValue}
							selectValue={exchangeTo}
							options={currenciesOptions}
							whenInputChange={(value: string) => convert(value, 'to')}
							whenSelectChange={(value: any) => onSelectChange(value, 'to')}
						/>
					</div>

					{withActionButton && (
						<button
							className="green-button"
							onClick={() => history.push('/processing')}
						>
							Exchange now
						</button>
					)}
				</div>
			</div>

			{withDetails && (
				<Collapsible trigger="Transaction details" transitionTime={150}>
					<p>
						Exchange fee 0.25%{' '}
						<span>
							{(+toValue * 0.0025).toFixed(6)} {exchangeTo.label}
						</span>
					</p>
					<p>
						Network fee <span>0.003 {exchangeTo.label}</span>
					</p>
					<p>
						Estimated arrival <span>5-30 minutes</span>
					</p>
				</Collapsible>
			)}

			{withWalletAddress && (
				<div className="exchangeform__address">
					<h3>Wallet address</h3>
					<span>Recipient Address</span>
					<input
						type="text"
						placeholder={`Enter your ${exchangeTo.label} recipient address`}
						value={walletAddress}
						onChange={(e: any) => setWalletAddress(e.target.value)}
					/>
					<div
						className="exchangeform__address-checkbox"
						onClick={() => setIsTermsChecked(!isTermsChecked)}
					>
						<span
							className={`terms-checkbox ${isTermsChecked ? 'isChecked' : ''}`}
						/>
						<p className="terms-label">
							I agree with Terms of Use, Privacy Policy and AML/KYC
						</p>
					</div>
					<button
						className="green-button"
						disabled={!isTermsChecked || !walletAddress}
						onClick={() => whenClickNextStep && whenClickNextStep('checkout')}
					>
						Next step
					</button>
				</div>
			)}
		</>
	)
}

const currenciesOptions: ICurrencyOption[] = [
	{
		label: 'BTC',
		value: 'btc',
		description: 'Bitcoin',
		icon: <Btc />,
		hasFixed: true,
	},
	{
		label: 'ETH',
		value: 'eth',
		description: 'Ethereum',
		icon: <Eth />,
		hasFixed: true,
	},
	{
		label: 'XRP',
		value: 'xrp',
		description: 'XRP',
		icon: <Ark />,
		hasFixed: false,
	},
	{
		label: 'Abyss',
		value: 'abyss',
		description: 'The Abyss',
		icon: <Ardr />,
		hasFixed: true,
	},
]

let exchangeRates: Array<{
	exchangeFrom: string
	exchangeTo: string
	rate: number
}> = []

const getRandom = (max: number, min: number): number => {
	let multiplier = 1
	if (Math.random() < 0.5) {
		multiplier = 0.03
	}
	return (Math.random() * (max - min) + min) * multiplier
}

currenciesOptions.forEach((el, i, arr) =>
	arr.forEach((el1) => {
		exchangeRates.push({
			exchangeFrom: el.value,
			exchangeTo: el1.value,
			rate: getRandom(0.0005, 100),
		})
	})
)
exchangeRates = exchangeRates.filter((el) => el.exchangeFrom !== el.exchangeTo)

export default ExchangeForm
