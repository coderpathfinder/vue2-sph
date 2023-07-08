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