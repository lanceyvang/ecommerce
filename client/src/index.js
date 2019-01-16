import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
// import './index.css';
import { getToken } from './Utils';
import 'gestalt/dist/gestalt.css';

import App from './Components/App';
import Navbar from './Components/Navbar';
import Signin from './Components/Signin';
import Signup from './Components/Signup';
import Checkout from './Components/Checkout';
import Brews from './Components/Brews';

import registerServiceWorker from './registerServiceWorker';

// Private Route, user can only visited if logged in
const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route
		{...rest}
		render={(props) =>
			getToken() !== null ? (
				<Component {...props} />
			) : (
				<Redirect
					to={{
						pathname: '/signin',
						state: { from: props.location }
					}}
				/>
			)}
	/>
);

const Root = () => (
	<Router>
		<React.Fragment>
			<Navbar />
			<Switch>
				{/* Use exact path to not match multiple routes  */}
				<Route component={App} exact path='/' />
				<Route component={Signin} path='/signin' />
				<Route component={Signup} path='/signup' />
				<PrivateRoute component={Checkout} path='/checkout' />
				<Route component={Brews} path='/:brandId' />
			</Switch>
		</React.Fragment>
	</Router>
);

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();

//updates the page without a reload
if (module.hot) {
	module.hot.accept();
}
