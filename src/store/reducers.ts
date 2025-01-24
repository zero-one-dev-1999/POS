import { combineReducers } from 'redux'
import App from './app'
import Lists from './lists'
import Selling from './selling'
import Products from './products'
import ReferenceMain from './reference-main'
import WarehouseIncome from './warehouse/income'
import WarehouseOutcome from './warehouse/outcome'
import Basket from './selling/basket'

export default combineReducers({
	App,
	Lists,
	Basket,
	Selling,
	Products,
	ReferenceMain,
	WarehouseIncome,
	WarehouseOutcome,
})
