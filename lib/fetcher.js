module.exports = async (url, body) => { 
	const res = await fetch(url, {
		method: body ? 'post' : 'get',
		body: body ? JSON.stringify(body) : null,
		headers: body
			? {
					'Content-Type': 'application/json',
			  }
			: {},
	});
	const data = await res.json();
	return { res, data };
};
