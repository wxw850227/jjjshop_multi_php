<template>
	<div class="mt30">
		<div class="common-form">商户统计</div>
		<div class="d-b-c">
			<div>
				<el-date-picker size="small" v-model="datePicker" type="daterange" align="right" unlink-panels
					format="YYYY-MM-DD" value-format="YYYY-MM-DD" range-separator="至" start-placeholder="开始日期"
					end-placeholder="结束日期" @change="changeDate" :picker-options="pickerOptions"></el-date-picker>
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
import * as echarts from 'echarts';
import {
	getSupplierByDate
} from '@/api/statistics.js';
import {
	formatDate
} from '@/utils/DateTime.js';
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
			activeName: 'new',
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
					left: '3%',
					right: '4%',
					bottom: '3%',
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
				let names = ['新增数量', '退出数量'];
				let xAxis = this.dataList.days;
				let series1 = [];
				let series2 = [];
				this.dataList.data.forEach(item => {
					series1.push(item.new_num);
					series2.push(item.refund_num);
				});

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
			getSupplierByDate({
				search_time: self.datePicker
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