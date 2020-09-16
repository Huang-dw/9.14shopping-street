import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'main',
		redirect:'/home',
		component: () => import('@/views/Main'),
		meta:{
			keepAlive:true
		},
		children:[
			{
				path: '/home',
				name: 'home',
				component: () => import('@/views/Home'),
				meta:{
					keepAlive:true
				},
			},
			{
				path: '/classify',
				name: 'classify',
				component: () => import('@/views/Classify'),
				meta:{
					keepAlive:true
				},
			},
			{
				path: '/carts',
				name: 'carts',
				component: () => import('@/views/Carts'),
				meta:{
					keepAlive:false
				},
			},
			{
				path: '/user',
				name: 'user',
				component: () => import('@/views/User'),
				meta:{
					keepAlive:false
				},
			},
		]
	},
	{
		path: '/details',
		name: 'details',
		component: () => import('@/views/Details'),
		meta:{
			keepAlive:false
		},
	},
	{
		path: '/search',
		name: 'search',
		component: () => import('@/views/Search'),
		meta:{
			keepAlive:false
		},
	},
	{
		path: '/login',
		name: 'login',
		component: () => import('@/views/Login'),
		meta:{
			keepAlive:false
		},
	},
	{
		path: '/submit',
		name: 'submit',
		component: () => import('@/views/Submit'),
		meta:{
			keepAlive:false
		},
	},
	{
		path: '/addsite',
		name: 'addsite',
		component: () => import('@/views/Addsite'),
		meta:{
			keepAlive:false
		},
	},
	{
		path: '/newsite',
		name: 'newsite',
		component: () => import('@/views/Newsite'),
		meta:{
			keepAlive:false
		},
	},
	{
		path: '/payment',
		name: 'payment',
		component: () => import('@/views/Payment'),
		meta:{
			keepAlive:false
		},
	},
	{
		path: '/payorder',
		name: 'payorder',
		component: () => import('@/views/Payorder'),
		meta:{
			keepAlive:false
		},
	},
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
