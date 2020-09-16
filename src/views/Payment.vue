<template>
	<div>

		<van-nav-bar 
			title="请选择支付方式" 
			left-arrow 
			@click-left="onClickLeft" />
		
		<!-- 支付方式 -->
		<van-radio-group v-model="radio">
			<van-cell-group>
				<van-cell center title="支付宝支付" >
					<template #icon>
						<img src="../assets/download.png" width="40px">
					</template>
					
					<template #extra>
						<van-radio name="1"></van-radio>
					</template>
				</van-cell>
				
				<van-cell center title="微信支付" >
					<template #icon>
						<img src="../assets/data_image.png" width="40px">
					</template>
					
					<template #extra>
						<van-radio name="2"></van-radio>
					</template>
				</van-cell>
				
				<van-cell center title="余额支付" >
					<template #icon>
						<img src="../assets/data_image1.png" width="40px">
					</template>
					
					<template #extra>
						<van-radio name="3"></van-radio>
					</template>
				</van-cell>
			</van-cell-group>
		</van-radio-group>
		
		<!-- 确认支付按钮 -->
		<div class="payment-button">
			<van-button @click="onPayment" type="info" size="large">确认支付</van-button>
		</div>
		
		
		<van-popup style="background-color: whitesmoke;" v-model="isShow" position="bottom" :style="{ height: '60%' }">
			<!-- 密码输入框 -->
			<van-password-input
			  style="margin-top: 15px;"
			  :value="value"
			  info="密码为 6 位数字"
			  :focused="showKeyboard"
			  @focus="showKeyboard = true"
			/>
			<!-- 数字键盘 -->
			<van-number-keyboard
			  :show="showKeyboard"
			  @input="onInput"
			  @delete="onDelete"
			  @blur="showKeyboard = false"
			/>
		</van-popup>
		
		
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
	import md5 from 'js-md5'
	
	export default {
		data(){
			return{
				radio: '3',
				value: '',
				showKeyboard: false,
				isShow:false,
				passKey:'',
			}
		},
		created() {
			this.$netClient.cretaeOrder(
				qs.stringify({
					price: this.zPrice,
					consignee_addr: this.site.name + ',' + this.site.tel + ',' + this.site.address,
					goodsId: this.goodsId,
					isFcart:true
				})
			).then(res=>{
				console.log(res);
				this.saveCoding(res.data.data[0].orderNumber)
			})
		},
		computed:{
			...mapState({
				zPrice:'zPrice',
				site:'site',
				goodsId:'goodsId',
				coding:'coding'
			}),
		},
		methods: {
			...mapMutations({
				saveCoding:'saveCoding'
			}),
			onPayment(){ //点击确认支付
				this.isShow = true
				
				if(this.radio == 1){ //支付宝支付
					this.isShow = false
					
					this.$netClient.appWebPay(
						qs.stringify({
							OutTradeNo:this.coding,
							Subject:'支付宝支付',
							ProductCode:'QUICK_WAP_WAY',
							TotalAmount:this.zPrice
						})
					).then(res=>{
						console.log(res);
						if(res.data.code == 201){
							let form = res.data.data
							const div = document.createElement("div")
							div.innerHTML = form
							document.body.appendChild(div)
							document.forms[0].submit()
						}else{
							return alert(res.data.msg)
						}
					})
				}
			},
			onClickLeft() {
				this.$router.push('/submit')
			},
			onInput(key) { //输入密码时触发
				this.value = (this.value + key).slice(0, 6);
				// console.log(key);
				this.passKey += key
				// console.log(this.passKey);
				
				if(this.radio == 3){ //余额支付
					if(this.passKey.length == 6){
						this.$netClient.verifyPayPWD(
							qs.stringify({
								paypwd:md5(this.passKey)
							})
						).then(res=>{
							console.log(res);
							
							if(res.data.msg == "支付密码错误"){
								this.$notify({ type: 'warning', message: '支付密码错误' });
								this.passKey = ''
								this.value = ''
							}else{
								this.$router.push('/payorder')
								
								this.$netClient.payOrder(
									qs.stringify({
										orderNum:this.coding
									})
								).then(res=>{
									console.log(res);
								})
							}
						})
					}
				}
				
			},
			onDelete() {
				this.value = this.value.slice(0, this.value.length - 1);
				this.passKey = ''
			},
		},
	};
</script>

<style scoped="scoped">
	.payment-button{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
	}
</style>
