<template>
	<div style="background-color: whitesmoke;">
		
		<a v-show="isTop" class="back-top" ref="backTop" href="#top">
			<van-icon name="back-top" />
		</a>

		<div class="home-nav">
			购物街
		</div>
		<div style="height: 98px;"></div>
		
		<!-- 搜索 -->
		<div class="home-search">
			<van-search @focus="toSearch" v-model="value" placeholder="请输入搜索关键词" />
		</div>
		
		<!-- 轮播 -->
		<Swiper :swiper="swiper"></Swiper>
		

		<!-- 宫格 -->
		<div class="home-gird">
			<div class="gird-box" v-for="(item,index) in gird" :key="index">
				<div>
					<img :src="item.sp_home_ico" width="80%">
				</div>
				<div>{{item.sp_home_title}}</div>
			</div>
		</div>
		
		<div style="margin: 10px 0;">
			<img src="../../public/img/home/recommend_bg.jpg" width="100%">
		</div>
		
		<!-- 标签页 -->
		<van-sticky :offset-top="97">
			<van-tabs class="sticky" v-model="active" @click="onTab">
				<van-tab title="流行"></van-tab>
				<van-tab title="新款"></van-tab>
				<van-tab title="精选"></van-tab>
			</van-tabs>
		</van-sticky>

		<van-list v-model="loading" 
			:finished="finished" 
			finished-text="没有更多了" 
			@load="onLoad" 
			offset="1" 
			:error.sync="error"
			error-text="请求失败，点击重新加载">

			<!-- 循环列表数据 -->
			<List :classify="classify"></List>
			
		</van-list>
		
	</div>
</template>

<script>
	import {debounce} from '@/untils/untils.js'
	import Swiper from '@/components/Swiper.vue'
	import List from '@/components/List.vue'
	export default {
		components:{
			Swiper,
			List
		},
		data() {
			return {
				swiper: [],
				gird: [],
				classify: [],
				active: 0,
				loading: false,
				finished: false,
				error: false, 
				page: 1,
				total:0,
				isTop:false,
				value:''
			}
		},
		created() {
			// 滚动条的获取
			window.addEventListener('scroll', this.handleScroll, true)
			
			// 首页
			this.$netClient.getHome({
				
			}).then((res) => {
				// window.console.log(res.data.data[0])
				this.swiper = res.data.data[1]
				this.gird = res.data.data[0]
			}).catch((err) => {
				window.console.log(err)
			})

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
		},
		methods: {
			handleScroll() {
				let scrollHeight = window.pageYOffset
				// console.log('滚动高度', window.pageYOffset)
				// console.log('距离顶部高度', this.$refs.backTop.getBoundingClientRect().top)
				if(scrollHeight > 600){
					this.isTop = true
				}else {
					this.isTop = false
				}
			},
			onTab(name, title) {
				// console.log(title);
				if (title == '流行') {
					this.$netClient.classify({
						params: {
							sortType:"syn",
							page: 1,
							pageSize: 10
						}
					}).then((res) => {
						// window.console.log(res.data.data.list)
						this.classify = res.data.data
					})
				} else if (title == '新款') {
					this.$netClient.classify({
						params: {
							sortType:"new",
							page: 1,
							pageSize: 10
						}
					}).then((res) => {
						// window.console.log(res.data.data.list)
						this.classify = res.data.data
					})
				} else if (title == '精选') {
					this.$netClient.classify({
						params: {
							sortType:"sell",
							page: 1,
							pageSize: 10
						}
					}).then((res) => {
						// window.console.log(res.data.data.list)
						this.classify = res.data.data
					})
				}
			},
			// toDetails(id) { //跳转详情页
			// 	// console.log(id);
			// 	this.$router.push({
			// 		path: '/details',
			// 		query: {
			// 			id
			// 		}
			// 	})
			// },
			toSearch(){ //跳转搜索页
				this.$router.push('/search')
			},
			loadings(){
				this.$netClient.classify({
					params: {
						page: this.page
					}
				}).then((res) => {
					// window.console.log(res.data.data)
					this.page++
					this.classify = [...this.classify,...res.data.data]
					this.loading = false
					
				})
			},
			// onLoad() { //上拉加载数据
			// 	debounce(this.loadings(),500)
			// },
			onLoad:debounce(function(){ //上拉加载数据 函数防抖
				this.loadings()
			},1000)
		},
	}
</script>

<style scoped>
	.home-nav {
		width: 100%;
		height: 44px;
		color: white;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #FF8198;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 99;
		display: flex;
		flex-direction: column;
	}
	
	.home-search{
		width: 100%;
		position: fixed;
		top: 44px;
		left: 0;
		z-index: 99;
	}

	.home-gird {
		display: flex;
		flex-wrap: wrap;
		text-align: center;
		background-color: white;
	}
	
	.gird-box{
		width: 20%;
	}

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
	.sticky{
		/* position: sticky;
		top: 44px;
		z-index: 9999; */
	}
	.back-top{
		width: 40px;
		height: 40px;
		z-index: 99;
		background-color: white;
		position: fixed;
		bottom: 10%;
		right: 5%;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 22px;
		color: red;
		box-shadow: 1px 1px 8px 2px gray;
	}
</style>
