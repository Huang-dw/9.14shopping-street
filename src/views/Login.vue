<template>
	<div>
		
		<div class="user-top">
			<button :class="{'active':this.isShow}" @click="login">登录</button>
			
			<button :class="{'active':!this.isShow}" @click="register">注册</button>
		</div>
		
		<!-- 登录 -->
		<div class="user-login" v-if="isShow">
			
			<!-- 账号 -->
			<div style="height: 80px;line-height: 80px;">账号</div>
			<el-form :model="regName" ref="regName"  class="demo-ruleForm">
				<el-form-item
					prop="text"
					:rules="[
						{ required: true, message: '账号不能为空'}
					]"
				>
					<el-input type="text" placeholder="请输入用户名" v-model="regName.text" autocomplete="off" clearable></el-input>
				</el-form-item>
			</el-form>
			
			
			<!-- 密码 -->
			<div style="height: 80px;line-height: 80px;">密码</div>
			<el-form :model="regPass" ref="regPass"  class="demo-ruleForm">
				<el-form-item
					prop="text"
					:rules="[
						{ required: true, message: '密码不能为空'}
					]"
				>
					<el-input type="text" placeholder="请输入密码" v-model="regPass.text" autocomplete="off" show-password></el-input>
				</el-form-item>
			</el-form>
			
			<!-- 记住密码 -->
			<div style="display: flex;align-items: center;height: 80px;">
				<van-checkbox v-model="checked" shape="square">记住密码</van-checkbox>
			</div>
			
			<!-- 点击登录 -->
			<van-button @click="onLogin" type="info" block>登录</van-button>
			
		</div>
		
		<!-- 注册 -->
		<div class="user-login" v-else>
			
			<!-- 手机号码 -->
			<div style="height: 80px;line-height: 80px;">手机号码</div>
			<el-form :model="regTel" ref="regTel"  class="demo-ruleForm">
				<el-form-item
					prop="text"
					:rules="[
						{ required: true, message: '手机号不能为空'}
					]"
				>
					<el-input @blur="varifyTel" type="text" placeholder="注册手机为找回密码的唯一凭证" v-model="regTel.text" autocomplete="off" clearable></el-input>
				</el-form-item>
			</el-form>
			
			<!-- 登录名 -->
			<div style="height: 80px;line-height: 80px;">登录名</div>
			<el-form :model="regName" ref="regName"  class="demo-ruleForm">
				<el-form-item
					prop="text"
					:rules="[
						{ required: true, message: '用户名不能为空'}
					]"
				>
					<el-input @blur="varifyUser" type="text" placeholder="中/英文,均不可超过12个字符" v-model="regName.text" autocomplete="off" clearable></el-input>
				</el-form-item>
			</el-form>
			
			<!-- 密码 -->
			<div style="height: 80px;line-height: 80px;">密码</div>
			<el-form :model="regPass" ref="regPass"  class="demo-ruleForm">
				<el-form-item
					prop="text"
					:rules="[
						{ required: true, message: '密码不能为空'}
					]"
				>
					<el-input type="text" placeholder="3-18位英文/数字/符号,区分大小写" v-model="regPass.text" autocomplete="off" show-password></el-input>
				</el-form-item>
			</el-form>
			
			
			<!-- 验证码 -->
			<div style="height: 80px;line-height: 80px;">短信验证码</div>
			<el-form :model="regCode" ref="regCode" class="demo-ruleForm">
				<el-form-item
					prop="text"
					:rules="[
						{ required: true, message: '验证码不能为空'}
					]"
				>
					
					<el-input style="width: 50%;" type="text" placeholder="请输入验证码" v-model="regCode.text" autocomplete="off" clearable></el-input>
					<el-button style="margin-left: 5px;" @click="getIphone" type="primary">发送验证码</el-button>
				</el-form-item>
			</el-form>
			
			<!-- 点击注册 -->
			<van-button @click="onRegister" style="margin-top: 20px;" type="info" block>注册</van-button>
			
		</div>
		
	</div>
</template>

<script>
	import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
	import md5 from 'js-md5'
	import qs from 'qs'
	export default{
		data(){
			return{
				regMsg:'',//收到的验证码
				checked:false,
				isShow:true,
				regTel:{ //注册手机号
					text:''
				},
				regName:{ //注册用户名
					text:''
				},
				regPass:{ //注册密码
					text:''
				},
				regCode:{ //填写的验证码
					text:''
				},
				tel:'',//手机号是否可用
				user:'',//用户名是否可用
				
			}
		},
		
		computed:{
			...mapState({
				token:"token"
			})
		},
		methods:{
			...mapMutations({
				setToken:"setToken"
			}),
			login(){
				this.isShow = true
			},
			register(){
				this.isShow = false
			},
			varifyTel(){ //手机号是否可用
				this.$axios.get(`http://www.hj0819.top:44369/api/Verify/GetPhone`,{
					params:{
						phone:this.regTel.text
					}
				}).then(res=>{
					// console.log(res);
					this.tel = res.data.code
				})
			},
			varifyUser(){ //用户名是否可用
				this.$axios.get(`http://www.hj0819.top:44369/api/Verify/LoginName`,{
					params:{
						LoginName:this.regName.text
					}
				}).then(res=>{
					// console.log(res);
					this.user = res.data.code
				})
			},
			getIphone(){ //获取验证码
				
				if(this.tel == 200 && this.user == 404){
					this.$axios.get(`http://www.hj0819.top:44369/api/SMSCode/GetCode?phone=${this.regTel.text}&codeType=0`).then(res=>{
						// console.log(res);
						
						this.regMsg = res.data.msg
					})
				}
				if(this.tel == 204){
					console.log("该手机号已被注册");
					this.$toast('该手机号已被注册');
				}else if(this.user == 200){
					console.log("用户名已存在");
					this.$toast('用户名已存在');
				}
			},
			onRegister(){ //点击注册
				// console.log('填写的验证码:'+this.regCode.text,'收到的验证码:'+this.regMsg);
				// if(this.regCode.text == this.regMsg){
					let params = {
						LoginName:this.regName.text,
						LoginPassword:this.regPass.text,
						phone:this.regTel.text
					}
					params.LoginPassword = md5(params.LoginPassword)
					this.$axios.post(`http://www.hj0819.top:44369/api/LoginPage/AddLogin`,
						qs.stringify(params)
					).then(res=>{
						// console.log(res);
						if(res.data.code == 201){
							this.$toast.success('注册成功');
							setTimeout(()=>{
								this.isShow = true
							},1000)
						}
						
					})
				// }
			},
			onLogin(){ //点击登录
				let params = {
					LoginName:this.regName.text,
					LoginPassword:this.regPass.text,
					isPassing:'yes'
				}
				params.LoginPassword = md5(params.LoginPassword)
				this.$axios.post(`http://www.hj0819.top:44369/api/LoginPage/Login`,
					qs.stringify(params)
				).then(res=>{
					console.log(res);
					if(res.data.code == 404){
						this.$toast.fail('用户名或密码错误');
					}
					this.setToken(res.data.tnToken.tokenStr)
					
					this.$toast.success('登陆成功');
					setTimeout(()=>{
						this.$router.push('/home')
					},1000)
				})
			}
		}
	}
</script>

<style scoped>
	.user-top{
		width: 100%;
	}
	.user-top button{
		width: 50%;
		height: 60px;
		border: none;
	}
	.user-login{
		padding: 20px 40px;
	}
	.active{
		background-color: white;
	}
</style>
