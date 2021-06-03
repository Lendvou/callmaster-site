import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from 'store/reducers'

const composeEnhancers =
	(window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const configureStore = () => {
	const middlewares = [thunk]

	return createStore(
		rootReducer,
		composeEnhancers(applyMiddleware(...middlewares))
	)
}

export default configureStore
