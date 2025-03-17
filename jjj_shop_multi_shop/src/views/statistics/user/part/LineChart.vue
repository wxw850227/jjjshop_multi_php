<template>

	<div class="ww100 mt30">
		<el-tabs v-model="activeName" @tab-change="handleClick">
			<el-tab-pane label="新增会员" name="new"></el-tab-pane>
			<el-tab-pane label="成交会员数" name="pay"></el-tab-pane>
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
				<div id="LineChart"></div>
			</div>
		</div>
	</div>
</template>

<script>
import * as echarts from 'echarts';
import {
	getNewUser,
	getPayUser
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
		handleClick(e) {
			this.activeName = e;
			this.getData();
		},

		/*选择时间*/
		changeDate() {
			this.getData();
		},

		/*创建图表对象*/
		myEcharts() {
			// 基于准备好的dom，初始化echarts实例
			myChart = echarts.init(document.getElementById('LineChart'));
			/*获取列表*/
			this.getData();
		},

		/*格式数据*/
		createOption() {
			if (!this.loading) {
				let names = [];
				let xAxis = this.dataList.days;
				let series1 = [];
				this.dataList.data.forEach(item => {
					series1.push(item.total_num);
				});
				if (this.activeName == 'new') {
					names = ['新增会员数'];
				} else if (this.activeName == 'pay') {
					names = ['成交会员数'];
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
					}]
				};
				this.option.series = [{
					name: names[0],
					type: 'line',
					data: series1,
					lineStyle: {
						color: 'red'
					}
				}];

				myChart.setOption(this.option);
				myChart.resize();
			}
		},

		/*获取列表*/
		getData() {
			let self = this;
			self.loading = true;

			let UserApi = null;

			if (this.activeName == 'new') {
				UserApi = getNewUser;
			}

			if (this.activeName == 'pay') {
				UserApi = getPayUser;
			}

			UserApi({
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

<style scoped="scoped">
	.Echarts {
		box-sizing: border-box;
	}

	.Echarts>div {
		width: 100%;
		height: 360px;
		box-sizing: border-box;
	}
</style>