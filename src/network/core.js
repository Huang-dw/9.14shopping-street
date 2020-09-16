import axios from "axios";
import { METHOD } from "./config";
//高内聚低耦合

// 根据环境不同引入不同api地址
const { baseUrl } = require('../config/env.' + process.env.NODE_ENV);


//通过配置对象返回一个axios实例对象
const instance = axios.create({
	baseURL: baseUrl,
	timeout: 10000
})


//请求拦截
instance.interceptors.request.use(config => {
		// 成功后加载动画
		let user = JSON.parse(localStorage.getItem("vuex"));
		
		// console.log(user)
		if (!user) { //没有user就不添加token的请求头 config.headers.Authorization=null 不注释也可以
			config.headers.token = null
		} else {
			// 设置请求头（正式开发中放开一下内容）
			config.headers.token = user.token
			// if (store.state.token) {
			//   config.headers.token = store.state.token
			// }
		}
		return config
		
	}, error => {
		// 失败后执行的内容
		return Promise.reject(error)
	})

// 响应拦截
instance.interceptors.response.use(response => {
	const status = response
	// console.log(status);
	
	if (status.data.code == 400 || status.data.code == "400") {
		this.$toast('token失效，请重新登录');
		
		//清除token
		localStorage.removeItem("vuex")
		
		//跳转到登录页面
		window.location = "/login"
	}
	return response
	
}, error => {
	if (error.response) {
		// this.$message.error(error.response.data)
	} else {
		// this.$message.error('请求超时')
	}
	// 在获取错误code
	return Promise.reject(error)
})

export function request(method, url, params) {
	switch (method) {
		case METHOD.GET:
			return GET(url, params);
		case METHOD.POST:
			return POST(url, params);
		case METHOD.PATCH:
			return PATCH(url, params);
	}
}


function GET(url, params) {
	//instance.get()函数返回值是Promise对象
	return instance.get(url, params);
}

function POST(url, params) {
	return instance.post(url, params);
}

function PATCH(url, params) {
	return instance.patch(url, params);
}

