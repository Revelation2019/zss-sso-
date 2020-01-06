import Vue from 'vue'
import Vuex from 'vuex'
import _user from './modules/user'
Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		_user,
	},
})

export default store
