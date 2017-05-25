import React from 'react'
import {NavLink} from 'react-router-dom'

export default class Navbar extends React.Component {
	render() {
		return (
			<div id='menubar' class='text-center'>
				<NavLink class='navbox col-xs-offset-3 col-xs-3' activeClassName='active' to='/home'>
					<div><span class="glyphicon glyphicon-list" aria-hidden="true" /></div>
					<div> List Shows </div>
				</NavLink>
				<NavLink class='navbox col-xs-3' activeClassName='active' to='/add'>
					<div><span class="glyphicon glyphicon-plus" aria-hidden="true" /></div>
					<div> Add Show </div>
				</NavLink>
				{/*<NavLink exact class='btn' activeClassName='btn-warning' to='/test'> Test </NavLink>*/}
			</div>
		)
	}
}