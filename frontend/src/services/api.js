const baseApiUrl =
	process.env.NODE_ENV === 'development'
		? 'http://localhost:8000'
		: window.location.origin

const api = {
	getBuildings: `${baseApiUrl}/api/buildings`,
}
export { baseApiUrl }
export default api
