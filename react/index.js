import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import { Provider } from "react-redux"
import { persistStore } from 'redux-persist'

import IndexPage from '~/pages/IndexPage'
import store from './store'

const routes = (
	<Router onUpdate={() => window.scrollTo(0, 0)} >
		<Route path ='/' component={IndexPage} />
	</Router>
)

class AppProvider extends React.Component {
	// delay render of react, fetch localstorage data
	// render all components based on persisted store

	constructor() {
		super()

		this.state = { rehydrated: false }
	}

	componentWillMount(){
		persistStore(store, {whitelist: ['test',]}, () => {
			console.log(store.getState())
			this.setState({ rehydrated: true })
		})
	}

	render() {
		if(!this.state.rehydrated){
			return (
				<div class="text-center">
					<h2 class='text-warning'>Loading...</h2>
				</div>
			)
		}
		return (<Provider store={store}>{routes}</Provider>)
	}
}


ReactDOM.render(
	<AppProvider />,
	document.getElementById("body-content")
);