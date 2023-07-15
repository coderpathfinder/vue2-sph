import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import router from "@/router";

import store from '@/store';

//注册三级联动全局组件
import TypeNav from "@/pages/Home/TypeNav";

import { Button, MessageBox } from 'element-ui';

import VueLazyload from 'vue-lazyload';

//注册全局组件
Vue.component(Button.name, Button);
Vue.component(TypeNav.name, TypeNav);

//引入mockServe.js mock数据
import '@/mock/mockServe';

//引入swiper css
import "swiper/css/swiper.css";

//统一引入api模块
import * as API from '@/api';

//引入图片
import loadingImg from '@/assets/logo.png';

//引入表单检验插件
import '@/plugins/validate';

//注册插件
Vue.use(VueLazyload, {
  loading: loadingImg
});

new Vue({
  render: h => h(App),
  //配置全局事件总线
  beforeCreate(){
    Vue.prototype.$bus = this;
    //将api模块注册在vue组件实例的原型对象上，这样所有组件都能够直接使用
    Vue.prototype.$API = API;
    //element-ui第二种注册方式
    Vue.prototype.$msgbox = MessageBox;
    Vue.prototype.$alert = MessageBox.alert;
  },
  router,
  //注册store，注册后组件实例上会多一个$store属性
  store
}).$mount('#app')
