<template>
  <div class="login-bg" :style="'background-image:url(' + enterpriseBgImg + ');'">
    <el-form :model="ruleForm" :rules="rules" ref="formRef" label-position="left" label-width="0px"
      class="demo-ruleForm login-container">
      <h3 class="title" style="margin-bottom: 20px;">{{ enterpriseName }}</h3>
      <el-form-item prop="username">
        <el-input type="text" v-model="ruleForm.username" auto-complete="off" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="ruleForm.password" auto-complete="off" placeholder="密码">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%;" @click.native.prevent="gotoLogin">
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { reactive, toRefs, defineComponent, onMounted, inject } from 'vue';
import { base } from '@/api/index.js';
import { useUserStore } from '@/store';
import { useRouter } from 'vue-router';
export default defineComponent({
	components: {},
	setup() {
    const getImgSrc = inject('$getImgSrc')
		const router = useRouter();
		const { afterLogin } = useUserStore();
		const state = reactive({
			enterpriseName:'',
			enterpriseBgImg: getImgSrc('/src/assets/img/login_bg.png'),
			formRef:null,
			ruleForm: {
				username: '',
				password: ''
			},
			rules: {
				username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
				password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
			},
		});
		onMounted(() => {
			fetchData();
      
		});
		const fetchData = async () => {
			const { data:{ settings:{ shop_bg_img,shop_name } }} = await base();
			state.enterpriseName = shop_name;
			if(shop_bg_img) state.enterpriseBgImg = shop_bg_img;
		};
		return {
			...toRefs(state),
			fetchData,
			getImgSrc,
			afterLogin,
			router,
		};
	},
	methods: {
		async gotoLogin(){
			this.formRef.validate(async (valid) => {
				if (valid) {
					await this.afterLogin(this.ruleForm);
					this.router.push('/home');
				}
			});
		},
	},
});
</script>
<style lang="scss" scoped>
.login-bg {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
}

.login-container {
  box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.1), 0 1px 0px 0 rgba(0, 0, 0, 0.04);
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  position: fixed;
  width: 350px;
  left: 50%;
  top: 50%;
  margin-left: -175px;
  margin-top: -175px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;

  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
    font-size: 16px;
  }

  .remember {
    margin: 0px 0px 35px 0px;
  }
}</style>
  