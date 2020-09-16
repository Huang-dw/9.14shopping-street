 //定义请求方式
 export const METHOD = {
  GET:"get",
  POST:"post",
  PATCH:'patch'
}

export const PATH = {
	getHome:"/api/Home/getHomeREC",
	classify:"/api/Home/getHomeShowGoods",
	details:"/api/Goods/GetGoodsInfo",
	topSearch:"/api/Goods/getSearchHot",
	addCart:"/api/Cart/addCart",
	getCart:"/api/Cart/getCart",
	delCart:"/api/Cart/DeleteCart",
	cartNum:"/api/Cart/patchCartNum",
	FromCart:"/api/Order/getGoodsInfoFromCart",
	CartChecked:"/api/Cart/pathCartChecked",
	cretaeOrder:"/api/Order/cretaeOrder",
	verifyPayPWD:"/api/Order/verifyPayPWD",
	payOrder:"/api/Order/payOrder",
	appWebPay:"/api/Alipay/appWebPay",
	getGoods:"/api/Goods/getGoods",
	getCatsTree:"/api/Goods/getCatsTree",
}