<template>
	<div>
		
		<van-button @click="toLogin" type="primary">去登陆</van-button>
		
	</div>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			toLogin(){
				this.$router.push('/login')
			}
		}
	}
</script>

<style>
</style>
