<template>
	<div>
		
		<van-nav-bar title="购物车" />
		
		<!-- 购物车商品 -->
		<div v-for="(item,index) in cart" :key="index">
			<van-checkbox-group v-model="result" @change="onChecked">
				
				<van-row>
					<van-col span="2" style="margin-top: 40px;">
						<van-checkbox @click="danCheck(item,index)" :name="item"></van-checkbox>
					</van-col>
					
					<van-col span="20">
						<van-swipe-cell >
							<van-card 
								:num="item.product_amount" 
								:price="item.price" 
								:title="item.title" 
								:thumb="item.image" >
								
								<template #num>
									<van-stepper @change="onNum(item.cart_id)" v-model="item.product_amount" />
								</template>
							</van-card>
							
							<template #right>
								<van-button @click="delGoods(item,index,item.cart_id)" square text="删除" type="danger" class="delete-button" />
							</template>
						</van-swipe-cell>
					</van-col>
				</van-row>
				
			</van-checkbox-group>
		</div>
		
		<!-- 提交订单栏 -->
		<van-submit-bar :price="total" button-text="提交订单" @submit="onSubmit">
			<van-checkbox @click="onCheckAll" v-model="checkedAll">全选</van-checkbox>
		</van-submit-bar>
		
	</div>
</template>

<script>
	import {
		mapState,
		mapGetters,
		mapActions,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				checkedAll:false,
				result:[],
				cartid:'', //删除商品id
			}
		},
		created() {
			this.mounId()
			
			this.$netClient.getCart({
				params: {
					page: 1,
					pageSize: 10
				}
			}).then(res => {
				console.log(res);
				this.saveCart(res.data.data)
			})
		},
		methods: {
			...mapMutations({
				saveCart: 'saveCart',
				delCarts:'delCarts',
				saveId:'saveId',
				delId:'delId',
				mounId:'mounId'
			}),
			delGoods(item,index,id){ //删除商品
				
				this.cartid += id + ','
				
				// console.log(this.cartid);
				this.$netClient.delCart({
					params:{
						carid:this.cartid
					}
				}).then(res=>{
					// console.log(res);
					// this.delCarts(id)
				})
			},
			onChecked(){ //点击复选框组判断是否全选
				if(this.result.length == this.cart.length){
					this.checkedAll = true
				}else{
					this.checkedAll = false
				}
			},
			danCheck(item,index){ //点击复选框
				// console.log(item);
				
				if(this.result.includes(item)){
					this.saveId(item.product_id)
				}else{
					this.delId(item.product_id)
				}
				
				this.$netClient.CartChecked({
					catId:this.goodsId
				}).then(res=>{
					// console.log(res);
				})
			},
			onCheckAll(){ //点击全选
				if(this.checkedAll){
					this.result = this.cart
				}else{
					this.result = []
				}
			},
			onNum(id){ //改变购物车数量
				// console.log(id);
				this.$netClient.cartNum({
					params:{
						catId:id,
						product_amount:1
					}
				}).then(res=>{
					// console.log(res);
				})
			},
			onSubmit(){ //提交订单
				this.$router.push({
					path:'/submit'
				})
			}
		},
		computed: {
			...mapState({
				cart: 'cart',
				
			}),
			total(){ //计算总价
				let total = 0
				this.result.map(item=>{
					total += item.price*100*item.product_amount
				})
				return total
			}
		}
	}
</script>

<style scoped>
	.delete-button {
		height: 100%;
	}
	.van-submit-bar{
		bottom: 50px;
	}
</style>
