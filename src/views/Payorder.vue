<template>
	<div>

		<van-nav-bar title="支付完成" left-arrow @click-left="onClickLeft" />
		
		<div class="payorder-down">
			<img src="../assets/download2.png" width="100px">
			
			<div style="padding: 30px 0;">
				<div style="font-weight: 700;">支付成功</div>
				<div>订单支付成功 请确认</div>
			</div>
		</div>
		
		<div style="padding: 0 20px;">
			<van-button type="info" block>查看订单</van-button>
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
	import qs from 'qs'
	
	export default {
		created() {
			
		},
		computed:{
			
		},
		methods: {
			onClickLeft() {
				this.$router.push('/carts')
			},
		},
	};
</script>

<style scoped="scoped">
	.payorder-down{
		text-align: center;
		padding: 50px 0;
	}
</style>
