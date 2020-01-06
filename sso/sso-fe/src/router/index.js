import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			redirect: { name: 'Login' },
		},
		{
			path: '/login/:service',
			name: 'Login',
			component: () => import('../pages/login'),
		},
		{
			path: '*',
			redirect: { path: '/' },
		},
	],
})
