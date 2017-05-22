import React from 'react'
import {NavLink} from 'react-router-dom'

export default class Navbar extends React.Component {
	render() {
		return (
			<div class='text-center'>
				<NavLink class='btn' activeClassName='btn-warning' to='/home'> Home </NavLink>
				<NavLink class='btn' activeClassName='btn-warning' to='/add'> Add </NavLink>
				<NavLink exact class='btn' activeClassName='btn-warning' to='/'> Index </NavLink>
			</div>
		)
	}
}