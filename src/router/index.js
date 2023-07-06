//路由配置

import Vue from "vue";
import VueRouter from "vue-router";

//使用插件
Vue.use(VueRouter);

//引入路由组件
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Search from "@/pages/Search";

//重写push｜replace方法防止在使用编程式路由时，跳转到当前路由并且参数不变的情况下，多次执行会造成的控制台出现错误警告
//先把原始的push方法保存一份
let originPush = VueRouter.prototype.push;

//重写push方法
VueRouter.prototype.push = function(location, resolve, reject) {
    if(resolve && reject) {
        //如果成功或失败的回调函数都传了，则调用原始方法并传入这两个回调
        //使用call函数可以修改被调用函数的上下文(this)，因为原始push方法的this是VueRouter类的实例对象
        originPush.call(this, location, resolve, reject);
    }else {
        //没传则手动传入两个空方法
        originPush.call(this, location, ()=>{}, ()=>{});
    }
}

//重写replace方法
let originReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function(location, resolve, reject) {
    if(resolve && reject) {
        originReplace.call(this, location, resolve, reject);
    }else {
        originReplace.call(this, location, ()=>{}, ()=>{});
    }
}

//配置路由
export default new VueRouter({
    routes: [
        {
            path: '/home',
            component: Home,
            meta: {
                footerDisplay: false
            }
        },
        {
            path: '/login',
            component: Login,
            meta: {
                footerDisplay: true
            }
        },
        {
            path: '/register',
            component: Register,
            meta: {
                footerDisplay: true
            }
        },
        {
            name: 'search',
            path: '/search/:keyword?',
            component: Search,
            meta: {
                footerDisplay: false
            },
            //路由组件的函数式传参方式，路由组件通过props接收
            // props: ($route)=>({keyword: $route.params.keyword, kw: $route.query.kw})
        },
        //重定向到/home
        {
            path: '*',
            redirect: '/home',
            meta: {
                footerDisplay: false
            }
        }
    ],
})