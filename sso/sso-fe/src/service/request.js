import axios from 'axios'
import qs from 'qs'
// eslint-disable-next-line no-undef
const Message = ELEMENT.Message
const baseUrl = 'http://sso.zuel.com:8888'

// 创建axios实例
const service = axios.create({
	baseURL: baseUrl,
	timeout: 4500000,
	withCredentials: true,
})

service.interceptors.request.use(
	config => {
		config.headers['Content-Type'] = 'application/json'
		return config
	},
	error => {
		console.log(error)
		Promise.reject(error)
	}
)

service.interceptors.response.use(
	response => {
		var res = response.data
		if (!res.success) {
			if (res.msg !== undefined) {
				Message({
					message: res.msg,
					type: 'error',
					duration: 5 * 1000,
				})
			}
			return Promise.reject(res)
		} else {
			return res
		}
	},
	error => {
		console.log('error---------->' + error)
		Promise.reject(error)
	}
)

export const post = (url, data) => {
	return service({
		url,
		method: 'post',
		data: qs.stringify(data),
		headers: {
			'Content-Type': 'application/json',
		},
	})
}

export const get = (url, params) => {
	return service({
		url,
		method: 'get',
		params,
	})
}

export default service
