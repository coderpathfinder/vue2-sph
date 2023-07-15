<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- <li class="with-x">手机</li> -->
            <!-- 搜索关键字面包屑 -->
            <li v-if="keyword" class="with-x with-y">{{keyword}}<i @click="clearKeyword">×</i></li>
            <!-- 分类名称面包屑 -->
            <li v-if="categoryName" class="with-x with-y">{{categoryName}}<i @click="clearCategoryName">×</i></li>
            <!-- 品牌名称面包屑 -->
            <li v-if="trademark" class="with-x with-y">{{trademark}}<i @click="trademark = undefined">×</i></li>
            <li v-for="(prop, index) in props" :key="index" class="with-x">
              {{prop}}<i @click="removeProp(prop)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li class="active">
                  <a href="#">综合</a>
                </li>
                <li>
                  <a href="#">销量</a>
                </li>
                <li>
                  <a href="#">新品</a>
                </li>
                <li>
                  <a href="#">评价</a>
                </li>
                <li>
                  <a href="#">价格⬆</a>
                </li>
                <li>
                  <a href="#">价格⬇</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- <a href="item.html" target="_blank"><img :src="good.defaultImg" /></a> -->
                    <router-link :to="`/detail/${good.id}`"><img v-lazy="good.defaultImg" /></router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥ </em>
                      <i>{{good.price}}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" :title="good.title">{{good.title}}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <Pagination v-if="total" 
          :pageNoProp="searchParams.pageNo" 
          :pageSizeProp="searchParams.pageSize" 
          :continuesProp="5"
          :changePage="'changePageNo'"/>
          <!-- <div class="fr page">
            <div class="sui-pagination clearfix">
              <ul>
                <li class="prev disabled">
                  <a href="#">«上一页</a>
                </li>
                <li class="active">
                  <a href="#">1</a>
                </li>
                <li>
                  <a href="#">2</a>
                </li>
                <li>
                  <a href="#">3</a>
                </li>
                <li>
                  <a href="#">4</a>
                </li>
                <li>
                  <a href="#">5</a>
                </li>
                <li class="dotted"><span>...</span></li>
                <li class="next">
                  <a href="#">下一页»</a>
                </li>
              </ul>
              <div><span>共10页&nbsp;</span></div>
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//使用vuex计算属性，注意getters和state不一样，getters不划分模块
import { mapGetters, mapState } from 'vuex';
import SearchSelector from './SearchSelector/SearchSelector';
import Pagination from '@/components/Pagination';
export default {
  name: 'Search',
  beforeMount() {
    this.initSearchParams();
  },
  mounted() {
    //向全局事件总线注册清除搜索关键字函数
    this.$bus.$on('addSearchProp', (prop) => {
        this.addProp(prop);
    });
    this.$bus.$on('changeTrademark', (prop) => {
        this.changeTrademark(prop);
    });
    this.$bus.$on('changePageNo', (prop) => {
        this.changePageNo(prop);
    });
    this.getData();
  },
  watch: {
    $route(newValue, oldValue) {
      this.initSearchParams();
      // Object.assign(this.params, this.$route.query, this.$route.params);
      this.getData();
    },
    props(newValue, oldValue) {
      this.getData();
    },
    trademark(newValue, oldValue) {
      this.getData();
    }
  },
  data() {
    return {
      searchParams: {
        //一级分类id
        category1Id: '',
        //二级分类id
        category2Id: '',
        //三级分类id
        category3Id: '',
        //分类名字
        categoryName: '',
        //关键字
        keyword: '',
        //排序规则
        order: '',
        //页码
        pageNo: 1,
        //每页数量
        pageSize: 10,
        //平台售卖属性
        props: [],
        //品牌
        trademark: '',
      }
    }
  },
  //使用vuex的getters时，不分模块
  computed: {
    ...mapGetters(['attrsList', 'goodsList', 'trademarkList']),
    ...mapState({total: state=>state.search.searchList.total}),
    keyword() {
      return this.$route.params.keyword||'';
    },
    categoryName() {
      return this.$route.query.categoryName||'';
    },
    trademark: {
      get() {
        return this.searchParams.trademark;
      },
      set(trademark) {
        this.searchParams.trademark = trademark;
      }
    },
    props: {
      get() {
        return this.searchParams.props;
      },
      set(prop) {
        this.searchParams.props.push(prop);
      }
    }
  },
  components: {
    SearchSelector,
    Pagination
  },
  methods: {
    getData() {
      this.$store.dispatch('getSearchList', this.searchParams);
    },
    initSearchParams() {
      this.searchParams.category1Id = this.$route.query.category1Id;
      this.searchParams.category2Id = this.$route.query.category2Id;
      this.searchParams.category3Id = this.$route.query.category3Id;
      this.searchParams.categoryName = this.$route.query.categoryName;
      this.searchParams.keyword = this.$route.params.keyword;
      this.searchParams.order = '';
      this.searchParams.pageNo = 1;
      this.searchParams.pageSize = 10;
      this.searchParams.props = [];
      this.searchParams.trademark = '';
    },
    changeTrademark(newValue) {
      this.searchParams.trademark = newValue;
    },
    clearKeyword() {
      this.$route.params.keyword = undefined;
      this.$bus.$emit('clearKeyword');
      console.log(this.$route);
      this.$router.push({name:'search', params: this.$route.params, query: this.$route.query});
    },
    clearCategoryName() {
      this.$route.query.categoryName = undefined;
      this.$router.push({name:'search', params: this.$route.params});
      console.log(this.$route);
    },
    addProp(prop) {
      if(this.props.some(item=>item === prop)) {
        return;
      }
      this.props = prop;
    },
    removeProp(prop) {
      if(!this.searchParams.props.some(item=>item === prop)) {
        return;
      }
      this.searchParams.props = this.searchParams.props.filter(item=>item!=prop);
    },
    changePageNo(newValue) {
      this.searchParams.pageNo = newValue;
      this.getData();
    },
  }
}
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          &.with-y {
            font-weight: 500;
          }

          &:hover {
            color: #28a3ef;
          }

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
            &:hover {
              color: #e1251b;
            }
          }
          
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>