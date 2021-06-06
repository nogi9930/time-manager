import { combineReducers } from 'redux'
import { timelineReducer } from './timeline'

const rootReducer = combineReducers({
  timeline: timelineReducer
})

export default rootReducer