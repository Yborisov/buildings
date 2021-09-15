export const sleep = (data, ms) =>
	new Promise((resolve) =>
		setTimeout(() => {
			resolve(data)
		}, ms)
	)
