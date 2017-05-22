import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, NavLink, Switch, Route} from 'react-router-dom'

import { Provider } from "react-redux"

import HomePage from '~/pages/HomePage'
import IndexPage from '~/pages/IndexPage'
import AddSeriesPage from '~/pages/AddSeriesPage'
import EditSeriesPage from '~/pages/EditSeriesPage'
import Navbar from '~/components/Navbar'
import store from './store'

const routes = (
	<BrowserRouter >
		<div class='container'>
			<Navbar />
			<Switch>
				<Route path ='/home' component={IndexPage} />
				<Route exact={true} path ='/add' component={AddSeriesPage} />
				<Route exact={true} path ='/edit/:name' component={EditSeriesPage} />
				<Route path ='' component={HomePage} />				
			</Switch>
		</div>
	</BrowserRouter>
)

class AppProvider extends React.Component {
	// delay render of react, fetch localstorage data
	// render all components based on persisted store

	constructor() {
		super()

		this.state = { rehydrated: false }
	}

	componentWillMount(){
		this.setState({ rehydrated: true })
	}

	componentWillUnmount(){
		
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