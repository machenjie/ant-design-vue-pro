<template>
  <div>
    <Charts :option="option"> </Charts>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Charts from "@/components/Charts.vue";
import request from "@/utils/request";

@Component({
  mounted(): void {
    let _this = this as any;
    _this.getChartOption();
    _this.interval = setInterval(() => {
      _this.getChartOption();
    }, 1000);
  },
  beforeDestroy(): void {
    let _this = this as any;
    clearInterval(_this.interval);
    _this.interval = null;
  },
  components: {
    Charts
  }
})
export default class Analysis extends Vue {
  option = {};

  getChartOption() {
    request({
      method: "GET",
      url: "/api/dashboard/chart",
      params: { id: 1234 }
    }).then(res => {
      this.option = {
        title: {
          text: "ECharts 入门示例"
        },
        tooltip: {},
        legend: {
          data: ["销量"]
        },
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: res.data
          }
        ]
      };
    });
  }
}
</script>

<style scoped lang="less"></style>
