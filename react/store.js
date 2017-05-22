import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"

import {seriesReducer} from "~/reducers"
import {getData} from '~/utils'

const reducers = combineReducers({
	seriesList			: seriesReducer,
});

const defaultData = { 
	seriesList : {
		// dummy data
		fetching : false,
		fetched : false,
		error: false,
		series_names : [],
		series_data: {}
	}
}

// return saved data and if no saved data found pass the default data
const data = getData( defaultData )
// const data = defaultData  // use to migrate to new data structure

const store = createStore( reducers, data, applyMiddleware(thunk) );

// store.subscribe(()=>{
// 	console.log("Store Updated :", store.getState().seriesList.series_data);
// });

export default store;
