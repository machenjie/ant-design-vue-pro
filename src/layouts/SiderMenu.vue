<template>
  <div style="width: 256px">
    <a-menu
      :selectedKeys="selectedKeys"
      :openKeys.sync="openKeys"
      mode="inline"
      :theme="theme"
    >
      <template v-for="item in menuList">
        <a-menu-item
          v-if="!item.children"
          :key="item.path"
          @click="$router.push({ path: item.path, query: $route.query })"
        >
          <a-icon v-if="item.meta.icon" :type="item.meta.icon" />
          <span>{{ item.meta.title }}</span>
        </a-menu-item>
        <sub-menu v-else :menu-info="item" :key="item.path" />
      </template>
    </a-menu>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import SubMenu from "./SubMenu.vue";
import { routes } from "@/router";

@Component({
  components: {
    "sub-menu": SubMenu
  }
})
export default class SiderMenu extends Vue {
  @Prop() theme!: string;

  collapsed: boolean = false;
  openKeysMap: any = {};
  selectedKeysMap: any = {};
  openKeys: string[] = [];
  selectedKeys: string[] = [];
  _menuList: any = [];

  // get openKeys() {
  //   return this.collapsed ? [] : this.openKeysMap[this.$route.path];
  // }
  //
  // set openKeys(v: any) {
  //
  // }
  //
  // get selectedKeys() {
  //   return this.selectedKeysMap[this.$route.path];
  // }

  get menuList() {
    if (this._menuList.length === 0) {
      this._menuList = this.getMenuList(routes);
      this.openKeys = this.collapsed ? [] : this.openKeysMap[this.$route.path];
      this.selectedKeys = this.selectedKeysMap[this.$route.path];
    }
    return this._menuList;
  }

  getMenuList(routes: any[] = [], parentKeys: string[] = []): any[] {
    const menuList: any[] = [];
    for (let item of routes) {
      if (item.meta && item.meta.menuNode) {
        let newItem = { ...item };
        delete newItem.children;
        Vue.set(this.openKeysMap, item.path, parentKeys);
        Vue.set(this.selectedKeysMap, item.path, [item.path]);
        if (item.children) {
          const child = this.getMenuList(item.children, [
            ...parentKeys,
            item.path
          ]);
          if (child && child.length != 0) {
            newItem.children = child;
          }
        }
        menuList.push(newItem);
      } else if (item.children) {
        menuList.push(...this.getMenuList(item.children, parentKeys));
      }
    }
    return menuList;
  }
}
</script>

<style scoped lang="less"></style>
