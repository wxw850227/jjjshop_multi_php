<template>
	<!--倒计时-->
	<view class="countdown" :style="'color:'+color">
		<template v-if="status==2">活动已结束</template>
		<template v-else>
			{{title}} <text class="mr10">{{parseInt(day)+'天'}}</text>
			<text class="f28" :style="'font-size:'+timeSize+';'">{{ parseInt(hour) }}:{{ minute }}:{{ second }}</text>
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
				title: '还剩'
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
			color: {
				type: String,
				default: function() {
					return '#ffffff';
				}
			},
			timeSize: {
				type: String,
				default: function() {
					return '28rpx';
				}
			},
		},
		created() {},
		watch: {
			config: {
				deep: true,
				handler: function(n, o) {
					if (n != o && n.endstamp != 0) {
						if (n.title && typeof n.title != 'undefined') {
							this.title = n.title;
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
					this.title = '距开始还剩';
				} else if (nowseconds > this.config.endstamp) {
					//活动已过期
					this.status = 2;
				} else {
					//活动进行中
					this.totalSeconds = parseInt(this.config.endstamp - nowseconds);
					this.status = 0;
					this.title = '距截止还剩';
					this.countDown();
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
				this.day = this.convertTwo(day);
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
		color: #FFFFFF;
		font-size: 22rpx;
	}
</style>
