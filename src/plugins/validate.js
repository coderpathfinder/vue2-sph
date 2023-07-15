//vee-validate插件 表单验证
import Vue from "vue";
import VeeValidate from "vee-validate";
import zh_CN from 'vee-validate/dist/locale/zh_CN';

Vue.use(VeeValidate);

//表单验证规则
//设置表单验证提示信息为中文
VeeValidate.Validator.localize('zh_CN', {
    messages: {
        ...zh_CN.messages,
        is: (field) => `${field}必须于密码相同`
    },
    attributes: {
        phone: '手机号',
        code: '验证码',
        password: '密码',
        password2: '确认密码',
        agree: '协议',
    }
});

//自定义校验规则
VeeValidate.Validator.extend('checkedRule', {
    validate: (value) => {
        return value;
    },
    getMessage: (field) => field + '必须同意'
});