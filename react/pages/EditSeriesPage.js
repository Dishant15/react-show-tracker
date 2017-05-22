import React from 'react'
import {connect} from 'react-redux'

import {setData} from '~/utils'
import {editSeries} from '~/actions'

@connect((store) => {
	return {
		series_data: store.seriesList.series_data,
	}
})
export default class EditSeriesPage extends React.Component {
	constructor(props) {
		super(props)

		this.series_name = props.match.params.name
		this.series = props.series_data[this.series_name]

		this.state = {
			fetch_url: this.series.fetch_url,
			dl_url: this.series.dl_url,
			current : this.series.current
		}
		this.editSeries = this.editSeries.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}

	editSeries(event) {
		if(event) event.preventDefault();

		// handle validations here

		this.props.dispatch(editSeries(this.series_name, this.state))
		this.props.history.push('')
	}

	componentWillUnmount(){
		setData()
	}

	handleChange(event) {
		let newState = {}
		newState[event.target.name] = event.target.value
		this.setState(newState)
	}

	render() {
		return (
			<div key='edit'>
				<form action="" onSubmit={this.editSeries} class="text-center">
					<h3> Edit {this.series_name} </h3>
				  <div class="form-group">
				    <label>Your Current Marker</label>
				    <input type="text" class="form-control"
				    	placeholder="The last episode you have seen" name="current" 
				    	onChange={this.handleChange}
				    	value={this.state.current}
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
				  <button type="submit" class="btn btn-default" onClick={this.editSeries}>
				  	Edit Show
				  </button>
				</form>
			</div>
		)
	}
}