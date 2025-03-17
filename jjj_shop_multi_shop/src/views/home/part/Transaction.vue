<template>
	<div class="mt30">
		<div class="d-b-c">
		</div>
		<div class="">
			<div class="Echarts">
				<div id="TransactionChart"></div>
			</div>
		</div>
	</div>
</template>

<script>
import {
	getOrderByDate
} from '@/api/statistics.js';
import {
	formatDate
} from '@/utils/DateTime.js';
import * as echarts from 'echarts';
let myChart;
export default {
	data() {
		let endDate = new Date();
		let startDate = new Date();
		startDate.setTime(startDate.getTime() - 3600 * 1000 * 24 * 7);
		return {
			/*是否正在加载*/
			loading: true,
			/*类别*/
			activeName: 'order',
			/*时间快捷选项*/
			pickerOptions: {
				shortcuts: [{
					text: '最近一周',
					onClick(picker) {
						const end = new Date();
						const start = new Date();
						start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
						picker.$emit('pick', [start, end]);
					}
				},
				{
					text: '最近一个月',
					onClick(picker) {
						const end = new Date();
						const start = new Date();
						start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
						picker.$emit('pick', [start, end]);
					}
				},
				{
					text: '最近三个月',
					onClick(picker) {
						const end = new Date();
						const start = new Date();
						start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
						picker.$emit('pick', [start, end]);
					}
				}
				]
			},
			datePicker: [formatDate(startDate, 'yyyy-MM-dd'), formatDate(endDate, 'yyyy-MM-dd')],
			/*数据对象*/
			dataList: null,
			/*交易统计图表对象*/
			// myChart: null,
			/*图表数据*/
			option: {
				title: {
					//text: 'ECharts 入门示例'
				},
				grid: {
					top: '20%',
					left: '5%',
					right: '5%',
					bottom: '8%',
					containLabel: true
				},
				color: ['#fa8d49', '#ebc93d', '#62dc82', '#7692fe'],
				tooltip: {
					trigger: 'axis',
					backgroundColor: 'rgba(1, 13, 19, 0.5)',
					borderWidth: 1,
					axisPointer: {
						type: 'shadow'
					},
					formatter: function(params) {
						var str = '';
						if (params.length > 0) {
							str = params[0].name + '<br/>';
						}
						for (var i = 0; i < params.length; i++) {
							if (params[i].seriesName !== '') {
								str += params[i].seriesName + ':' + params[i].value + '<br/>';
							}
						}
						return str;
					},
					textStyle: {
						color: 'rgba(212, 232, 254, 1)'
					},
					extraCssText: 'z-index:2'
				},
				legend: {
					right: 20,
					top: 30,
					icon: 'circle',
					itemWidth: 15,
					itemHeight: 10,
					itemGap: 15,
					borderRadius: 4,
					textStyle: {
						color: '#000',
						fontFamily: 'Alibaba PuHuiTi',
						fontSize: 14,
						fontWeight: 400
					}
				},
				xAxis: {
					type: 'category',
					data: [],
					axisLine: {
						show: false
					},
					axisTick: {
						show: false
					},
					axisLabel: {
						show: true,
						textStyle: {
							color: '#393939' //X轴文字颜色
						}
					}
				},
				yAxis: [{
					type: 'value',
					axisLine: {
						show: false,
						lineStyle: {
							color: '#eeeeee'
						}
					},
					axisTick: {
						show: false
					},
					axisLabel: {
						color: '#393939',
						fontSize: 14
					},
					splitLine: {
						show: true,
						lineStyle: {
							color: '#e7e9ef',
							type: 'dashed'
						}
					}
				}],
			}
		};
	},
	created() {

	},
	mounted() {
		this.myEcharts();
	},
	methods: {

		/*切换*/
		handleClick(e) {
			this.getData();
		},

		/*选择时间*/
		changeDate() {
			this.getData();
		},

		/*创建图表对象*/
		myEcharts() {
			// 基于准备好的dom，初始化echarts实例
			myChart = echarts.init(document.getElementById('TransactionChart'));
			/*获取列表*/
			this.getData();
		},

		/*格式数据*/
		createOption() {
			if (!this.loading) {
				let names = [];
				let xAxis = this.dataList.days;
				let series1 = [];
				let series2 = [];
				this.dataList.data.forEach(item => {
					series1.push(item.total_money);
					series2.push(item.total_num);
				});
				if (this.activeName == 'order') {
					names = ['成交额', '成交量'];
				} else if (this.activeName == 'refund') {
					names = ['退单额', '退单量'];
				}

				// 指定图表的配置项和数据
				this.option.xAxis = {
					type: 'category',
					boundaryGap: false,
					data: xAxis
				};
				this.option.color = ['#5E73E3', '#31C0D0'];
				this.option.legend = {
					data: [
						{
							name: names[0],
							color: '#ccc'
						},
						{
							name: names[1]
						}]
				};
				this.option.series = [{
					name: names[0],
					type: 'line',
					symbol: 'circle', //标记的图形为实心圆
					symbolSize: 0, //标记的大小
					data: series1,
					lineStyle: {
						width: 3,
						color: '#5E73E3'
					}
				},
				{
					name: names[1],
					type: 'line',
					symbol: 'circle', //标记的图形为实心圆
					symbolSize: 0, //标记的大小
					data: series2,
					lineStyle: {
						width: 3,
						color: '#31C0D0'
					}
				}
				];

				myChart.setOption(this.option);
				myChart.resize();
			}
		},

		/*获取列表*/
		getData() {
			let self = this;
			self.loading = true;
			getOrderByDate({
				search_time: self.datePicker,
				type: self.activeName
			})
				.then(res => {
					self.dataList = res.data;
					self.loading = false;
					self.createOption();
				})
				.catch(error => {});
		}
	}
};
</script>

<style>
	.Echarts {
		box-sizing: border-box;
	}

	.Echarts>div {
		width: 100%;
		height: 400px;
		box-sizing: border-box;
	}
</style>