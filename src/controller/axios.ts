import axios from 'axios';

const baseURL = 'http://localhost:9000/';
const axiosInstance = axios.create({
	baseURL: baseURL,
	headers: {
		'Content-Type': 'application/json',
	},
	withCredentials: true,
});

axiosInstance.interceptors.request.use(
	async (config) => {
		config.headers = {
			Authorization: `Bearer ${localStorage.getItem('token')}`,
			Accept: 'application/json',
			'Content-Type': 'application/json',
		};
		return config;
	},
	(error) => {
		Promise.reject(error);
	}
);
axiosInstance.interceptors.response.use(
	(response) => {
		return response;
	},
	async function (error) {
		console.log(error);
		if (error.response.status === 401) {
			localStorage.removeItem('token');
			window.location.reload();
		}
		return Promise.reject(error);
	}
);

export default axiosInstance;
