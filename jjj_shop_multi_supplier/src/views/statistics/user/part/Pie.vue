<template>
  <div class="pie-container d-b-s d-c">
    <div class="ww100 d-b-c lh30">
      <span class="f16">成交会员占比</span>
      <el-select
        size="mini"
        v-model="selectDay"
        @change="changeFunc"
        placeholder="请选择"
      >
        <el-option
          v-for="item in days"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>
    <div class="ww100">
      <div class="Echarts"><div id="PieBox" class="ww100"></div></div>
    </div>
    <div></div>
  </div>
</template>

<script>
import { getUserScale } from "@/api/statistics.js";
export default {
  data() {
    return {
      /*是否正在加载*/
      loading: true,
      /*天数*/
      days: [
        {
          label: "今天",
          value: 1,
        },
        {
          label: "最近7天",
          value: 7,
        },
        {
          label: "最近30天",
          value: 30,
        },
        {
          label: "最近90天",
          value: 90,
        },
        {
          label: "最近180天",
          value: 180,
        },
        {
          label: "最近1年",
          value: 365,
        },
        {
          label: "最近2年",
          value: 730,
        },
        {
          label: "所有占比",
          value: 0,
        },
      ],
      /*选择的天数*/
      selectDay: 7,
      /*数据对象*/
      payScale: {},
      /*图表对象*/
      myChart: null,
      /*图表配置*/
      option: {
        title: {
          text: "",
          subtext: "",
          left: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
      },
    };
  },
  mounted() {
    this.myEcharts();
  },
  methods: {
    /*选择天数*/
    changeFunc() {
      this.getData();
    },

    /*创建图表对象*/
    myEcharts() {
      // 基于准备好的dom，初始化echarts实例
      this.myChart = this.$echarts.init(document.getElementById("PieBox"));
      this.getData();
    },

    /*格式数据*/
    createOption() {
      if (!this.loading) {
        this.option.color = ["#e2e7f2", "#409EFF"];

        this.option.legend = {
          orient: "vertical",
          left: "left",
          data: [
            {
              name: "成交会员",
              color: "#666",
            },
            {
              name: "未成交会员",
              color: "#666",
            },
          ],
        };
        this.option.series = [
          {
            name: "成交会员占比",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: this.payScale.no_pay, name: "未成交会员" },
              { value: this.payScale.pay, name: "成交会员" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ];

        this.myChart.setOption(this.option);
        this.myChart.resize();
      }
    },

    /*获取数据*/
    getData() {
      let self = this;
      getUserScale(
        {
          day: self.selectDay,
        },
        true
      )
        .then((res) => {
          self.payScale = res.data.payScale;
          self.loading = false;
          self.createOption();
        })
        .catch((error) => {});
    },
  },
};
</script>

<style scoped="scoped">
.pie-container {
  padding: 10px 20px;
  width: 30%;
  box-sizing: border-box;
}
.Echarts > div {
  height: 400px;
}
</style>
