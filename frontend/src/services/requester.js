const requester = async (resource, method, body) => {
	const options = {
		method,
		headers: {
			'Content-Type': 'application/json',
		},
		...(body && { body: JSON.stringify(body) }),
	}
	return await fetch(resource, options).then((response) => {
		return response.json()
	})
}

export default requester
