import { post } from '../../service/request'

const login = {
	namespaced: true,
	state: {},
	getters: {},
	mutations: {},
	actions: {
		login({ commit }, data) {
			return post('/api/login.do', data)
		},
	},
}

export default login
