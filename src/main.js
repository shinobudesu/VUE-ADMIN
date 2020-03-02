import Vue from 'vue'
import App from './App.vue'
import 'normalize.css/normalize.css' // a modern alternative to CSS resets
import router from "@/router/index.js"
import store from "@/store/index.js"
import api from "@/api/index.js"
// import tools from "@/utils/tools.js"
import VueCookie from "vue-cookie"
import _ from 'lodash'
import dayjs from 'dayjs'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/utils/rem.js'

Vue.config.productionTip = false;
Vue.use(VueCookie);
Vue.use(ElementUI);
Vue.prototype.$api = api; // 将api挂载到vue的原型上
// Vue.prototype.$tools = tools; // 将tools挂载到vue的原型上
Vue.prototype.$loadsh = _; // 将loadsh挂载到vue的原型上
Vue.prototype.$dayjs = dayjs; // 将dayjs挂载到vue的原型上
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')