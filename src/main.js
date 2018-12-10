import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import BootstrapVue from "bootstrap-vue";

import axios from "axios";
import VueAxios from "vue-axios";

// import bootstrap css
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

// vuex
import store from "./store";

// let vue use bootstrap
Vue.use(BootstrapVue);

//let vue use axios globally
Vue.use(VueAxios, axios);

Vue.config.productionTip = false;
Vue.config.devtools = true;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
