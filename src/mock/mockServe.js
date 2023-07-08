//引入mock模块
import Mock from 'mockjs';

//webpack默认对外暴露图片、JSON格式数据，不需要export
import banner from './banner.json';
import floor from './floor.json';

//mock数据
Mock.mock('/mock/banner', {code:200, data:banner});
Mock.mock('/mock/floor', {code:200, data:floor});