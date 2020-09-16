<template>
	<div>

		<van-nav-bar title="更换收货地址" right-text="新增" left-arrow @click-left="onClickLeft" @click-right="onClickRight" />


		<van-address-list v-model="chosenAddressId" :list="list" 
		 default-tag-text="默认" add-button-text="选择该地址" 
		 @add="onAdd" @edit="onEdit" @click-item="onClick_item" />

	</div>
</template>

<script>
	import {
		mapState,
		mapGetters,
		mapActions,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				chosenAddressId: '1',
				list: [
					{
						id: '1',
						name: '张三',
						tel: '13000000000',
						address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
						isDefault: true,
					},
					{
						id: '2',
						name: '李四',
						tel: '1310000000',
						address: '浙江省杭州市拱墅区莫干山路 50 号',
					},
				],
				id:'3'
			};
		},
		mounted() {
			this.areaList.forEach((item,index)=>{
				this.list.push({
					id:this.id++,
					name:item.name,
					tel:item.tel,
					address:item.province + item.city + item.county + item.addressDetail
				})
			})
			// console.log(this.areaList);
		},
		computed:{
			...mapState({
				areaList:'areaList'
			})
		},
		methods: {
			...mapMutations({
				saveSite:'saveSite'
			}),
			onClick_item(item){
				// console.log(item);
				this.saveSite(item)
			},
			onAdd() { //选择该地址
				this.$router.push('/submit')
				this.$toast('选择该地址');
			},
			onEdit(item, index) { //编辑地址
				this.$toast('编辑地址:' + index);
			},
			onClickLeft() { //点击返回
				this.$router.push('/submit')
			},
			onClickRight() { //点击新增
				this.$router.push('/newsite')
			},
		},
	};
</script>

<style>
</style>
