import difference from 'lodash/difference'

const INIT_SERIES_LIST = {
	// list of series to render them
	series_names : ['The Flash'],
	// flat data map of each series by their names
	series_data: {
		'The Flash' : {
			"name":"The Flash",
			"fetch_url":"http://next-episode.net/the-flash-2014",
			"dl_url":"https://1337x.unblockall.xyz/series/the-flash/", 
			fetching:false, 
			fetched:false, 
			"ep_name":"Cause and Effect",
			"series_no":"3",
			"ep_no":"21",
			"next_ep_name":"Infantino Street",
			"countdown":"1 day 14 hours",
			"current":"3.21 Cause and Effect"
		},
	}
}

export const seriesReducer = (state=INIT_SERIES_LIST, action) => {
	/*
	Handles all token, refresh token, scope data and data update to the store
	*/
	switch(action.type){

		case "CHANGE_DATA": {
			return { ...INIT_SERIES_LIST }
		}

		case "UPDATING_SERIES" : {
			let series_data = {...state.series_data}
			series_data[action.payload] = {...series_data[action.payload], fetching : true}
			return { ...state, series_data: series_data }
		}

		case "UPDATE_SERIES_SUCCESS": {
			let series_data = {...state.series_data}
			series_data[action.payload.name] = { 
				...series_data[action.payload.name],
				...action.payload,
				fetching: false, 
				fetched:true,
			}
			return { ...state, series_data: series_data }
		}

		case "ADD_NEW_SERIES": {
			let series_data = {...state.series_data}
			series_data[action.payload.name] = {
				...action.payload,
				fetched: false,
				fetching: false,
				current: 'You Just Started Watching This !'
			}
			let updated_names = state.series_names
			updated_names.push(action.payload.name)
			return { ...state, series_data: series_data, series_names: updated_names }
		}

		case "SEEN_THIS_SERIES" : {
			let series_data = {...state.series_data}
			let series = series_data[action.payload]
			series_data[action.payload] = {
				...series, 
				current : `${series.season_no}.${series.ep_no} - ${series.ep_name}`
			}
			return { ...state, series_data: series_data }
		}

		case "DELETE_THIS_SERIES" : {
			let series_data = {...state.series_data}
			series_data[action.payload] = undefined
			let updated_names = difference(state.series_names, [ action.payload ] )
			return { ...state, series_data: series_data, series_names: updated_names }
		}

		case "EDIT_SERIES" : {
			let series_data = {...state.series_data}
			series_data[action.payload.name] = { 
				...series_data[action.payload.name],
				...action.payload
			}
			return { ...state, series_data: series_data }
		}

		default : {
			return {...state}
		}
	}
}