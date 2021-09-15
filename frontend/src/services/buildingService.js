import api from './api'
import requester from './requester'

const buildingService = {
	fetchBuildings: async () => requester(api.getBuildings, 'GET'),
	// deleteBuidling: async (buildingId) =>
	// 	fakeApiCall(
	// 		(() => {
	// 			//delete data from json
	// 			return {
	// 				success: true,
	// 				id: buildingId,
	// 			}
	// 		})(),
	// 		300
	// 	),
}

export default buildingService
