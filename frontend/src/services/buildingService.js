import api from './api'
import requester from './requester'

const buildingService = {
	fetchBuildings: async () => requester(api.getBuildings, 'GET'),
	deleteBuilding: async (id) =>
		requester(`${api.getBuildings}/${id}`, 'DELETE'),
	updateBuilding: async (data, id) =>
		fetch(`${api.getBuildings}/${id}`, {
			method: 'PUT',
			body: data,
		}).then((res) => res.json()),
	addBuilding: async (data) =>
		fetch(`${api.getBuildings}`, {
			method: 'POST',
			body: data,
		}).then((res) => res.json()),
}

export default buildingService
