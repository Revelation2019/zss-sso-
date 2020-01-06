import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			redirect: { name: 'Index' },
		},
		{
			path: '/index',
			name: 'Index',
			component: () => import('../index'),
			redirect: { name: 'Welcome' },
			children: [
				{
					path: '/welcome',
					name: 'Welcome',
					component: () => import('../pages/home/welcome'),
				},
			],
		},
		{
			path: '/404',
			name: '_404',
			component: () => import('../_404'),
		},
		{
			path: '*',
			redirect: { name: 'Index' },
		},
	],
})
