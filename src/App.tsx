import React from 'react'
import { Provider } from 'react-redux'

import Routes from 'routes'
import configureStore from 'store'

import 'assets/styles/index.scss'

const store = configureStore()

function App() {
	return (
		<Provider store={store}>
			<Routes />
		</Provider>
	)
}

export default App
