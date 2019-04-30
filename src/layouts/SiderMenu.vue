<template>
  <div style="width: 256px; text-align: left">
    <a-menu
      :selectedKeys="selectedKeys"
      :openKeys.sync="openKeys"
      mode="inline"
      :theme="theme"
    >
      <template v-for="item in menuList">
        <a-menu-item
          v-if="!item.children"
          :key="item.fullPath"
          @click="$router.push({ path: item.fullPath, query: $route.query })"
        >
          <a-icon v-if="item.meta.icon" :type="item.meta.icon" />
          <span>{{ item.meta.title }}</span>
        </a-menu-item>
        <sub-menu v-else :menu-info="item" :key="item.fullPath" />
      </template>
    </a-menu>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import SubMenu from "./SubMenu.vue";
import { routes } from "@/router";
import Auth from "@/utils/Auth";

@Component({
  components: {
    "sub-menu": SubMenu
  }
})
export default class SiderMenu extends Vue {
  @Prop() theme!: string;
  @Prop() collapsed!: boolean;

  openKeysMap: any = {}; //every path will match to the open key path, open key path is a list of path keys that will be open in menu
  selectedKeysMap: any = {}; //every path will match to the select key path, select key path is a path key which will be select
  forceOpenKeys: string[] = [];
  forceSetOpenKeys: boolean = false;

  get openKeys() {
    let keys = this.forceSetOpenKeys
      ? this.collapsed
        ? []
        : this.forceOpenKeys
      : this.collapsed
      ? []
      : this.openKeysMap[this.$route.path];
    this.forceSetOpenKeys = false;
    return keys;
  }

  set openKeys(v: string[]) {
    this.forceOpenKeys = v;
    this.forceSetOpenKeys = true;
  }

  get selectedKeys() {
    return this.selectedKeysMap[this.$route.path];
  }

  get menuList() {
    return this.getMenuList(routes);
  }

  getMenuList(
    routes: any[] = [],
    parentKeys: string[] = [],
    selectedKey: string = ""
  ): any[] {
    const menuList: any[] = [];
    for (let item of routes) {
      if (
        item.meta &&
        item.meta.authority &&
        !Auth.checkAuthority(item.meta.authority)
      ) {
        continue;
      }

      if (!item.meta || !item.meta.effectedInMenu) {
        Vue.set(this.openKeysMap, item.fullPath, parentKeys);
        Vue.set(this.selectedKeysMap, item.fullPath, [
          selectedKey || item.fullPath
        ]);
        if (item.meta && item.meta.menuNode) {
          //this is a menu node, key will be store
          let newItem = { ...item };
          delete newItem.children;
          if (item.children) {
            const child = this.getMenuList(
              item.children,
              item.meta.hideChildrenInMenu
                ? parentKeys
                : [...parentKeys, item.fullPath],
              item.meta.hideChildrenInMenu ? item.fullPath : selectedKey
            );
            newItem.children = child && child.length != 0 ? child : null;
          }
          menuList.push(newItem);
        } else if (item.children) {
          menuList.push(
            ...this.getMenuList(item.children, parentKeys, selectedKey)
          );
        }
      }
    }
    return menuList;
  }
}
</script>

<style scoped lang="less"></style>
