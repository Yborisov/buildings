import {
	ADD_BUILDING_SUCCESS,
	DELETE_BUILDING_SUCCESS,
	FETCH_BUILDINGS_SUCCESS,
	UPDATE_BUILDING_SUCESS,
} from '../actions/actionTypes'

const initialState = []

const buildingReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_BUILDINGS_SUCCESS:
			return action.payload
		case DELETE_BUILDING_SUCCESS:
			return [...state.filter((building) => building.id !== action.payload)]
		case UPDATE_BUILDING_SUCESS:
			return [
				...state.map((building) =>
					building.id === action.payload.id ? action.payload : building
				),
			]
		case ADD_BUILDING_SUCCESS:
			return [action.payload, ...state]
		default:
			return state
	}
}

export default buildingReducer
