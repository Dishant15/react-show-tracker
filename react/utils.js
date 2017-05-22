import electron from 'electron'
import path from 'path'
import fs from 'fs'
import forEach from 'lodash/forEach'

import store from '~/store'

export function getData(defaultData = {}) {
	const userDataPath = (electron.app || electron.remote.app).getPath('userData')
	// We'll use the `configName` property to set the file name and path.join to bring it all together as a string
	const filePath = path.join(userDataPath, 'showTrackerDB')
	try {
		// get current data
		let data = JSON.parse(fs.readFileSync(filePath))
		forEach(data.seriesList.series_data, (val, key) => {
			// set fetching flags to false
			data.seriesList.series_data[key] = {...data.seriesList.series_data[key], fetching: false, fetched: false}
		})
		return data

	} catch(error) {
		// if there was some kind of error, return the passed in defaults instead.
		fs.writeFileSync(filePath, JSON.stringify(defaultData))
		return defaultData
	}
}

export function setData(){
	const userDataPath = (electron.app || electron.remote.app).getPath('userData')
	// We'll use the `configName` property to set the file name and path.join to bring it all together as a string
	const filePath = path.join(userDataPath, 'showTrackerDB')
	
	try {
		fs.writeFileSync(filePath, JSON.stringify( store.getState() ) )
		return true

	} catch (error) {
		// do nothing
		console.log(error)
		return false
	}
}

