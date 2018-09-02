export const API = {
	getToken: 'https://sarca-alexandru.herokuapp.com/user_token',
	login: 'https://sarca-alexandru.herokuapp.com/auth',
	signup: 'https://sarca-alexandru.herokuapp.com/users/create',
	qr: id => `https://sarca-alexandru.herokuapp.com/poi_informations/get_all_data/${id}`
}