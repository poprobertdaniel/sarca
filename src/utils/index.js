
export function isValidEmail(str){
	const email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return email.test(str);
}



export const promiseRequest = (method, url, data = null) => {
	/*
			@param method - string which will define the type of the request ( GET, POST, etc )
			@param url - string which will define the target url
			@param data - object which will define the data sent through a POST request
			the function will return a promise with a JSON response
	*/
	return new Promise(function (resolve, reject) {
		if(!method || !url) reject('params not sent')
		const stringifiedData = data !== null ? JSON.stringify(data) : null
		fetch(url, {
			method: method,
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: stringifiedData
		})
			.then(response => {
				if (response.status === 404 ) return {wrongCredetians: true}
				return response.json()
			})
			.then(responseJson => {
				resolve(responseJson)
			})
			.catch(error => {
				reject(error)
			});
	});
}