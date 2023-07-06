import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import router from "@/router";

//注册三级联动全局组件
import TypeNav from "@/pages/Home/TypeNav";

//注册全局组件
Vue.component(TypeNav.name, TypeNav);

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
