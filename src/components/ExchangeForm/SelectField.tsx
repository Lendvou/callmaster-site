import React, { useState } from 'react'
import ReactSelect from 'react-select'

import { ICurrencyOption } from 'types'

type SelectFieldProps = {
	selectValue: ICurrencyOption
	options: ICurrencyOption[]
	inputValue: string
	whenInputChange: (value: string) => void
	whenSelectChange: (val: ICurrencyOption) => void
}

const SelectField = (props: SelectFieldProps) => {
	const {
		selectValue,
		options,
		inputValue,
		whenInputChange,
		whenSelectChange,
	} = props

	const [isSelectActive, setIsSelectActive] = useState(false)

	return (
		<div className="exchangeform__field">
			{!isSelectActive ? (
				<>
					<div className="exchangeform__input">
						<span>You send</span>
						<input
							type="number"
							value={inputValue}
							onChange={(e) => whenInputChange(e.target.value)}
						/>
					</div>
					<div
						className="exchangeform__indicator"
						onClick={() => setIsSelectActive(true)}
					>
						<div className="exchangeform__indicator-text">
							<span className="exchangeform__indicator-description">
								{selectValue.description}
							</span>
							<span className="exchangeform__indicator-label">
								{selectValue.label}
							</span>
						</div>
						<div className="exchangeform__indicator-icon">
							<span />
						</div>
					</div>
				</>
			) : (
				<ReactSelect
					className="react-select"
					classNamePrefix="react-select"
					autoFocus={true}
					menuIsOpen={true}
					blurInputOnSelect={true}
					options={options}
					value={selectValue}
					// @ts-ignore
					getOptionLabel={(option: ICurrencyOption) =>
						getCustomOptionLabel(option)
					}
					onBlur={() => setIsSelectActive(false)}
					onChange={(val: any) => {
						whenSelectChange(val)
						setIsSelectActive(false)
					}}
				/>
			)}
		</div>
	)
}

const getCustomOptionLabel = (option: ICurrencyOption) => (
	<div className="react-select__customoption">
		<div className="react-select__customoption-text">
			<span className="react-select__customoption-text--icon">
				{option.icon}
			</span>
			<span className="react-select__customoption-text--label">
				{option.label}
			</span>
			<span className="react-select__customoption-text--description">
				{option.description}
			</span>
		</div>
		{option.hasFixed && <div className="lock-icon" />}
	</div>
)

export default SelectField
