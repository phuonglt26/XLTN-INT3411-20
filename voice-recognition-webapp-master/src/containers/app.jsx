import WithHtmlTitleRoute from 'commons/with-html-title-route/WithHtmlTitleRoute';
import React, { Fragment } from 'react';
import { Redirect, Switch } from 'react-router';
import { ToastContainer } from 'react-toastify';
import { APP_ROUTES, DEFAULT_APP_ROUTE } from './app-routers';


export default function App() {
	return (
		<Fragment>
			<Switch>
				{APP_ROUTES.map(route => (
					<WithHtmlTitleRoute
						key={route.path}
						htmlTitle={route.htmlTitle}
						exact={route.exact}
						path={route.path}
						component={route.component}
					/>
				))}
				<Redirect to={DEFAULT_APP_ROUTE.path} />
			</Switch>
			<ToastContainer
				position="bottom-right"
				autoClose={5000}
				newestOnTop
				closeOnClick
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
		</Fragment>
	);
}