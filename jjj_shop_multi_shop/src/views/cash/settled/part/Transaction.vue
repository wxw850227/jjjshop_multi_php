<template>
  <div class="ww100 mt30">
    <el-tabs v-model="activeName">
      <el-tab-pane label="商户结算" name="first"></el-tab-pane>
    </el-tabs>
    <div class="d-b-c">
      <div>
        <el-date-picker
          size="small"
          v-model="datePicker"
          type="daterange"
          align="right"
          unlink-panels
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="changeDate"
          :shortcuts="shortcuts"
        ></el-date-picker>
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
import { getSettledByDate } from "@/api/cash.js";
import { formatDate } from "@/utils/DateTime.js";
import * as echarts from 'echarts';
let myChart = null;
export default {
  data() {
    let endDate = new Date();
    let startDate = new Date();
    startDate.setTime(startDate.getTime() - 3600 * 1000 * 24 * 7);
    return {
      activeName: "first",
      /*时间快捷选项*/
      // pickerOptions: {
      shortcuts: [
        {
          text: "最近一周",
          value: () => {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            return [start, end];
          },
        },
        {
          text: "最近一个月",
          value: () => {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            return [start, end];
          },
        },
        {
          text: "最近三个月",
          value: () => {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            return [start, end];
          },
        },
      ],
      // },
      datePicker: [
        formatDate(startDate, "yyyy-MM-dd"),
        formatDate(endDate, "yyyy-MM-dd"),
      ],
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
          top: "20%",
          left: "5%",
          right: "5%",
          bottom: "8%",
          containLabel: true,
        },
        color: ["#fa8d49", "#ebc93d", "#62dc82", "#7692fe"],
        tooltip: {
          trigger: "axis",
          backgroundColor: "rgba(1, 13, 19, 0.5)",
          borderWidth: 1,
          axisPointer: {
            type: "shadow",
          },
          formatter: function (params) {
            var str = "";
            if (params.length > 0) {
              str = params[0].name + "<br/>";
            }
            for (var i = 0; i < params.length; i++) {
              if (params[i].seriesName !== "") {
                str += params[i].seriesName + ":" + params[i].value + "<br/>";
              }
            }
            return str;
          },
          textStyle: {
            color: "rgba(212, 232, 254, 1)",
          },
          extraCssText: "z-index:2",
        },
        legend: {
          right: 20,
          top: 30,
          icon: "circle",
          itemWidth: 15,
          itemHeight: 10,
          itemGap: 15,
          borderRadius: 4,
          textStyle: {
            color: "#000",
            fontFamily: "Alibaba PuHuiTi",
            fontSize: 14,
            fontWeight: 400,
          },
        },
        xAxis: {
          type: "category",
          data: [],
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: "#393939", //X轴文字颜色
            },
          },
        },
        yAxis: [
          {
            type: "value",
            axisLine: {
              show: false,
              lineStyle: {
                color: "#eeeeee",
              },
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              color: "#393939",
              fontSize: 14,
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "#e7e9ef",
                type: "dashed",
              },
            },
          },
        ],
      },
    };
  },
  mounted() {
    this.myEcharts();
  },
  methods: {
    /*选择时间*/
    changeDate() {
      this.getData();
    },

    myEcharts() {
      // 基于准备好的dom，初始化echarts实例
      myChart = echarts.init(document.getElementById("LineChart"));
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
        let series3 = [];
        this.dataList.data.forEach((item) => {
          series1.push(item.real_supplier_money);
          series2.push(item.real_sys_money);
          series3.push(item.refund_money);
        });
        names = ["商户结算", "平台抽成", "退款金额"];

        // 指定图表的配置项和数据
        this.option.xAxis = {
          type: "category",
          boundaryGap: false,
          data: xAxis,
        };
        this.option.color = ["#fa8d49", "#ebc93d", "#62dc82"];
        this.option.legend = {
          data: [
            {
              name: names[0],
              color: "#ccc",
            },
            {
              name: names[1],
            },
            {
              name: names[2],
            },
          ],
        };
        this.option.series = [
          {
            symbol: "circle", //标记的图形为实心圆
            symbolSize: 0, //标记的大小
            name: names[0],
            type: "line",
            data: series1,
            lineStyle: {
              color: "#fa8d49",
            },
          },
          {
            symbol: "circle", //标记的图形为实心圆
            symbolSize: 0, //标记的大小
            name: names[1],
            type: "line",
            data: series2,
            lineStyle: {
              color: "#ebc93d",
            },
          },
          {
            symbol: "circle", //标记的图形为实心圆
            symbolSize: 0, //标记的大小
            name: names[2],
            type: "line",
            data: series3,
            lineStyle: {
              color: "#62dc82",
            },
          },
        ];

        myChart.setOption(this.option);
        myChart.resize();
      }
    },

    /*获取列表*/
    getData() {
      let self = this;
      self.loading = true;
      getSettledByDate(
        {
          search_time: self.datePicker,
        },
        true
      )
        .then((res) => {
          self.dataList = res.data;
          self.loading = false;
          self.createOption();
        })
        .catch((error) => {});
    },
  },
};
</script>

<style scoped="scoped">
.Echarts {
  box-sizing: border-box;
}

.Echarts > div {
  width: 100%;
  height: 360px;
  box-sizing: border-box;
}
</style>
