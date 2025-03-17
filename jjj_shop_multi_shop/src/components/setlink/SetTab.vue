<template>
	<el-dialog title="超链接设置" append-to-body v-model="dialogVisible" @close="dialogFormVisible"
		:close-on-click-modal="false" :close-on-press-escape="false" width="800px">
		<!--内容-->
		<el-tabs type="border-card" v-model="activeName">
			<!--页面-->
			<el-tab-pane label="页面" name="pages">
				<Pages v-if="activeName == 'pages'" @changeData="activeDataFunc"></Pages>
			</el-tab-pane>
			<!-- <el-tab-pane label="营销" name="market"><Marketing v-if="activeName == 'market'" @changeData="activeDataFunc"></Marketing></el-tab-pane> -->
			<!-- <el-tab-pane label="产品" name="product"><Product v-if="activeName == 'product'" @changeData="activeDataFunc"></Product></el-tab-pane> -->
			<el-tab-pane label="文章" name="Article">
				<Article v-if="activeName == 'Article'" @changeData="activeDataFunc"></Article>
			</el-tab-pane>
			<el-tab-pane label="自定义" name="diypage">
				<DiyPage v-if="activeName == 'diypage'" @changeData="activeDataFunc"></DiyPage>
			</el-tab-pane>
		</el-tabs>
		<template #footer>
			<div class="flex-1">
				<div v-if="activeData != null" class="d-s-s d-c tl">
					<p class="text-ellipsis setlink-set-link">
						<span>当前链接：</span>
						<span class="gray9">{{ activeData.type }}</span>
						<span class="p-0-10 gray">/</span>
						<span class="blue">{{ activeData.name }}</span>
					</p>
					<p class="text-ellipsis gray" style="font-size: 10px;">{{ activeData.url }}</p>
				</div>
				<div v-else class="tl">
					暂无
				</div>
			</div>
			<div class="setlink-footer-btn">
				<el-button size="small" @click="dialogFormVisible(false)">取 消</el-button>
				<el-button size="small" type="primary" @click="dialogFormVisible(true)">确 定</el-button>
			</div>
		</template>
	</el-dialog>
</template>

<script>
	import Pages from './part/Pages.vue';
	import Marketing from './part/Marketing.vue';
	// import Products from './part/Products.vue';
	import DiyPage from './part/DiyPage.vue';
	import Article from './part/Article.vue';
	import SmallProgram from './part/SmallProgram.vue';
	import H5 from './part/H5.vue';
	export default {
		components: {
			Pages,
			Marketing,
			// Products,
			Article,
			SmallProgram,
			H5,
			DiyPage
		},
		data() {
			return {
				/*是否显示*/
				dialogVisible: true,
				/*选中的链接*/
				activeData: null,
				activeName: 'pages'
			};
		},
		props: ['is_linkset'],
		created() {
			this.dialogVisible = this.is_linkset;
		},
		methods: {
			/*关闭弹窗*/
			dialogFormVisible(e) {
				if (e) {
					if (this.activeData.url.indexOf('giftpackage') != -1) {
						this.activeData.name = '礼包购-' + this.activeData.name;
					}
					if (this.activeData.url.indexOf('invite') != -1) {
						this.activeData.name = '邀请有礼-' + this.activeData.name;
					}
					this.$emit('closeDialog', this.activeData);
				} else {
					this.$emit('closeDialog', null);
				}
			},

			/*页面返回值*/
			activeDataFunc(e) {
				this.activeData = e;
			}
		}
	};
</script>

<style>
	.marketing-box .el-tabs__item {
		font-size: 12px;
	}

	.setlink-footer-btn {
		width: 160px;
	}

	.setlink-set-link {
		width: 500px;
	}
</style>