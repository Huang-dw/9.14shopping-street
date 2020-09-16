<template>
	<div>
		
		<van-nav-bar
			title="新增收货地址"
			left-arrow
			@click-left="onClickLeft"
		/>
		
		<van-address-edit 
			:area-list="areaList" 
			show-postal 
			show-delete 
			show-set-default 
			show-search-result 
			:search-result="searchResult"
			:area-columns-placeholder="['请选择', '请选择', '请选择']" 
			@save="onSave" @delete="onDelete" @change-detail="onChangeDetail" />
			
	</div>
</template>

<script>
	import {
		mapState,
		mapGetters,
		mapActions,
		mapMutations
	} from 'vuex'
	import areaList from '../assets/area.js'
	export default {
		data() {
			return {
				areaList,
				searchResult: [],
			};
		},
		methods: {
			...mapMutations({
				saveArea:'saveArea'
			}),
			onClickLeft(){
				this.$router.push('/addsite')
			},
			onSave(content) {
				// console.log(content);
				this.saveArea(content)
				this.$toast('保存成功');
			},
			onDelete() {
				this.$toast('delete');
			},
			onChangeDetail(val) {
				if (val) {
					this.searchResult = [
						{
							name: '黄龙万科中心',
							address: '杭州市西湖区',
						}, 
					];
				} else {
					this.searchResult = [];
				}
			},
		},
	};
</script>

<style>
</style>
