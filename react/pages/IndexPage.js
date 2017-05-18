import React from 'react'
import {connect} from 'react-redux'
import Rx from 'rxjs/Rx';


@connect((store) => {
	return {
		data : store.test.somedata,
	}
})
export default class IndexPage extends React.Component {
	constructor() {
		super()

		this.changeState = this.changeState.bind(this)
		this.test = this.test.bind(this)
	}

	changeState(){
		this.props.dispatch({
			type: "CHANGE_DATA"
		})
	}

	test(){
		const set = new Set([1, 2, 3])
		const _this = this
		Rx.Observable.interval(500)
		.scan((previous, current) => {
			console.log('prev',previous)
			console.log('curr',current)
		  return {
		    sum: previous.sum + current,
		    count: previous.count + 1
		  }
		}, {sum: 0, count: 0})
		.map(o => o.sum / o.count)
		.subscribe(x => console.log(x),
		           error => console.error(error),
		           () => console.log('done'));
	}

	render() {
		return (
			<div class='text-center'>
				<h1 class='text-warning'>This is asldf amazing IndexPage</h1>
				<p>{this.props.data}</p>
				<button class='btn btn-success' onClick={this.test}> test Data </button>
			</div>
		)
	}
}