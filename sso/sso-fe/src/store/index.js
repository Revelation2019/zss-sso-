import Vue from 'vue'
import Vuex from 'vuex'
import _login from './modules/login'

Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		_login,
	},
})

export default store
