import buildingService from '../services/buildingService'
import {
	ADD_BUILDING_SUCCESS,
	DELETE_BUILDING_SUCCESS,
	FETCH_BUILDINGS_SUCCESS,
	UPDATE_BUILDING_SUCESS,
} from './actionTypes'

const fetchBuildingsAction = (buildings) => ({
	type: FETCH_BUILDINGS_SUCCESS,
	payload: buildings,
})

const deleteBuildingAction = (buildingId) => ({
	type: DELETE_BUILDING_SUCCESS,
	payload: buildingId,
})

const updateBuildingAction = (building) => ({
	type: UPDATE_BUILDING_SUCESS,
	payload: building,
})

const addBuildingAction = (building) => ({
	type: ADD_BUILDING_SUCCESS,
	payload: building,
})

export const fetchBuildings = () => async (dispatch) => {
	try {
		const buildings = await buildingService.fetchBuildings()
		dispatch(fetchBuildingsAction(buildings))
	} catch (error) {
		console.log(error)
	}
}

export const deleteBuilding = (buildingId) => async (dispatch) => {
	try {
		const response = await buildingService.deleteBuilding(buildingId)
		dispatch(deleteBuildingAction(response.data))
	} catch (error) {
		console.log(error)
	}
}

export const updateBuilding = (data, buildingId) => async (dispatch) => {
	try {
		const response = await buildingService.updateBuilding(data, buildingId)
		dispatch(updateBuildingAction(response.data))
	} catch (error) {
		console.log(error)
	}
}

export const addBuilding = (data) => async (dispatch) => {
	try {
		const response = await buildingService.addBuilding(data)
		dispatch(addBuildingAction(response.data))
	} catch (error) {
		console.log(error)
	}
}
