import request from 'request'
import cheerio from 'cheerio'

import {setData} from '~/utils'


export function editSeries(name, data) {
	return {
		type: 'EDIT_SERIES',
		payload: {...data, name: name}
	}
}

export function deleteThisSeries(name) {
	return {
		type: 'DELETE_THIS_SERIES',
		payload: name
	}
}

export function seenThisSeries(name) {
	return {
		type: 'SEEN_THIS_SERIES',
		payload: name
	}
}

export function addNewSeries(data) {
	return {
		type: 'ADD_NEW_SERIES',
		payload: data
	}
}

export function updateSeries(url, name) {
	return( (dispatch) => {
		dispatch({
			type: 'UPDATING_SERIES',
			payload : name
		})

		const callback = (res) => {
			dispatch({
				type: "UPDATE_SERIES_SUCCESS",
				payload: res
			})
			setData()
		}

		scrapData( url, name, callback )
	})
}

// function to scrap data from given next-episode.com url
function scrapData(url, name, callback) {
	let result = {name : name};
	request(url, function (err, responce, html) {
		let $ = cheerio.load(html);
		$("#previous_episode").filter(function() {
			// get current episode data
			try {
				// parse_list = [ trashdata , rest of the jumbled usefull data]
				let parse_list = $(this).text().replace(/ /g,"+").replace(/\s/g, "").split('Name:')
				// parse_list = [ ep_name , rest of the jumbled usefull data]
				parse_list = parse_list[1].split('Date:')
				result.ep_name = parse_list[0].replace(/[+]/g," ")
				parse_list = parse_list[1].split('Season:')
				// result.ep_date = parse_list[0].replace(/[+]/g," ")  // we don't need the date
				parse_list = parse_list[1].split('Episode:')
				result.season_no = parse_list[0].replace(/[+]/g," ")
				parse_list = parse_list[1].split('Summary:')
				result.ep_no = parse_list[0].replace(/[+]/g," ")
				
			} catch(err) {
				console.log(err);
				callback(null);
				return;
			}
			$("#next_episode").filter(function(){
				// get next episode data
				try {
					let parse_list = $(this).text().replace(/ /g,"+").replace(/\s/g, "").split("Name:");

					parse_list = parse_list[1].split('Countdown:')
					result.next_ep_name = parse_list[0].replace(/[+]/g," ")
					parse_list = parse_list[1].split('Date:')
					result.countdown = parse_list[0].replace(/[+]/g," ")
					callback(result)

				} catch(err) {
					result.next_ep_name = null;
					result.countdown = null;
					callback(result);
				}				
			});
		});
	});
}