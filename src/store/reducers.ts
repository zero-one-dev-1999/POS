import { combineReducers } from 'redux'
import App from './app'
import ReferenceMain from './reference-main'
import Products from './products'
import Lists from './lists'

export default combineReducers({
	App,
	Lists,
	Products,
	ReferenceMain,
})
