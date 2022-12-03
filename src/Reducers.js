import { combineReducers } from "redux"
import userReducers from './Reducers/userReducers'

export default combineReducers({
    user:userReducers
})