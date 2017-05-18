import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { autoRehydrate } from 'redux-persist'

import {testReducer} from "~/reducers"


const reducers = combineReducers({
	test 				: testReducer,
});

const store = createStore( reducers, applyMiddleware(thunk), autoRehydrate());

// store.subscribe(()=>{
// 	console.log("Store Updated :", store.getState().sessionDetails);
// });

export default store;
