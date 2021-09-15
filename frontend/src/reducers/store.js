import { combineReducers, configureStore } from '@reduxjs/toolkit'
import buildingReducer from './buildingReducer'

const rootReducer = combineReducers({
	buildings: buildingReducer,
})

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})
