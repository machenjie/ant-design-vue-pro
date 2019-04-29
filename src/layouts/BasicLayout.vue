<template>
  <a-layout
    style="min-height: 100vh"
    :class="[`nav-theme-${siderTheme}`, `nav-layout-${siderLayout}`]"
  >
    <a-layout-sider
      :trigger="null"
      collapsible
      v-model="collapsed"
      :theme="siderTheme"
      v-if="siderLayout"
    >
      <div class="logo">
        Ant Design Vue Pro
      </div>
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

      <a-layout-content>
        <router-view></router-view>
      </a-layout-content>

      <a-layout-footer>
        <Footer></Footer>
      </a-layout-footer>
    </a-layout>
    <SettingDrawer></SettingDrawer>
  </a-layout>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
import SiderMenu from "./SiderMenu";
import Header from "./Header";
import Footer from "./Footer";
import SettingDrawer from "../components/SettingDrawer";

@Component({
  components: {
    SiderMenu,
    Header,
    Footer,
    SettingDrawer
  }
})
export default class BasicLayout extends Vue {
  collapsed = false;

  get siderTheme() {
    return this.$route.query.navTheme || "dark";
  }

  get siderLayout() {
    return (
      !this.$route.query.navLayout || this.$route.query.navLayout === "left"
    );
  }
}
</script>

<style scoped lang="less">
.trigger {
  float: left;
  padding: 0;
  height: 64px;
  width: 64px;
  line-height: 64px;
  font-size: 30px;
  color: #000;
}
.header {
  float: right;
}
.logo() {
  height: 64px;
  line-height: 64px;
  text-align: center;
  overflow: hidden;
}
.nav-theme-dark /deep/ .logo {
  color: #fff;
  .logo();
}
.nav-theme-light /deep/ .logo {
  .logo();
}
</style>
