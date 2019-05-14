import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import {
  Layout,
  Icon,
  Drawer,
  Radio,
  Menu,
  Button,
  Form,
  Input,
  Select
} from "ant-design-vue";
import Authority from "@/components/Authority.vue";

Vue.config.productionTip = false;

const Icon404 = Icon.createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_1189627_6w3di6owd4v.js"
});

Vue.use(Layout);
Vue.use(Icon);
Vue.use(Drawer);
Vue.use(Radio);
Vue.use(Menu);
Vue.use(Button);
Vue.use(Form);
Vue.use(Input);
Vue.use(Select);
Vue.component("Authority", Authority);
Vue.component("Icon404", Icon404);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
