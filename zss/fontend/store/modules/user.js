import { get } from '../../service/request'

const user = {
	namespaced: true,
	state: {},
	getters: {},
	mutations: {},
	actions: {
		getUserInfo({ commit }, data) {
			return get('/api/getUserInfo.do', data)
		},
	},
}

export default user
