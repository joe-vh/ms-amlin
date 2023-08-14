import axios, {AxiosInstance, AxiosResponse} from 'axios'
import jwtDecode from 'jwt-decode'
import {User} from './store/user/User';

interface IHttpClient {
	axiosInstance: AxiosInstance;
	getToken: Function;
	setToken: Function;
	signUp: Function;
	logIn: Function;
	logOut: Function;
	getCurrentUser: Function;
}

// instantiate axios
class HttpClient implements IHttpClient {

	constructor() {
		// During initial app load attempt to set a localStorage stored token
		// as a default header for all api requests.
		this.axiosInstance.defaults.headers.common.token = this.getToken()

	}

	axiosInstance = axios.create();
	getToken() {
		return localStorage.getItem('token')
	}

	setToken(token: string) {
		localStorage.setItem('token', token)
		return token
	}

	getCurrentUser() {
		const token = this.getToken()
		if(token) return jwtDecode(token)
		return null
	}

	logIn(credentials: User) {
		return this.axiosInstance({ method: 'post', url: `${process.env.REACT_APP_SERVER_URL}/api/users/authenticate`, data: credentials })
			.then((serverResponse: AxiosResponse) => {
				const token = serverResponse.data.token
				if (token) {
					// sets token as an included header for all subsequent api requests
					this.axiosInstance.defaults.headers.common.token = this.setToken(token)
					return jwtDecode(token)
				} else {
					throw new Error('No token received.');
				}
			})
	}

	// login and signUp functions could be combined into one since the only difference is the url we're sending a request to..
	signUp(userInfo: User) {
		return this.axiosInstance({ method: 'post', url: `${process.env.REACT_APP_SERVER_URL}/api/users`, data: userInfo})
			.then((serverResponse: AxiosResponse) => {
				const token = serverResponse.data.token
				if(token) {
					// sets token as an included header for all subsequent api requests
					this.axiosInstance.defaults.headers.common.token = this.setToken(token)
					return jwtDecode(token)
				} else {
					throw new Error('No token received.');
				}
			})
	}

	logOut() {
		localStorage.removeItem('token')
		delete this.axiosInstance.defaults.headers.common.token
	}
}



const httpClient = new HttpClient()
export default httpClient