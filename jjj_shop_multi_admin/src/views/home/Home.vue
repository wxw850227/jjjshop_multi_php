<template>
	<div class="home-container">
		<h1 class="home-title">
			Saas运营管理系统
		</h1>
		<p class="home-des">
			尊敬的 {{username}} 用户，欢迎使用商城管理员系统
		</p>
	</div>
</template>

<script>
import {
	reactive,
	toRefs,
	defineComponent
} from 'vue';
import {
	useUserStore
} from '@/store';
export default defineComponent({
	setup() {
		const {
			userInfo
		} = useUserStore();
		const state = reactive({
			username: ''
		});
			/*获取登录用户名*/
		state.username = userInfo.userName || '';
		return {
			...toRefs(state),
			userInfo
		};
	},
});
</script>

<style lang="scss">
	.home-container {
		height: calc(100vh - 120px);
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
		align-content: center;
		flex-direction: column;
		// background: url(/static/imgs/home_bg.jpg) center center no-repeat;
	}

	.home-container .home-title {
		padding: 20px;
		text-align: center;
		white-space: nowrap;
		text-align: center;
		font-size: 40px;
		color: #409EFF;
	}

	.home-container .home-des {
		color: #888888;
	}

	.home-index {
		display: -ms-flexbox;
		display: flex;
		-webkit-box-orient: horizontal;
		-webkit-box-direction: normal;
		-ms-flex-direction: row;
		flex-direction: row;
		-webkit-box-pack: justify;
		-ms-flex-pack: justify;
		justify-content: space-between;
		min-width: 1000px;
		overflow-x: auto;
	}
</style>