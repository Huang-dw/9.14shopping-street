<template>
	<div>

		<van-nav-bar title="确认订单" left-arrow @click-left="onClickLeft" />
		
		<van-button v-if="isShow" @click="toAddsite" round type="danger" block>添加收货地址</van-button>
		
		
		<div v-else @click="toAddsite" class="submit-site">
			<van-icon size="42px" name="location" />
			<div>
				<div>
					<span>{{subSite.name}}</span>
					<span style="margin-left: 5px;">{{subSite.tel}}</span>
				</div>
				<div>
					{{subSite.address}}
				</div>
			</div>
		</div>
		
		<div>
			<div v-for="(item,index) in submitGoods">
				
				<div style="display: flex;align-items: center;padding: 10px 15px;">
					<img :src="item[1].shopLogo" width="25px">
					<span style="margin-left: 5px;">{{item[1].shopName}}</span>
				</div>
				
				<div style="padding: 20px 15px;display: flex;">
					<img :src="item[0].goodsLogo" width="90px">
					<div style="margin-left: 5px;display: flex;flex-direction: column;justify-content: space-around;">
						<div style="font-size: 12px;">{{item[0].goodsName}}</div>
						<div style="font-size: 12px;color: gray;">原价：{{item[0].goodsOldPrice}}</div>
						<div class="submit-th">七天退换</div>
					</div>
					<div style="display: flex;flex-direction: column;justify-content: center;">
						<div style="font-weight: 700;">￥{{item[0].goodsPrice}}</div>
						<div style="font-size: 14px;margin-left: 5px;">x{{item[2]}}</div>
					</div>
				</div>
				
				<div style="display: flex;justify-content: space-between;padding:10px 15px;">
					<div>商品小计</div>
					<div>
						￥{{total[index] | numFilter}}
					</div>
					
				</div>
				
			</div>
		</div>
		
		<div class="submit-money">
			<span style="margin-left: 10px;">应付金额：<span style="color: #ff8198;">￥{{zPrice | numFilter}}</span></span>
			<span style="margin-left: 10px;">共计：x{{zSel}}件</span>
			<button @click="onSubmit" class="money-btn">去支付</button>
		</div>
		
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
		data(){
			return{
				subSite:[],
				isShow:false,
				submitGoods:[],
				total:[],
				zPrice:0,
				zSel:0
			}
		},
		created() {
			this.subSite = this.site
			// console.log(this.subSite);
			
			// console.log(this.goodsId);
			this.$netClient.FromCart({
				params:{
					goodsid:this.goodsId
				}
			}).then(res=>{
				// console.log(res.data.data);
				this.submitGoods = res.data.data
				
				this.submitGoods.forEach(item=>{ //计算商品小计
					let price = item[0].goodsPrice*item[2]
					
					this.total.push(price)
					this.zPrice += price
					this.savePrice(price)
					
					let sel = item[2]
					this.zSel += sel
					// console.log(this.total);
				})
			})
			
		},
		filters: {
			numFilter (value) {
				return value.toFixed(2)
			}
		},
		computed:{
			...mapState({
				site:'site',
				goodsId:'goodsId'
			}),
		},
		methods: {
			...mapMutations({
				savePrice:'savePrice'
			}),
			onSubmit(){
				this.$router.push('/payment')
			},
			onClickLeft() {
				this.$router.push('/carts')
			},
			toAddsite(){
				this.$router.push('/addsite')
			}
		},
	};
</script>

<style scoped>
	.submit-site{
		display: flex;
		align-items: center;
		justify-content: space-around;
		padding: 20px;
	}
	.submit-th{
		border: 1px solid #FF8751;
		width: 60px;
		font-size: 14px;
		padding: 1px 2px;
		background-color: #FFF1EC;
		color: #FF6926;
		border-radius: 3px;
	}
	.submit-money{
		width: 100%;
		height: 52px;
		position: fixed;
		bottom: 0;
		left: 0;
		line-height: 52px;
		font-size: 14px;
		box-shadow: 0 -2px 10px #ddd;
	}
	.money-btn{
		height: 100%;
		width: 92px;
		color: white;
		background-color: #f21956;
		border: none;
		position: absolute;
		right: 0;
	}
</style>
