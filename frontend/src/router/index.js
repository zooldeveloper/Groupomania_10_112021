import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Entry from '../views/Entry'

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
	},
	{
		path: '/account',
		name: 'Account',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "account" */ '../views/Account.vue'),
	},
	{
		path: '/users',
		name: 'Users',
		component: () => import('../views/Users.vue'),
	},
	{
		path: '/notification',
		name: 'Notification',
		component: () => import('../views/Notification.vue'),
  },
	{
		path: '/profile',
		name: 'Profile',
		component: () => import('../views/Profile.vue'),
	},
	{
		path: '/entry',
		name: 'Entry',
		component: Entry,
	},
];

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
