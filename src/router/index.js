//路由配置

import Vue from "vue";
import VueRouter from "vue-router";

//使用插件
Vue.use(VueRouter);

//引入路由组件
// import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Search from "@/pages/Search";
import Detail from "@/pages/Detail";
import AddCartSuccess from "@/pages/AddCartSuccess";
import ShowCart from '@/pages/ShopCart';
import Trade from '@/pages/Trade';
import Pay from '@/pages/Pay';
import Center from '@/pages/Center';
import MyOrder from '@/pages/Center/MyOrder';
import GroupOrder from '@/pages/Center/GroupOrder';

import store from "@/store";

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
const router = new VueRouter({
    routes: [
        {
            path: '/home',
            //路由懒加载
            component: () => import('@/pages/Home'),
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
        {
            path: '/detail/:skuId',
            component: Detail,
            meta: {
                footerDisplay: false
            }
        },
        {
            name: 'addcartsuccess',
            path: '/addcartsuccess',
            component: AddCartSuccess,
            meta: {
                footerDisplay: false
            }
        },
        {
            path: '/showcart',
            component: ShowCart,
            meta: {
                footerDisplay: false
            }
        },
        {
            path: '/trade',
            component: Trade,
            meta: {
                footerDisplay: false
            },
            //路由独享守卫
            beforeEnter: (to, from, next) => {
                if(from.path == '/showcart') {
                    //从购物车页面来才允许跳转到交易页，否则不放行
                    next();
                }else {
                    //回到from中去
                    next(false);
                }
            },
        },
        {
            path: '/pay',
            component: Pay,
            meta: {
                footerDisplay: false
            },
            //路由独享守卫，也可以使用组件内守卫达到相同的效果：beforeRouteEnter、beforeRouteUpdate、beforeRouteLeave
            beforeEnter: (to, from, next) => {
                if(from.path == '/trade') {
                    //从交易页面来才允许跳转到支付页，否则不放行
                    next();
                }else {
                    //回到from中去
                    next(false);
                }
            },
        },
        {
            path: '/center',
            component: Center,
            meta: {
                footerDisplay: false
            },
            children: [
                {
                    path: 'myorder',
                    component: MyOrder,
                },
                {
                    path: 'grouporder',
                    component: GroupOrder,
                },
                {
                    path: '/center',
                    redirect: '/center/myorder'
                }
            ],
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
    //路由跳转后滚动条行为
    scrollBehavior (to, from, savedPosition) {
        //y轴在最上方
        return {y: 0};
    }
});

//全局路由守卫
router.beforeEach(async (to, from, next) => {
    let token = store.getters.userToken;
    let username = store.state.user.loginName;
    console.log('token:'+token);
    console.log(store.state.user.loginName);
    console.log('username:'+store.state.user.loginName);
    console.log('to.path:'+to.path);
    if(token&&to.path == '/login') {
        //有token并且要去登录页，转到首页
        console.log('有token并且要去登录页，转到首页');
        next('/home');
    }
    if(token&&to.path != '/login') {
        //有token并且要去的不是登录页，判断是否有用户信息，有则直接放行
        if(username) {
            console.log('有用户信息，放行');
            next();
        }else{
            //没有用户信息，尝试用token获取用户信息，获取成功后放行
            try {
                await store.dispatch('getUserInfo');
                console.log('没有用户信息，获取到用户信息，放行');
                next();
            } catch (error) {
                //获取失败后表明token失效，清除用户信息，转到登录页
                await store.dispatch('logout');
                console.log('没有用户信息，获取用户信息失败，跳转到登录页');
                router.$loginFrom = to.path;
                next('/login');
            }
        }
    }
    //没有token，暂时全部放行
    if((!token)&&(to.path == '/trade'||to.path == '/pay'||to.path == '/paysuccess'||to.path.indexOf('/center')!==-1)){
        console.log('没有token，不能去个人中心、支付页、支付成功页');
        //也可以使用query参数携带登录后要跳转的地址
        router.$loginFrom = to.path;
        next('/login');
    }else {
        if(!token) {
            console.log('没有token，可以去'+to.path);
            next();
        }
    }
    
});

export default router;