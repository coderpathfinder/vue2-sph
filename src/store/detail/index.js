//商品详情页模块store

import {reqDetailList, reqAddOrUpdateShopCart} from "@/api";

import { getUUID } from "@/utils/uuid_token";

const state = {
    detailInfo: {},
    //游客临时身份
    uuid_token: getUUID(),
};
const mutations = {
    GET_GOOD_INFO(state, detailInfo) {
        state.detailInfo = detailInfo;
    }
};
const actions = {
    async getGoodInfo({commit}, skuId) {
        let result = await reqDetailList(skuId);
        if (result.code==200) {
            commit("GET_GOOD_INFO", result.data);
        }
    },
    async addOrUpdateShopCart({commit}, {skuId, skuNum}) {
        let result = await reqAddOrUpdateShopCart(skuId, skuNum);
        if(result.code == 200) {
            return 'ok';
        }else {
            return Promise.reject(new Error('failed'));
        }
    }
};
const getters = {
    //这里的state是当前模块的state而不是整个vuex的state
    categoryView(state) {
        return state.detailInfo.categoryView||{};
    },
    skuInfo(state) {
        return state.detailInfo.skuInfo||{};
    },
    spuSaleAttrList(state) {
        return state.detailInfo.spuSaleAttrList||[];
    }
};


export default {
    state,
    mutations,
    actions,
    getters
};