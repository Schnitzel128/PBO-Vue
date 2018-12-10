import Vue from "vue";
import Vuex from "vuex";

import { authentication } from "./store/authentication.module.js";

Vue.use(Vuex);
Vue.config.devtools = true;

export default new Vuex.Store({
  modules: {
    authentication
  }
});
