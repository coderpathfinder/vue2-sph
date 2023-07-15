//首页模块store

import {reqUserAddressList, reqOrderInfo} from "@/api";

const state = {
    tradeNo: '',
    totalNum: 0,
    originalTotalAmount: 0,
    userAddressList: [],
    orderInfoList: [],
};
const mutations = {
    GET_USER_ADDRESS_LIST(state, data) {
        state.userAddressList = data;
    },
    GET_USER_ORDER_INFO(state, data) {
        state.userAddressList = data.userAddressList;
        state.orderInfoList = data.detailArrayList;
        state.tradeNo = data.tradeNo;
        state.totalNum = data.totalNum;
        state.originalTotalAmount = data.originalTotalAmount;
    },
};
const actions = {
    //获取用户地址信息
    async getUserAddressList({commit}) {
        let result = await reqUserAddressList();
        if (result.code==200) {
            commit("GET_USER_ADDRESS_LIST", result.data);
            return 'ok';
        }else {
            return Promise.reject(new Error('failed'));
        }
    },
    //获取用户地址信息
    async getUserOrderInfo({commit}) {
        let result = await reqOrderInfo();
        if (result.code==200) {
            commit("GET_USER_ORDER_INFO", result.data);
            return 'ok';
        }else {
            return Promise.reject(new Error('failed'));
        }
    },
};
const getters = {
    // 这里的state是当前模块的state而不是整个vuex的state
    // userToken(state) {
    //     if(!state.token) {
    //         state.token = localStorage.getItem("APP_USER_TOKEN")||'';
    //     }
    //     return state.token;
    // },
};


export default {
    state,
    mutations,
    actions,
    getters
};