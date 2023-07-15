//商品详情页模块store

import {reqCartList} from "@/api";

const state = {
    cartResultList: []
};
const mutations = {
    GET_CART_LIST(state, cartList) {
        state.cartResultList = cartList;
    }
};
const actions = {
    async getCartList({commit}) {
        let result = await reqCartList();
        if (result.code==200) {
            commit("GET_CART_LIST", result.data);
        }
    },
};
const getters = {
    //这里的state是当前模块的state而不是整个vuex的state
    cartList(state) {
        return (state.cartResultList[0]||{}).cartInfoList||[];
    },
};


export default {
    state,
    mutations,
    actions,
    getters
};