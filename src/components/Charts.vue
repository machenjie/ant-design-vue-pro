<template>
  <div class="echarts" ref="echarts"></div>
</template>

<script lang="ts">
import echarts from "echarts";
import elementResizeDetectorMaker from "element-resize-detector";
import { debounce } from "lodash";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  watch: {
    option(val) {
      let _this = this as any;
      _this.chart.setOption(val);
    }
  },
  created(): void {
    let _this = this as any;
    _this.resize = debounce(_this.resize, 300);
  },
  mounted(): void {
    let _this = this as any;
    this.$nextTick(() => {
      _this.chart = echarts.init(_this.$refs.echarts as HTMLDivElement);
      _this.chart.setOption(_this.option);

      _this.erd = elementResizeDetectorMaker();
      _this.erd.listenTo(_this.$refs.echarts as HTMLElement, _this.resize);
    });
  },
  beforeDestroy(): void {
    let _this = this as any;
    _this.erd.removeListener(_this.$refs.echarts, _this.resize);
    _this.chart.dispose();
    _this.chart = null;
  }
})
export default class Charts extends Vue {
  @Prop() option!: object;

  resize() {
    (this as any).chart.resize();
  }
}
</script>

<style scoped lang="less">
.echarts {
  height: 400px;
}
</style>
