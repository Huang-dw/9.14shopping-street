import {
	request
} from "./core";

import {
	METHOD,
	PATH
} from "./config";

const netClient = {
	//首页数据
	getHome(params) {
		return request(METHOD.GET, PATH.getHome, params)
	},
	//分类数据
	classify(params) {
		return request(METHOD.GET, PATH.classify, params)
	},
	//详情数据
	details(params) {
		return request(METHOD.GET, PATH.details, params)
	},
	//热搜数据
	topSearch(params) {
		return request(METHOD.GET, PATH.topSearch, params)
	},
	//添加购物车
	addCart(params) {
		return request(METHOD.POST, PATH.addCart, params)
	},
	//获取购物车数据
	getCart(params) {
		return request(METHOD.GET, PATH.getCart, params)
	},
	//删除购物车数据
	delCart(params) {
		return request(METHOD.PATCH, PATH.delCart, params)
	},
	//修改购物车数量
	cartNum(params) {
		return request(METHOD.PATCH, PATH.cartNum, params)
	},
	//从购物车中进行下单操作时
	FromCart(params) {
		return request(METHOD.GET, PATH.FromCart, params)
	},
	//从购物车中进行下单操作时
	CartChecked(params) {
		return request(METHOD.PATCH, PATH.CartChecked, params)
	},
	//创建订单
	cretaeOrder(params) {
		return request(METHOD.POST, PATH.cretaeOrder, params)
	},
	//验证支付密码
	verifyPayPWD(params) {
		return request(METHOD.POST, PATH.verifyPayPWD, params)
	},
	//进行订单的支付（余额）
	payOrder(params) {
		return request(METHOD.POST, PATH.payOrder, params)
	},
	//手机网页支付
	appWebPay(params) {
		return request(METHOD.POST, PATH.appWebPay, params)
	},
	//获取商品信息（可分页）搜索
	getGoods(params) {
		return request(METHOD.GET, PATH.getGoods, params)
	},
	//获取分类列表（三级分类信息）
	getCatsTree(params) {
		return request(METHOD.GET, PATH.getCatsTree, params)
	},
}

export default netClient;
