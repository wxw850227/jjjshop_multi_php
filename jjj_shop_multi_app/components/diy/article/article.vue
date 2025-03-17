<template>
	<view class="diy-article">
		<!--文章列表-->
		<view class="article-item" v-for="(item, index) in listData" :class="'show-type__'+ itemData.style.display"
			:key="index" @click="gotoPageFunc(item)">
			<!-- 有图模式 -->
			<template v-if="itemData.style.display == 10">
				<view class="picture mr15" v-if="item.image!=null&&item.image.file_path!=''">
					<image :src="item.image.file_path" mode="aspectFill"></image>
				</view>
				<view class="d-b-c d-stretch d-c flex-1">
					<view class="text-ellipsis-2 f24">
						{{ item.article_title }}
					</view>
					<view class="d-b-c gray9 f18">
						<view>
							<text class="icon iconfont icon-chakan" style="font-size: 22rpx;"></text>
							<text class="ml10">{{ item.actual_views }}</text>
						</view>
						<view><text class="icon iconfont icon-daojishi mr10"></text>{{item.create_time}}</view>
					</view>
				</view>
			</template>
			<!-- 无图模式-->
			<template v-if="itemData.style.display == 20">
				<view class="f24 text-ellipsis-2 lh200">
					{{ item.article_title }}
				</view>
			</template>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				/*数据列表*/
				listData: []
			};
		},
		props: ['itemData'],
		created() {
			this.listData = this.itemData.data;
		},
		methods: {

			/*跳转页面*/
			gotoPageFunc(e) {
				let _url = 'pages/article/detail/detail?article_id=' + e.article_id;
				this.gotoPage(_url);
			},
			add0(m) {
				return m < 10 ? '0' + m : m
			},
			format(t) {
				//shijianchuo是整数，否则要parseInt转换
				var time = new Date(t);
				var y = time.getFullYear();
				var m = time.getMonth() + 1;
				var d = time.getDate();
				return y + '-' + this.add0(m) + '-' + this.add0(d);
			}
		}
	};
</script>

<style>
	.mr15{
		margin-right: 15rpx;
	}
	.diy-article {
		background: #ffffff;
		margin: 20rpx;
		border-radius: 6rpx;
		padding: 0 30rpx;
		box-shadow: 0px 8rpx 3rpx 0px rgba(6, 0, 1, 0.03);
	}

	.diy-article .show-type__10,
	.diy-article .show-type__20 {
		display: flex;
		padding: 30rpx 0;
		border-bottom: 1rpx solid #eeeeee;
	}

	.diy-article .show-type__10:last-child,
	.diy-article .show-type__20:last-child {
		border-bottom: none;
	}

	.diy-article .show-type__10 .picture {
		width: 246rpx;
		height: 140rpx;
		border-radius: 12rpx;

	}

	.diy-article .show-type__10 .title {
		height: 80rpx;
	}

	.diy-article .show-type__10 .des {
		height: 36rpx;
	}

	.diy-article image {
		width: 100%;
		height: 100%;
		border-radius: 12rpx;
	}

	.diy-article .show-type__10 .icon.iconfont {
		font-size: 18rpx;
		color: #999999;
	}
</style>
