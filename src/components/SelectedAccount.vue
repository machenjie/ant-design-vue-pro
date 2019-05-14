<template>
  <div>
    <a-select v-model="type" style="width: 30%" @change="handelTypeChange">
      <a-select-option value="alipay">alipay</a-select-option>
      <a-select-option value="bank">bank</a-select-option>
    </a-select>
    <a-input style="width: 70%" v-model="number" @change="handelNumberChange" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  props: {
    value: {
      type: Object
    }
  },
  watch: {
    value: function(val) {
      Object.assign(this, { ...val });
    }
  },
  data: function() {
    let _this = this as any;
    let value = _this.value || {};
    return {
      type: value.type || "alipay",
      number: value.number || ""
    };
  },
  methods: {
    handelTypeChange: function(v) {
      let _this = this as any;
      let value = _this.value;
      _this.$emit("change", { ...value, type: v });
    },
    handelNumberChange: function(e) {
      let _this = this as any;
      let value = _this.value;
      _this.$emit("change", { ...value, number: e.target.value });
    }
  }
})
export default class SelectedAccount extends Vue {}
</script>

<style scoped></style>
