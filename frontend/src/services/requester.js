const requester = async (resource, method, body, customHeaders) => {
	const options = {
		method,
		headers: customHeaders ?? {
			'Content-Type': 'application/json',
		},
		...(body && { body: JSON.stringify(body) }),
	}
	return await fetch(resource, options).then((response) => {
		return response.json()
	})
}

export default requester
