import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import {updateSeries, seenThisSeries, deleteThisSeries} from '~/actions'
import {setData} from '~/utils'
import has from 'lodash/has'

@connect((store) => {
	return {
		series_list: store.seriesList.series_names,
	}
})
export default class HomePage extends React.Component {
	/*
	Show list of all saved series here
	*/
	render() {
		return (
			<div>
				{
					this.props.series_list.map( (name, ind) => {
						return <ShowBlock key={ind} show_name={name} />
					} )
				}
			</div>
		)
	}
}


@connect((store) => {
	return {
		series_data: store.seriesList.series_data,
	}
})
class ShowBlock extends React.Component {

	constructor(){
		super()

		this.state = {
			updated : false
		}

		this.seenThis = this.seenThis.bind(this)
		this.deleteThis = this.deleteThis.bind(this)
	}

	componentDidMount(){
		const show = this.props.series_data[this.props.show_name]
		// console.log(show)
		if(!show.fetched) {
			this.props.dispatch(updateSeries(show.fetch_url, show.name))
		}
	}

	componentWillUnmount(){
		if(!has(this.props.series_data, this.props.show_name)){
			// this show was removed from data
			// delete if from file system too
			setData()
		}
	}

	seenThis(){
		this.props.dispatch(seenThisSeries(this.props.show_name))
		this.setState({updated: true})
		setData()
	}

	deleteThis(){
		this.props.dispatch(deleteThisSeries(this.props.show_name))
	}

	render(){

		const show = this.props.series_data[this.props.show_name]
		const show_banner = `${show.season_no}.${show.ep_no} - ${show.ep_name}`
		let borderClass;
		// side brorder color choice
		if(show.fetching){
			borderClass = 'loading'
		} else if (this.state.updated) {
			borderClass = 'done'
		} else if( show_banner == show.current ) {
			borderClass = 'old'
		} else {
			borderClass = 'new'
		}

		return (
			<div class={`row box ${borderClass}`}>
				<div class='col-sm-9 col-xs-12'>
					<div class='heading text-left text-warning'> {show.name} </div>

					<blockquote>
						<p> {show_banner} </p>
						{show.next_ep_name ?
							<footer> Next episode {show.next_ep_name} in 
								<cite class='text-danger'> {show.countdown}</cite>
							</footer>
						:
							<footer> Next episode details 
								<cite class='text-danger'> not available</cite>
							</footer>
						}
					</blockquote>

					<div class='last'> Your last update :
						<span> {show.current} </span>
					</div>
				</div>

				<div class='text-center.col-sm-3.col-xs-12'>
					<a class='btn btn-success glyph' href={show.dl_url} target="_blank" onClick={this.seenThis}>
						<span class="glyphicon glyphicon-download-alt" aria-hidden="true" />
					</a>
					<Link class='btn btn-warning glyph' 
						to={`/edit/${show.name}`} 
						disabled={show.fetching}
					>
						<span class="glyphicon glyphicon-pencil" aria-hidden="true" />
					</Link>
					<a class='btn btn-danger glyph' href='#' onClick={this.deleteThis}>
						<span class="glyphicon glyphicon-trash" aria-hidden="true"/>
					</a>
				</div>
			</div>
		)
	}
}
			