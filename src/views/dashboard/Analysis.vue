<template>
  <div>
    <Charts :option="option"> </Charts>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { random } from "lodash";
import Charts from "@/components/Charts.vue";

@Component({
  mounted(): void {
    let _this = this as any;
    _this.interval = setInterval(() => {
      _this.option.series[0].data = (_this.option.series[0]
        .data as number[]).map(() => random(10, 100));
      _this.option = { ..._this.option };
      console.log(_this.option);
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
  option = {
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
        data: [5, 20, 36, 10, 10, 20]
      }
    ]
  };
}
</script>

<style scoped lang="less"></style>
