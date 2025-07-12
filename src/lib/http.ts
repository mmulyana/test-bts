import axios from 'axios'
import Cookies from 'js-cookie'

export const CookieKeys = {
	AuthToken: 'authToken',
}

const http = axios.create({
	timeout: 30000,
	headers: {
		Accept: 'application/json',
	},
})

http.interceptors.request.use(
	(config: any) => {
		const token = Cookies.get(CookieKeys.AuthToken)

		config.headers = {
			...config.headers,
			Authorization: `Bearer ${token || ''}`,
		}

		if (config.data && config.data instanceof FormData) {
			config.headers['Content-Type'] = 'multipart/form-data'
		} else {
			config.headers['Content-Type'] = 'application/json'
		}

		return config
	},
	(error) => Promise.reject(error)
)

export default http
