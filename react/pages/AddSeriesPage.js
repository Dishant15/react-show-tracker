import React from 'react'

import {addNewSeries} from '~/actions'
import store from '~/store'

export default class AddSeriesPage extends React.Component {
	constructor() {
		super()

		this.state = {
			name : '',
			fetch_url: '',
			dl_url: ''
		}
		this.addSeries = this.addSeries.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}

	addSeries(event) {
		if(event) event.preventDefault();

		// handle validations here
		// no '/' or special characters in Name

		store.dispatch(addNewSeries(this.state))
		this.props.history.push('')
	}

	handleChange(event) {
		let newState = {}
		newState[event.target.name] = event.target.value
		this.setState(newState)
	}

	render() {
		return (
			<div key='add'>
				<form action="" onSubmit={this.addSeries} class="text-center">
				  <div class="form-group">
				    <label>Show Name</label>
				    <input type="text" class="form-control"
				    	placeholder="Name of the show" name="name" 
				    	onChange={this.handleChange}
				    	value={this.state.name}
				    />
				  </div>
				  <div class="form-group">
				    <label>Fetch URL</label>
				    <p class="help-blockExample">get this url from <a href="http://next-episode.net" target="_blank">next-episode </a> website</p>
				    <input type="text" placeholder="Search show name on next-episode website and enter that url here" 
				    	name="fetch_url" class="form-control"
				    	onChange={this.handleChange}
				    	value={this.state.fetch_url}
				    />
				  </div>
				  <div class="form-group">
				    <label>Download URL</label>
				    <input type="text" placeholder="URL to go when new episode available (your preffered site to watch/Download the episode)" 
				    	name="dl_url" class="form-control"
				    	onChange={this.handleChange}
				    	value={this.state.dl_url}
				    />
				  </div>
				  <button type="submit" class="btn btn-default" onClick={this.addSeries}>
				  	Add Show
				  </button>
				</form>
			</div>
		)
	}
}