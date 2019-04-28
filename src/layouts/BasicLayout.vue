<template>
  <div>
    <SiderMenu></SiderMenu>
    <Header></Header>
    <router-view></router-view>
    <Footer></Footer>
  </div>
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
export default class BasicLayout extends Vue {}
</script>

<style scoped lang="less"></style>
