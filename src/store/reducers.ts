import { combineReducers } from 'redux'
import App from './app'
import ReferenceMain from './reference-main'
import Products from './products'
import Lists from './lists'
import WarehouseIncome from './warehouse/income'
import WarehouseOutcome from './warehouse/outcome'

export default combineReducers({
	App,
	Lists,
	Products,
	ReferenceMain,
	WarehouseIncome,
	WarehouseOutcome,
})
