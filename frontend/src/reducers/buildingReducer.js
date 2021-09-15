import {
	DELETE_BUILDING_SUCCESS,
	FETCH_BUILDINGS_SUCCESS,
} from '../actions/actionTypes'

const initialState = []

const buildingReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_BUILDINGS_SUCCESS:
			return action.payload
		case DELETE_BUILDING_SUCCESS:
			return [...state.filter((building) => building.id !== action.payload)]
		default:
			return state
	}
}

export default buildingReducer
