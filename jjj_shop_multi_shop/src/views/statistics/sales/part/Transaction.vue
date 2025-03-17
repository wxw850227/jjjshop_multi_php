<template>

	<div class="mt30">
		<div class="common-form">交易统计</div>
		<el-tabs v-model="activeName" @tab-change="handleClick">
			<el-tab-pane label="订单数" name="order"></el-tab-pane>
			<el-tab-pane label="退款数" name="refund"></el-tab-pane>
		</el-tabs>
		<div class="d-b-c">
			<div>
				<el-date-picker size="small" v-model="datePicker" type="daterange" align="right" unlink-panels
					format="YYYY-MM-DD" value-format="YYYY-MM-DD" range-separator="至" start-placeholder="开始日期"
					end-placeholder="结束日期" @change="changeDate" :shortcuts="shortcuts"></el-date-picker>
			</div>
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
let myChart = null;
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

			shortcuts: [{
				text: '最近一周',
				value: () => {
					const end = new Date();
					const start = new Date();
					start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
					return [start, end];
				},
			},
			{
				text: '最近一个月',
				value: () => {
					const end = new Date();
					const start = new Date();
					start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
					return [start, end];
				},
			},
			{
				text: '最近三个月',
				value: () => {
					const end = new Date();
					const start = new Date();
					start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
					return [start, end];
				},
			},
			],

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
					left: '3%',
					right: '4%',
					bottom: '6%',
					containLabel: true
				},
				tooltip: {
					trigger: 'axis'
				},
				yAxis: {}
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
		handleClick(tab) {
			this.activeName = tab;
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
				this.option.color = ['red', '#409EFF'];

				this.option.legend = {
					data: [{
						name: names[0],
						color: '#ccc'
					}, {
						name: names[1]
					}]
				};
				this.option.series = [{
					name: names[0],
					type: 'line',
					data: series1,
					lineStyle: {
						color: 'red'
					}
				},
				{
					name: names[1],
					type: 'line',
					data: series2,
					lineStyle: {
						color: '#409EFF'
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
			},
			true
			)
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

<style scoped>
	.Echarts {
		box-sizing: border-box;
	}

	.Echarts>div {
		width: 100%;
		height: 400px;
		box-sizing: border-box;
	}
</style>