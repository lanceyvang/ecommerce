// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './components/App';
// import registerServiceWorker from './registerServiceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import './index.css';

import 'gestalt/dist/gestalt.css';

import App from './Components/App';
// import Navbar from './Components/Navbar';
import Signin from './Components/Signin';
import Signup from './Components/Signup';
import Checkout from './Components/Checkout';

import registerServiceWorker from './registerServiceWorker';

const Root = () => (
	<Router>
		<React.Fragment>
			{/* <Navbar /> */}
			<Switch>
				{/* Use exact path to not match multiple routes  */}
				<Route component={App} exact path='/' />
				<Route component={Signin} path='/signin' />
				<Route component={Signup} path='/signup' />
				<Route component={Checkout} path='/checkout' />
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
