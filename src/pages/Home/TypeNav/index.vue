<template>
    <div class="type-nav">
        <div class="container">
            <div @mouseleave="leaveIndex" @mouseenter="ifShow" @click="goSearch">
                <h2 class="all">全部商品分类</h2>
                <!-- 给包裹元素添加过渡动画，包裹元素必须有v-if或v-show -->
                <transition name="sort">
                    <div class="sort" v-show="navShow">
                        <div class="all-sort-list2">
                            <div class="item" v-for="(c1, index1) in categoryList" :key="c1.categoryId" :class="{cur:currentIndex1==index1}">
                                <h3 @mouseenter="changeIndex1(index1)">
                                    <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{c1.categoryName}}</a>
                                </h3>
                                <div class="item-list clearfix" :style="{display:currentIndex1==index1?'block':'none'}">
                                    <div class="subitem" v-for="(c2, index2) in c1.categoryChild" :key="c2.categoryId">
                                        <dl class="fore">
                                            <dt>
                                                <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{c2.categoryName}}</a>
                                            </dt>
                                            <dd>
                                                <em v-for="(c3, index3) in c2.categoryChild" :key="c3.categoryId">
                                                    <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{c3.categoryName}}</a>
                                                </em>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
            <nav class="nav">
                <a href="###">服装城</a>
                <a href="###">美妆馆</a>
                <a href="###">尚品汇超市</a>
                <a href="###">全球购</a>
                <a href="###">闪购</a>
                <a href="###">团购</a>
                <a href="###">有趣</a>
                <a href="###">秒杀</a>
            </nav>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import throttle from 'lodash/throttle';

export default {
    name: 'TypeNav',
    data () {
        return {
            currentIndex1: -1,
            navShow: false
        }
    },
    //组件挂载完毕后可以发送请求获取数据
    mounted() {
        //通知vuex执行指定的action发送请求
        // this.$store.dispatch('categoryList');
        this.navShow = this.show;
    },
    computed: {
        ...mapState({
            categoryList:state=> state.home.categoryList
        })
    },
    props: ['show'],
    methods: {
        // changeIndex1(index) {
        //     this.currentIndex1 = index;
        // },
        //节流
        changeIndex1: throttle(function (index) {
            this.currentIndex1 = index;
        }, 100),
        leaveIndex() {
            this.currentIndex1 = -1;
            if(!this.show) {
                this.navShow = false;
            }
        },
        ifShow() {
            //或者根据当前路由判断是否应该展示
            // if(this.$route.path != '/home') {
            //     this.navShow = false;
            // }
            if(!this.show) {
                this.navShow = true;
            }
        },
        goSearch(event) {
            let targetNode = event.target;
            let {categoryname, category1id, category2id, category3id,} = targetNode.dataset;
            if(categoryname) {
                //被点击的元素有categoryname属性，则是需要跳转的a标签
                let location = {
                    name: 'search',
                    query: {categoryName: categoryname}
                }
                if(category1id) {
                    location.query.category1id = category1id;
                }
                if(category2id) {
                    location.query.category2id = category2id;
                }
                if(category3id) {
                    location.query.category3id = category3id;
                }
                if(this.$route.params) {
                    location.params = this.$route.params;
                }
                //编程式路由跳转
                this.$router.push(location);
            }
        }
    }
    //防抖：前面的所有触发都被取消，最后一次执行在规定的时间之后才会触发，也就是说连续快速的触发，只会执行一次
    //节流：在规定的间隔时间内不会重复触发回调，只有大于这个时间间隔才会触发回调，把频繁触发变为少量触发
}
</script>

<style scoped lang="less">
.type-nav {
    border-bottom: 2px solid #e1251b;

    .container {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        position: relative;

        .all {
            width: 210px;
            height: 45px;
            background-color: #e1251b;
            line-height: 45px;
            text-align: center;
            color: #fff;
            font-size: 14px;
            font-weight: bold;
        }

        .nav {
            a {
                height: 45px;
                margin: 0 22px;
                line-height: 45px;
                font-size: 16px;
                color: #333;
            }
        }

        .sort {
            position: absolute;
            left: 0;
            top: 45px;
            width: 210px;
            height: 461px;
            position: absolute;
            background: #fafafa;
            z-index: 999;

            .all-sort-list2 {
                .item {
                    h3 {
                        line-height: 30px;
                        font-size: 14px;
                        font-weight: 400;
                        overflow: hidden;
                        padding: 0 20px;
                        margin: 0;

                        a {
                            color: #333;
                        }
                    }

                    .item-list {
                        display: none;
                        position: absolute;
                        width: 734px;
                        min-height: 460px;
                        background: #f7f7f7;
                        left: 210px;
                        border: 1px solid #ddd;
                        top: 0;
                        z-index: 9999 !important;

                        .subitem {
                            float: left;
                            width: 650px;
                            padding: 0 4px 0 8px;

                            dl {
                                border-top: 1px solid #eee;
                                padding: 6px 0;
                                overflow: hidden;
                                zoom: 1;

                                &.fore {
                                    border-top: 0;
                                }

                                dt {
                                    float: left;
                                    width: 54px;
                                    line-height: 22px;
                                    text-align: right;
                                    padding: 3px 6px 0 0;
                                    font-weight: 700;
                                }

                                dd {
                                    float: left;
                                    width: 415px;
                                    padding: 3px 0 0;
                                    overflow: hidden;

                                    em {
                                        float: left;
                                        height: 14px;
                                        line-height: 14px;
                                        padding: 0 8px;
                                        margin-top: 5px;
                                        border-left: 1px solid #ccc;
                                    }
                                }
                            }
                        }
                    }

                    //通过js代码控制二三级分类的显示和隐藏
                    // &:hover {
                    //     .item-list {
                    //         display: block;
                    //     }
                    // }
                }
                .cur {
                    background-color: #ea4a36;
                }
            }
        }
        //过渡动画样式
        //进入时的开始状态
        .sort-enter {
            height: 0px;
        }
        //进入时的结束状态
        .sort-enter-to {
            height: 461px;
        }
        //过渡动画效果设置
        .sort-enter-active, .sort-leave-active {
            transition: all .3s linear;
        }
        //退出时的结束状态
        .sort-leave {
            height: 461px;
        }
        //推出时的结束状态
        .sort-leave-to {
            height: 0px;
        }
    }
}
</style>