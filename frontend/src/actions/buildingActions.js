import buildingService from '../services/buildingService'
import { DELETE_BUILDING_SUCCESS, FETCH_BUILDINGS_SUCCESS } from './actionTypes'

const fetchBuildingsAction = (buildings) => ({
	type: FETCH_BUILDINGS_SUCCESS,
	payload: buildings,
})

const deleteBuildingAction = (buildingId) => ({
	type: DELETE_BUILDING_SUCCESS,
	payload: buildingId,
})

export const fetchBuildings = () => async (dispatch) => {
	try {
		const buildings = await buildingService.fetchBuildings()
		console.log(buildings)
		dispatch(fetchBuildingsAction(buildings))
	} catch (error) {
		console.log(error)
	}
}

export const deleteBuilding = (buildingId) => async (dispatch) => {
	try {
		const response = await buildingService.deleteBuidling(buildingId)
		dispatch(deleteBuildingAction(response.id))
	} catch (error) {
		console.log(error)
	}
}
