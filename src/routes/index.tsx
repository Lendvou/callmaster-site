import React from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'

import RouteHOC from './RouteHOC'
import Landing from 'pages/Landing'
import Processing from 'pages/Processing'

const Routes = () => (
	<Router>
		<Switch>
			<RouteHOC path="/" page={Landing} exact />
			<RouteHOC path="/processing" page={Processing} exact />
		</Switch>
	</Router>
)

export default Routes
