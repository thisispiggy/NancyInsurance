import Vue from "vue";
import App from "./App.vue";
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import moment from "moment";

Vue.use(Buefy);

Vue.config.productionTip = false;

new Vue({
  moment,
  render: (h) => h(App),
}).$mount("#app");
