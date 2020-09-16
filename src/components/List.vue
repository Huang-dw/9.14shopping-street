<template>
	<div>
		
		<div class="home-class">
			<div v-for="(item,index) in classify" @click="toDetails(item.goodsId)" class="class-box">
				<img style="border-radius: 5px;" :src="item.goodsLogo" width="100%">
				
				<div class="van-ellipsis">{{item.goodsName}}</div>
				
				<div style="margin: 5px 0;display: flex;justify-content: space-between;padding: 0 10px 0 0;">
					<span style="color: #FF748E;font-size: 14px;">￥{{item.goodsPrice}}</span>
					<span style="font-size: 14px;margin-left: 10px;">
						<van-icon name="star-o" />
						{{item.goodsFav}}
					</span>
				</div>
				
				<div style="color: #DCDCDC;font-size: 14px;margin: 3px 0;padding: 0 5px;"><s>{{item.goodsOldPrice}}</s></div>
			</div>
		</div>
		
	</div>
</template>

<script>
	export default{
		props:{
			classify:{
				type:Array,
				default:[]
			}
		},
		data(){
			return{
				
			}
		},
		methods:{
			toDetails(id) { //跳转详情页
				// console.log(id);
				this.$router.push({
					path: '/details',
					query: {
						id
					}
				})
			},
		}
	}
</script>

<style scoped="scoped">
	.home-class {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		margin: 5px 0;
	}
	.class-box {
		width: 48%;
		background-color: white;
		margin: 5px 0;
	}
</style>
