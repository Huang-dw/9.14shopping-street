<template>
	<div>
		
		<van-sticky>
			<!-- 导航栏 -->
			<div class="search-nav">
				<div @click="onBack"><van-icon name="arrow-left" /></div>
				
				<div style="width: 60%;text-align: center;">商品搜索</div>
				
				<div></div>
			</div>
			
			<!-- 搜索框 -->
			<van-search @focus="onFocus" @search="onSearch" show-action v-model.trim="key" placeholder="请输入商品关键词">
				<template #action>
					<div @click="onSearch">搜索</div>
				</template>
			</van-search>
		</van-sticky>
		
		<div v-if="isShow">
			<van-divider content-position="left">全网热搜</van-divider>
			<van-tag @click="onTag(item)" class="search-tag" v-for="(item,index) in tag" plain type="warning">{{item}}</van-tag>
			
			<div v-show="isSearch">
				<van-divider
				  :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
				>
					搜索历史
				</van-divider>
				
				<!-- 搜索历史 -->
				<van-cell-group >
					<van-cell @click="onTag(item)" v-for="(item,index) in searchHistory" :title="item">
						<template #extra>
							<van-icon @click="onDel(index)" name="close" />
						</template>
					</van-cell>
				</van-cell-group>
				
				<!-- 清空搜索历史 -->
				<div style="text-align: center;">
					<van-button @click="onClear" plain hairline type="info">清空历史记录</van-button>
				</div>
			</div>
		</div>
		
		
		<!-- 商品列表部分 -->
		<div v-else style="background-color: whitesmoke;">
			<van-sticky :offset-top="98">
				<van-tabs @click="onTabs" v-model="active">
					<van-tab title="综合"></van-tab>
					<van-tab title="销量"></van-tab>
					<van-tab title="新品"></van-tab>
					<van-tab title="价格"></van-tab>
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
				<List :classify="goodsList"></List>
				
			</van-list>
			<!-- 列表 -->
			
		</div>
		
		
	</div>
</template>

<script>
	import {debounce,throttle} from '@/untils/untils.js'
	import List from '@/components/List.vue'
	export default{
		components:{
			List
		},
		data(){
			return{
				key:'',
				tag:[],
				searchHistory:[], //搜索历史
				isShow:true,
				isSearch:false,
				goodsList:[], //搜索出来的商品信息
				active: 0,
				type:'syn',
				loading: false,
				finished: false,
				error: false, 
				page:1
			}
		},
		created() {
			this.$netClient.topSearch().then(res=>{
				// console.log(res.data.data);
				this.tag = res.data.data
			})
			
			// 初始化
			let searchHistory = localStorage.searchHistory
			if(searchHistory){
				this.searchHistory = JSON.parse(searchHistory)
			}
		},
		mounted() {
			this.isSearchHistory()
		},
		methods:{
			onBack(){ //返回
				this.$router.push('/home')
			},
			onTag(item){
				// console.log(item);
				this.key = item
				this.getGoods()
			},
			onTabs(name){ //点击标签栏切换类型
				// console.log(name);
				
				if(name == 0){
					this.type = 'syn'
				}else if(name == 1){
					this.type = 'sales'
				}else if(name == 2){
					this.type = 'new'
				}else if(name == 3){
					this.type = 'price'
				}
				this.getGoods()
			},
			// onSearch(){ //确定搜索
			// 	throttle(this.getGoods(),3000)
			// },
			onSearch:throttle(function(){ //确定搜索 函数节流
				this.getGoods()
			},3000),
			getGoods(){ //封装搜索接口方法
				if(this.key == ''){
					this.$toast.fail('商品关键字不能为空！');
					return
				}
				
				this.$netClient.getGoods({
					params:{
						goodsName:this.key,
						page:'1',
						pageSize:'20',
						sortType:this.type
					}
				}).then(res=>{
					console.log(res.data.data);
					// console.log(throttle);
					this.goodsList = res.data.data
				})
				
				// 不能添加相同搜索记录
				if(!this.searchHistory.includes(this.key.trim())){
					this.searchHistory.push(this.key.trim())
					localStorage.searchHistory = JSON.stringify(this.searchHistory)
				}
				
				this.isShow = false
			},
			onFocus(){ //获取焦点时触发
				this.isShow = true
				this.isSearchHistory()
				
			},
			isSearchHistory(){ //显示或隐藏搜索历史
				if(this.searchHistory.length >= 1){
					this.isSearch = true
				}else{
					this.isSearch = false
				}
			},
			onDel(index){
				this.searchHistory.splice(index,1)
				localStorage.searchHistory = JSON.stringify(this.searchHistory)
			},
			onClear(){ //清空搜索历史
				this.isSearchHistory()
				
				this.$dialog.confirm({
					title: '确定要清空搜索历史吗？'
				})
				.then(() => {
					this.isSearch = false
					this.searchHistory = []
					localStorage.searchHistory = JSON.stringify(this.searchHistory)
				})
				.catch(() => {
					// on cancel
				});
			},
			onLoad() { //上拉加载数据
				this.$netClient.getGoods({
					params:{
						goodsName:this.key,
						page:this.page,
						pageSize:'20',
						sortType:this.type
					}
				}).then(res=>{
					// console.log(res.data.data);
					this.page++
					this.goodsList = [...this.goodsList,...res.data.data]
					this.loading = false
				})
				
			},
		}
	}
</script>

<style scoped>
	.search-nav{
		width: 100%;
		height: 44px;
		display: flex;
		justify-content: space-around;
		align-items: center;
		background-color: white;
		border-bottom: 1px solid whitesmoke;
	}
	.search-tag{
		margin: 5px;
		color: gray;
		padding: 5px 8px;
	}
	.search-list{
		position: sticky;
		top: 100px;
	}
</style>
