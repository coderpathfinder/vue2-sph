//二次封装axios
import axios from 'axios';
//引入进度条插件
import nprogress from 'nprogress';
//引入进度条样式
import "nprogress/nprogress.css";

const requests = axios.create({
    baseURL:"/mock",
    timeout: 5000,

});

//请求拦截器
requests.interceptors.request.use((config)=>{
    nprogress.start();
    return config;
});

//响应拦截器
requests.interceptors.response.use((res)=>{
    nprogress.done();
    return res.data;
}, (error)=>{
    return Promise.reject(new Error('request failed!'))
});

export default requests;