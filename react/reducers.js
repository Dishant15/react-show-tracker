const INIT_TEST = {
	// Initial state of session
	somedata: 'This is init',
}

export const testReducer = (state=INIT_TEST, action) => {
	/*
	Handles all token, refresh token, scope data and data update to the store
	*/
	switch(action.type){

		case "CHANGE_DATA": {
			return { ...state, somedata: "This is changed" }
		}

		default : {
			return {...state}
		}
	}
}