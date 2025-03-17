<template>
	<!--倒计时-->
	<view class="countdown" :style="'color:'+color" :class="activeName">
		<template v-if="config && config.type == null">
			{{title}}<text class="daybox" :style="'background-color: '+back_color+';color:'+cut_color">{{ day }}天</text>
			<text class="numbox">{{ hour }}:{{ minute }}:{{ second }}</text>
		</template>
		<template v-if="config && config.type === 'text'">
			{{ parseInt(day * 24) + parseInt(hour) }}:{{ minute }}:{{ second }}
		</template>
		<template v-if="config && config.type === 'preview'">
			{{title}}<text class="daybox" :style="'background-color: '+back_color+';color:'+cut_color">{{ day }}天</text>
			<text class="box" :style="'background-color: '+back_color+';color:'+cut_color">{{ hour }}</text>
			<text class="p-0-10" :style="'color:'+color">:</text>
			<text class="box" :style="'background-color: '+back_color+';color:'+cut_color">{{ minute }}</text>
			<text class="p-0-10" :style="'color:'+color">:</text>
			<text class="box" :style="'background-color: '+back_color+';color:'+cut_color">{{ second }}</text>
			<text class="p-0-10" :style="'color:'+color"></text>
		</template>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				/*状态*/
				status: 0,
				/*天*/
				day: '0',
				/*时*/
				hour: '0',
				/*分*/
				minute: '0',
				/*秒*/
				second: '0',
				/*定时器*/
				timer: null,
				/*剩余秒*/
				totalSeconds: 0,
				/*标题*/
				title: '活动剩余：'
			};
		},
		props: {
			config: {
				type: Object,
				default: function() {
					return {
						type: 'all',
					};
				}
			},
			back_color: {
				type: String,
				default: ()=>''
			},
			cut_color: {
				type: String,
				default: ()=>''
			},
			color: {
				type: String,
				default: ()=>''
			},
			start_name: {
				type: String,
				default: ()=>'距开始:'
			},
			end_name: {
				type: String,
				default: ()=>'距结束:'
			},
			activeName:{
				type:String,
				default: ()=>''
			}
		},
		created() {},
		watch: {
			config: {
				deep: true,
				handler: function(n, o) {
					if (n != o && n.endstamp != 0) {
						if (n.title && typeof n.title != 'undefined') {
							//this.title = n.title;
						}
						this.setTime();
					}
				},
				immediate: true
			}
		},
		methods: {
			/*轮循*/
			setTime() {
				let self = this;
				self.timer = setInterval(function() {
					self.init();
				}, 1000);
			},

			/*初始化*/
			init() {
				let nowseconds = Date.now() / 1000;
				if (nowseconds < this.config.startstamp) {
					//活动时间还没到
					this.status = 1;
					this.totalSeconds = parseInt(this.config.startstamp - nowseconds);
					this.countDown();
					this.title = this.start_name;
				}else if (nowseconds > this.config.endstamp) {
					//活动已过期
					this.status = 2;
				} else {
					//活动进行中
					this.totalSeconds = parseInt(this.config.endstamp - nowseconds);
					this.status = 0;
					this.countDown();
					this.title = this.end_name;
				}
				this.$emit('returnVal', this.status);
			},

			/*计算时分秒*/
			countDown() {
				let totalSeconds = this.totalSeconds;
				//天数
				let day = Math.floor(totalSeconds / (60 * 60 * 24));
				//取模（余数）
				let modulo = totalSeconds % (60 * 60 * 24);
				//小时数
				let hour = Math.floor(modulo / (60 * 60));
				modulo = modulo % (60 * 60);
				//分钟
				let minute = Math.floor(modulo / 60);
				//秒
				let second = modulo % 60;
				this.day = day;
				this.hour = this.convertTwo(hour);
				this.minute = this.convertTwo(minute);
				this.second = this.convertTwo(second);
				this.totalSeconds--;
			},

			/*转两位数*/
			convertTwo(n) {
				let str = '';
				if (n < 10) {
					str = '0' + n;
				} else {
					str = n;
				}
				return str;
			},

			/*把时间戳转普通时间*/
			getLocalTime(nS) {
				return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
			},
			clear() {
				console.log(1)
				clearInterval(this.timer);
				this.timer = null;
			},
		},

		destroyed() {
			clearInterval(this.timer);
		}
	};
</script>

<style lang="scss">
	.countdown{
		border-radius: 16rpx 0 16rpx 16rpx;
		border: 1rpx solid #F4DACF;
		padding: 2rpx;
		padding-right:10rpx;
		@include border_color('bg-bargain');
		.numbox{
			font-size: 22rpx;
		}
	}

	.countdown .daybox {
		padding: 0 16rpx;
		border-radius: 200rpx;
		font-size: 22rpx;
		margin-right: 7rpx;
	}
	.previewProduct text {
		font-size: 22rpx;
	}
	
	.previewProduct .box {
		padding: 0;
		font-size: 22rpx;
		background: #ffffff;
		color: #ff4c01;
		width: 36rpx;
		height: 36rpx;
		display: inline-block;
		line-height: 36rpx;
		text-align: center;
		border-radius: 8rpx;
	}
	.previewProduct .daybox {
		padding: 0;
		font-size: 22rpx;
		background: none;
	}
	.previewProduct.countdown {
		border: none;
		padding: 0;
		font-size: 22rpx;
		white-space: nowrap;
	}
	.diy-previewProduct text {
		font-size: 18rpx;
	}
	
	.diy-previewProduct .box {
		padding: 0;
		font-size: 18rpx;
		background: none;
	}
	.diy-previewProduct .daybox {
		padding: 0;
		font-size: 18rpx;
		background: none;
	}
	.diy-previewProduct.countdown {
		border: none;
		padding: 0;
		font-size: 18rpx;
		white-space: nowrap;
	}
</style>
