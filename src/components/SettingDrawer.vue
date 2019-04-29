<template>
  <div>
    <a-drawer
      placement="right"
      :closable="false"
      @close="onClose"
      :visible="visible"
      width="300px"
    >
      <template v-slot:handle>
        <a-icon
          class="setting-drawer-handler"
          @click="visible = !visible"
          :type="visible ? 'close' : 'setting'"
        ></a-icon>
      </template>
      <div>
        <h2>Theme Select</h2>
        <a-radio-group
          @change="e => OnThemeChange('navTheme', e.target.value)"
          :value="$route.query.navTheme || 'dark'"
        >
          <a-radio value="dark">Drak</a-radio>
          <a-radio value="light">Light</a-radio>
        </a-radio-group>
        <h2>Nav Select</h2>
        <a-radio-group
          @change="e => OnThemeChange('navLayout', e.target.value)"
          :value="$route.query.navLayout || 'left'"
        >
          <a-radio value="left">Left</a-radio>
          <a-radio value="top">Top</a-radio>
        </a-radio-group>
      </div>
    </a-drawer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class SettingDrawer extends Vue {
  visible = false;

  onClose() {
    this.visible = false;
  }

  OnThemeChange(type: string, v: string) {
    this.$router.push({ query: { ...this.$route.query, [type]: v } });
  }
}
</script>

<style scoped lang="less">
.setting-drawer-handler {
  position: fixed;
  top: 240px;
  right: 300px; //这个参数的值和drawer的width保持一致
  width: 48px;
  height: 48px;
  background: @primary-color;
  color: #fff;
  font-size: 20px;
  text-align: center;
  line-height: 48px;
  border-radius: 3px 0 0 3px;
}
</style>
