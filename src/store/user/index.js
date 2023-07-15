//首页模块store

import {reqGetCode, reqRegister, reqLogin, reqUserInfo, reqLogout} from "@/api";

const state = {
    code: '',
    userName: '',
    nickName: '',
    token: '',
    userId: 0,
    loginName: ''
};
const mutations = {
    GET_CODE(state, code) {
        state.code = code;
    },
    USER_LOGIN(state, data) {
        state.userName = data.name;
        state.nickName = data.nickName;
        state.token = data.token;
        state.userId = data.userId;
        localStorage.setItem("APP_USER_TOKEN", data.token);
    },
    GET_USER_INFO(state, data) {
        state.loginName = data;
    },
    USER_LOGOUT(state) {
        state.userName = '';
        state.nickName = '';
        state.token = '';
        state.userId = 0;
        state.user = {};
        state.loginName = '';
        localStorage.removeItem('APP_USER_TOKEN');
    }
};
const actions = {
    //获取验证码
    async getCode({commit}, phone) {
        let result = await reqGetCode(phone);
        if (result.code==200) {
            commit("GET_CODE", result.data);
            return 'ok';
        }else {
            return Promise.reject(new Error('failed'));
        }
    },
    //用户注册
    async userRegister({commit}, data) {
        let result = await reqRegister(data);
        if (result.code==200) {
            return 'ok';
        }else {
            return Promise.reject(new Error('failed'));
        }
    },
    //用户注册
    async userLogin({commit}, data) {
        let result = await reqLogin(data);
        if (result.code==200) {
            commit("USER_LOGIN", result.data);
            return 'ok';
        }else {
            return Promise.reject(new Error('failed'));
        }
    },
    //获取用户信息
    async getUserInfo({commit}) {
        let result = await reqUserInfo();
        if (result.code==200) {
            commit("GET_USER_INFO", result.data.nickName);
            return 'ok';
        }else {
            return Promise.reject(new Error('failed'));
        }
    },
    //退出登录
    async logout({commit}) {
        let result = await reqLogout();
        if (result.code==200) {
            commit("USER_LOGOUT");
            return 'ok';
        }else {
            return Promise.reject(new Error('failed'));
        }
    }
};
const getters = {
    // 这里的state是当前模块的state而不是整个vuex的state
    userToken(state) {
        if(!state.token) {
            state.token = localStorage.getItem("APP_USER_TOKEN")||'';
        }
        return state.token;
    },
};


export default {
    state,
    mutations,
    actions,
    getters
};