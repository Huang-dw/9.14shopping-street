import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		token:'',
		cart:[],
		site:[],
		areaList:[],
		goodsId:'',
		zPrice:'',
		coding:'',
		cnavName:''
	},
	mutations: {
		setToken(state,val){ //获取token
			state.token = val
		},
		saveCnav(state,val){ //保存侧边导航名称
			state.cnavName = val
		},
		saveCoding(state,val){ //保存订单编码
			state.coding = val
		},
		saveSite(state,val){ //保存购物车数据
			state.site = val
		},
		savePrice(state,val){ //保存总价
			state.zPrice = val
		},
		saveArea(state,val){
			state.areaList.push(val)
		},
		mounId(state,val){ //初始化id
			state.goodsId = ''
		},
		saveId(state,val){ //保存id
		
			if(!state.goodsId.includes(val)){
				state.goodsId += val + ' '
			}
			
		},
		delId(state,val){ //删除id
			state.goodsId = state.goodsId.replace(val,'')
		},
		saveCart(state,val){
			state.cart= val
			let list = state.cart
			if(list[list.length-1]&&list.length!=0){
				
			}else{
				if(list.length==0){
					
				}else{
					list.pop()
				}
			}
			state.cart = list
			
			
			// state.cart.map((item,index)=>{
			// 	if(item==null){
			// 		state.cart.splice(index,1)
			// 	}
			// })
		},
		delCarts(state,val){ //删除购物车商品
			// state.cart.splice(val,1)
		}
	},
	actions: {
	},
	modules: {
	},
	plugins:[createPersistedState({
		storage: window.localStorage
	})] //会自动保存创建的状态。刷新还在
})
