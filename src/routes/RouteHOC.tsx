import React, { ComponentType } from 'react'
import { Route, RouteProps } from 'react-router-dom'

import Layout from 'layout/main'

interface IRouteHOC extends RouteProps {
	page: ComponentType
}

const RouteHOC = (props: IRouteHOC) => {
	const { page: Page, ...rest } = props
	return (
		<Route
			{...rest}
			render={(routeProps: any) => (
				<Layout>
					<Page {...routeProps} />
				</Layout>
			)}
		/>
	)
}

export default RouteHOC
