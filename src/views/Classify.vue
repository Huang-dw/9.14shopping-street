<template>
	<div>
		
		<van-nav-bar style="height: 8vh;" title="商品分类"/>
		
		<div style="display: flex;width: 100%;">
			
			<div style="height: 84vh;overflow-y: scroll;width: 25%;">
				<van-sidebar style="width: 100%;" v-model="activeKey">
					<van-sidebar-item @click="onCnav(item.cat_name)" v-for="(item,index) in cNav" :title="item.cat_name" />
				</van-sidebar>
			</div>
			
			<div style="width: 75%;height: 84vh;">
				<van-tabs @click="onTabs" style="width: 100%;height: 7vh;" v-model="active">
					<van-tab title="综合"></van-tab>
					<van-tab title="销量"></van-tab>
					<van-tab title="新品"></van-tab>
				</van-tabs>
				
				<div style="display: flex;flex-wrap: wrap;justify-content: space-around;background-color: whitesmoke;overflow-y: scroll;height: 77vh;">
					<div style="width: 48%;background-color: white;border-radius: 5px;margin: 5px 0;" v-for="(item,index) in rightList">
						<img style="border-radius: 5px;" :src="item.goodsLogo" width="100%">
						<div class="van-ellipsis">{{item.goodsName}}</div>
						<div style="display: flex;justify-content: space-between;">
							<span style="color: #ff5777;font-size: 14px;">￥{{item.goodsPrice}}</span>
							<span style="font-size: 14px;">
								<van-icon name="star-o" />
								{{item.goodsFav}}
							</span>
						</div>
						<div style="font-size: 14px;color: #DCDCDC;"><s>{{item.goodsOldPrice}}</s></div>
					</div>
				</div>
				
			</div>
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
	
	export default{
		data(){
			return{
				activeKey: 0,
				cNav:[],
				active: 0,
				type:'syn',
				rightList:[]
			}
		},
		created() {
			this.$netClient.getCatsTree().then(res=>{
				// console.log(res.data.data);
				this.cNav = res.data.data
			})
			
			this.$netClient.getGoods({
				params:{
					goodsName:'帆布鞋',
					page:'1',
					pageSize:'20',
					sortType:this.type
				}
			}).then(res=>{
				// console.log(res.data.data);
				this.rightList = res.data.data
			})
		},
		computed:{
			...mapState({
				cnavName:'cnavName'
			})
		},
		methods:{
			...mapMutations({
				saveCnav:'saveCnav'
			}),
			onCnav(item){ //点击侧边导航
				this.saveCnav(item)
				// console.log(item);
				this.$netClient.getGoods({
					params:{
						goodsName:item,
						page:'1',
						pageSize:'20',
						sortType:this.type
					}
				}).then(res=>{
					// console.log(res.data.data);
					this.rightList = res.data.data
				})
			},
			onTabs(name){ //点击标签页
				if(name == 0){
					this.type = 'syn'
				}else if(name == 1){
					this.type = 'sales'
				}else if(name == 2){
					this.type = 'new'
				}
				
				this.$netClient.getGoods({
					params:{
						goodsName:this.cnavName,
						page:'1',
						pageSize:'20',
						sortType:this.type
					}
				}).then(res=>{
					// console.log(res.data.data);
					this.rightList = res.data.data
				})
			}
		}
	}
</script>

<style>
</style>
