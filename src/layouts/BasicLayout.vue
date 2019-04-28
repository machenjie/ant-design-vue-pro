<template>
  <a-layout>
    <a-layout-sider :trigger="null" collapsible v-model="collapsed">
      <div class="logo" />
      <SiderMenu></SiderMenu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="collapsed = !collapsed"
        />
        <Header class="header"></Header>
      </a-layout-header>

      <a-layout-content
        :style="{
          margin: '24px 16px',
          padding: '24px',
          background: '#fff',
          minHeight: '280px'
        }"
      >
        <router-view></router-view>
      </a-layout-content>

      <a-layout-footer>
        <Footer></Footer>
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
import SiderMenu from "./SiderMenu";
import Header from "./Header";
import Footer from "./Footer";

@Component({
  components: {
    SiderMenu,
    Header,
    Footer
  }
})
export default class BasicLayout extends Vue {
  collapsed = false;
}
</script>

<style scoped lang="less">
.trigger {
  float: left;
}
.header {
  float: right;
}
</style>
