import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vant from "vant";
import { Lazyload } from "vant";
import "vant/lib/index.css";
import "@/assets/css/global.less";
import "amfe-flexible/index.min.js";
import "@/utils/validate.js";
import * as filters from "@/utils/filters";
Object.keys(filters).forEach(item => {
    Vue.filter(item, filters[item]);
});

Vue.prototype.$sleep = time => {
    return new Promise(resolve => {
        window.setTimeout(() => {
            resolve();
        }, time);
    });
};
Vue.use(Lazyload);
Vue.use(Vant);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");