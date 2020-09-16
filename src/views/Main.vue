<template>
	<div>
		
		<keep-alive v-if="$route.meta.keepAlive">
			<router-view></router-view>
		</keep-alive>
		
		<router-view v-else></router-view>
		<div style="height: 50px;"></div>
		
		<van-tabbar style="z-index: 9999;height: 8vh;" v-model="active" route active-color="#FF748E">
			<van-tabbar-item to="/home" icon="home-o">首页</van-tabbar-item>
			<van-tabbar-item to="/classify" icon="apps-o">分类</van-tabbar-item>
			<van-tabbar-item to="/carts" icon="shopping-cart-o">购物车</van-tabbar-item>
			<van-tabbar-item to="/user" icon="user-o">我的</van-tabbar-item>
		</van-tabbar>
		
	</div>
</template>

<script>
	export default {
		data() {
			return {
				active: 0,
			};
		},
	};
</script>

<style>
</style>
