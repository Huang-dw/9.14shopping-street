<template>
	<div style="background-color: #F2F5F8;">
		
		<div class="details-back" @click="onBack">
			<van-icon name="arrow-left" />
		</div>
		
		<van-tabs v-model="active" scrollspy sticky>
			
			<van-tab title="商品">
				
				<div style="width: 100%;background-color: white;">
					<div>
						<img :src="goods.goodsLogo" width="100%">
					</div>
					
					<div style="padding: 5px;color: #222;">{{goods.goodsName}}</div>
					
					<div>
						<span style="font-size: 22px;color: #FF5777;">￥{{goods.goodsPrice}}</span>
						<span style="color: #A1A1A1;font-size: 14px;margin-left: 5px;"><s>{{goods.goodsOldPrice}}</s></span>
					</div>
					
					<div style="padding: 0 5px;">
						<div class="deta-sale">
							<div>销量{{goods.goodsBuyNum}}</div>
							<div>收藏{{goods.goodsFav}}</div>
							<div>{{goods.goodsAre}}</div>
						</div>
					</div>
					
					<div class="deta-goods2">
						<div v-for="(item,index) in goods2">
							<img :src="item.icon" width="10px">
							<span>{{item.name}}</span>
						</div>
					</div>
				</div>
				
				
				
			</van-tab>
			
			<van-tab title="评论">
				
				<!-- 评价 -->
				<div style="background-color: white;margin-top: 10px;padding: 10px;">
					
					<div>
						<div style="display: flex;align-items: center;">
							<img style="border-radius: 50%;" :src="goods3.user_img" width="42px" height="42px">
							<span style="margin-left: 10px;">{{goods3.user_name}}</span>
						</div>
						<div style="height: 50px;line-height: 50px;color: gray;font-size: 14px;">{{goods3.content}}</div>
						<div>{{goods3.audit_time}}</div>
					</div>
					
					<div style="margin-top: 30px;">
						<div style="display: flex;align-items: center;">
							<img style="border-radius: 50%;" :src="goods4.user_img" width="42px" height="42px">
							<span style="margin-left: 10px;">{{goods4.user_name}}</span>
						</div>
						<div style="height: 50px;line-height: 50px;color: gray;font-size: 14px;">{{goods4.content}}</div>
						<img :src="goods5" width="70px" height="70px">
						<div>{{goods4.audit_time}}</div>
					</div>
				</div>
				
				<div style="margin-top: 10px;background-color: white;padding: 20px 10px;">
					
					<div style="display: flex;align-items: center;">
						<img :src="goods1.shopLogo" width="45px">
						<span style="margin-left: 10px;">{{goods1.shopName}}</span>
					</div>
					
					<div style="display: flex;justify-content: space-around;">
						<div style="height: 90px;line-height: 45px;display: flex;text-align: center;width: 50%;justify-content: space-around;">
							<div>
								<div>{{goods1.sells}}</div>
								<div>总销量</div>
							</div>
							<div>
								<div>{{goods1.snum}}</div>
								<div>全部宝贝</div>
							</div>
						</div>
						
						<div style="height: 90px;line-height: 30px;width: 50%;text-align: center;">
							<div>
								<span>描述相符</span>
								<span style="margin-left: 10px;color: #5EA732;">{{goods1.shopPiont}}</span>
							</div>
							<div>
								<span>价格合理</span>
								<span style="margin-left: 10px;color: #5EA732;">{{goods1.shopPriceOk}}</span>
							</div>
							<div>
								<span>质量满意</span>
								<span style="margin-left: 10px;color: #5EA732;">{{goods1.shopQuality}}</span>
							</div>
						</div>
					</div>
					
				</div>
				
				
			</van-tab>
			
			<van-tab title="详情">
				
				<div class="deta-img" v-html="goods.goodsIntroduce">
					
				</div>
				
			</van-tab>
			
			<van-tab title="推荐">
				
				<!-- <List :classify="classify"></List> -->
				
			</van-tab>
		</van-tabs>
		<div style="height: 50px;"></div>
		
		<van-goods-action>
			<van-goods-action-icon icon="chat-o" text="客服" color="#07c160" />
			<van-goods-action-icon @click="toCarts" icon="cart-o" text="购物车" :badge="num" />
			<van-goods-action-icon icon="star" text="已收藏" color="#ff5000" />
			<van-goods-action-button @click="addCarts" type="warning" text="加入购物车" />
			<van-goods-action-button type="danger" text="立即购买" />
		</van-goods-action>
		
	</div>
</template>

<script>
	import {
		mapState,
		mapGetters,
		mapActions,
		mapMutations
	} from 'vuex'
	import qs from 'qs'
	
	import List from '@/components/List.vue'
	export default{
		components:{
			// List
		},
		data(){
			return{
				active:0,
				goods:[],
				goods2:[],
				goods1:[],
				goods3:[],
				goods4:[],
				goods5:[],
				num:0,
				classify:[]
			}
		},
		created() {
			// 分类
			this.$netClient.classify({
				params: {
					sortType:"syn",
					page: 1,
					pageSize: 10
				}
			}).then((res) => {
				// window.console.log(res.data.data)
				this.classify = res.data.data
			})
			
			// 获取购物车数量
			this.$netClient.getCart({
				params:{
					page:1,
					pageSize:10
				}
			}).then(res=>{
				this.num = res.data.data.length
			})
			
			
			let id = this.$route.query.id
			// 详情
			this.$netClient.details({
				params:{
					token:localStorage.getItem('token'),
					goodsId:id
				}
			}).then(res=> {
				window.console.log(res)
				this.goods = res.data.data[0]
				this.goods2 = res.data.data[2]
				this.goods1 = res.data.data[1]
				this.goods3 = res.data.data[3][0].comment_body
				this.goods4 = res.data.data[3][1].comment_body
				this.goods5 = res.data.data[3][1].comment_img
			})
		},
		methods:{
			...mapMutations({
				saveCart: 'saveCart'
			}),
			onBack(){
				// this.$router.push('/home')
				window.history.back()
			},
			addCarts(){ //添加购物车
				let id = this.$route.query.id
				
				this.$netClient.addCart(qs.stringify({
					product_id:id,
					product_amount:1,
					price:this.goods.goodsPrice
				})).then(res=>{
					console.log(res);
					this.$toast.success('添加购物车成功');
				})
				
				
				// 获取购物车数量
				this.$netClient.getCart({
					params:{
						page:1,
						pageSize:10
					}
				}).then(res=>{
					this.num = res.data.data.length
				})
				
			},
			toCarts(){ //跳转购物车页面
				this.$router.push('/carts')
			}
		},
		
	}
</script>

<style scoped>
	.details-back{
		position: fixed;
		top: 13px;
		left: 0;
		z-index: 9999;
	}
	.deta-sale{
		display: flex;
		justify-content: space-between;
		color: gray;
		font-size: 14px;
		height: 44px;
		line-height: 55px;
		border-bottom: 1px solid gainsboro;
	}
	
	.deta-goods2{
		display: flex;
		justify-content: space-around;
		color: 12px;
		height: 64px;
		line-height: 64px;
	}
	.deta-img{
		background-color: white;
	}
	.deta-img >>> img{
		width: 100%;
	}
</style>
