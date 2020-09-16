<template>
	<div>
		
		<!-- 轮播 -->
		<van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
			<van-swipe-item v-for="(item,index) in swiper" :key="index">
				<img :src="item.slide_show_imgUrl" width="100%">
			</van-swipe-item>
		</van-swipe>
		
	</div>
</template>

<script>
	export default{
		props:{
			swiper:{
				type:Array,
				default:[]
			}
		}
	}
</script>

<style>
</style>
