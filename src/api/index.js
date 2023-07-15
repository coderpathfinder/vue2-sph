//统一管理项目api

import requests from "./request";
import mockQequests from "./mocks";

//三级联动接口
export const reqCategoryList = () => {
    return requests({url:'/product/getBaseCategoryList'});
}

//首页banner接口
export const reqBannerList = () => {
    return mockQequests({url:'/banner'});
}

//首页floor接口
export const reqFloorList = () => {
    return mockQequests({url:'/floor'});
}

//搜索结果
export const reqSearchList = (params) => {
    return requests({url:'/list', method:'post', data:params});
}

//详情模块商品的数据
export const reqDetailList = (skuId)=>requests({url:`/item/${skuId}`,method:'get'});

//将商品添加到购物车或修改购物车中商品的数量
export const reqAddOrUpdateShopCart = (skuId, skuNum) => requests({url:`/cart/addToCart/${skuId}/${skuNum}`,method:'post'});

//购物车列表
export const reqCartList = () => requests({url:'/cart/cartList', method:'get'});

//获取验证码接口
export const reqGetCode = (phone) => requests({url: `/user/passport/sendCode/${phone}`, method: 'get'});

//注册接口
export const reqRegister = (data) => requests({url: '/user/passport/register', method: 'post', data});

//登录接口
export const reqLogin = (data) => requests({url: '/user/passport/login', method: 'post', data});

//获取用户信息
export const reqUserInfo = () => requests({url: '/user/passport/auth/getUserInfo', method: 'get'});

//退出登录
export const reqLogout = () => requests({url: '/user/passport/logout', method: 'get'});

//获取用户地址信息
export const reqUserAddressList = () => requests({url: '/user/userAddress/auth/findUserAddressList', method: 'get'});

//获取用户商品清单
export const reqOrderInfo = () => requests({url: '/order/auth/trade', method: 'get'});

//提交订单
export const reqSubmitOrder = (orderId, data) => requests({url: `/order/auth/submitOrder?trade=${orderId}`, method: 'post', data});

//获取订单支付信息
export const reqOrderPayInfo = (orderId) => requests({url: `/payment/weixin/createNative/${orderId}`, method: 'get'});

//支付相关没做

//获取订单列表
export const reqOrderList = (page, limit) => requests({url: `/order/auth/${page}/${limit}`, method: 'get'});