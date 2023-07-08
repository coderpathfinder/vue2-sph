//首页模块store

import {reqSearchList} from "@/api";

const state = {
    searchList: []
};
const mutations = {
    SEARCH_LIST(state, searchList) {
        state.searchList = searchList;
    }
};
const actions = {
    async getSearchList({commit}, params={}) {
        let result = await reqSearchList(params);
        if (result.code==200) {
            commit("SEARCH_LIST", result.data);
        }
    }
};
const getters = {
    //这里的state是当前模块的state而不是整个vuex的state
    attrsList(state) {
        return state.searchList.attrsList||[];
    },
    goodsList(state) {
        return state.searchList.goodsList||[];
    },
    trademarkList(state) {
        return state.searchList.trademarkList||[];
    },
    pageNo(state) {
        return state.searchList.pageNo||1;
    },
    pageSize(state) {
        return state.searchList.pageSize||0;
    },
    total(state) {
        return state.searchList.total||0;
    },
    totalPages(state) {
        return state.searchList.totalPages||0;
    }
};


export default {
    state,
    mutations,
    actions,
    getters
};