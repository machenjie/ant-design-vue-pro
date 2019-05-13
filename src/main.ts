import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { Layout, Icon, Drawer, Radio, Menu, Button, Form, Input } from "ant-design-vue";
import Authority from "@/components/Authority.vue";

Vue.config.productionTip = false;

Vue.use(Layout);
Vue.use(Icon);
Vue.use(Drawer);
Vue.use(Radio);
Vue.use(Menu);
Vue.use(Button);
Vue.use(Form);
Vue.use(Input);
Vue.component("Authority", Authority);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
