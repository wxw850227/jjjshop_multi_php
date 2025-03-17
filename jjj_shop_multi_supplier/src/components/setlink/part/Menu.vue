<template>
  <el-select
    v-model="activePage"
    placeholder="请选择"
    class="percent-w100"
    @change="changeFunc"
    value-key="url"
  >
    <el-option
      v-for="item in pages"
      :key="item.url"
      :value-key="item.name"
      :label="item.name"
      :value="item"
    ></el-option>
  </el-select>
</template>

<script>
export default {
	data() {
		return {
			/*页面数据*/
			pages: [
				{
					url: '/pages/user/address/address',
					name: '收货地址',
					type: '菜单',
				},
				{
					url: '/pages/coupon/coupon',
					name: '领券中心',
					type: '菜单',
				},
				{
					url: '/pages/user/my-coupon/my-coupon',
					name: '我的优惠券',
					type: '菜单',
				},
				{
					url: '/pages/agent/index/index',
					name: '分销中心',
					type: '菜单',
				},
				{
					url: '/pages/user/my-bargain/my-bargain',
					name: '我的砍价',
					type: '菜单',
				},
				{
					url: '/pages/order/assemble-order',
					name: '我的拼团',
					type: '菜单',
				},
				{
					url: '/pages/shop/index',
					name: '商户管理',
					type: '菜单',
				},
				{
					url: '/pages/user/my_attention/my_attention',
					name: '我的收藏',
					type: '菜单',
				},
				{
					url: '/pages/user/my_collect/my_collect',
					name: '我的关注',
					type: '菜单',
				},
				{
					url: '/pages/plus/signin/signin',
					name: '签到有礼',
					type: '菜单',
				},
				{
					url: '/pages/plus/task/index',
					name: '任务中心',
					type: '菜单',
				},
				{
					url: '/pages/user/set/set',
					name: '设置',
					type: '菜单',
				},
				{
					url: 'scanQrcode',
					name: '扫一扫',
					type: '菜单',
				},
			],
			/*选中的值*/
			activePage: '收货地址',
		};
	},
	created() {
		/*初始化*/
		this.changeFunc(this.pages[0]);
	},
	methods: {
		/*选中的值*/
		changeFunc(e) {
			this.$emit('changeData', e);
		},
	},
};
</script>

<style></style>
