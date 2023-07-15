<template>
    <div class="order-content">
        <div class="title">
            <h3>我的订单</h3>
        </div>
        <div class="chosetype">
            <table>
                <thead>
                    <tr>
                        <th width="29%">商品</th>
                        <th width="31%">订单详情</th>
                        <th width="13%">收货人</th>
                        <th>金额</th>
                        <th>状态</th>
                        <th>操作</th>
                    </tr>
                </thead>
            </table>
        </div>
        <div class="orders">
            <table v-for="order in orderList" :key="order.orderId" class="order-item">
                <thead>
                    <tr>
                        <th colspan="5">
                            <span class="ordertitle">{{order.createTime}}　订单编号：{{order.outTradeNo}} <span
                                    class="pull-right delete"><img src="../images/delete.png"></span></span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(orderDetail, index) in order.orderDetailList" :key="orderDetail.id">
                        <td width="60%">
                            <div class="typographic">
                                <img style="width: 82px;" :src="orderDetail.imgUrl">
                                <a href="#" class="block-text">{{orderDetail.skuName}}</a>
                                <span>x{{orderDetail.skuNum}}</span>
                                <a href="#" class="service">售后申请</a>
                            </div>
                        </td>
                        <td v-if="index==0" rowspan="2" width="8%" class="center">{{order.consignee}}</td>
                        <td v-if="index==0" rowspan="2" width="13%" class="center">
                            <ul class="unstyled">
                                <li>总金额¥{{order.totalAmount}}</li>
                                <li>在线支付</li>

                            </ul>
                        </td>
                        <td v-if="index==0" rowspan="2" width="8%" class="center">
                            <a href="#" class="btn">{{order.orderStatusName}} </a>
                        </td>
                        <td v-if="index==0" rowspan="2" width="13%" class="center">
                            <ul class="unstyled">
                                <li>
                                    <a href="mycomment.html" target="_blank">评价|晒单</a>
                                </li>

                            </ul>
                        </td>
                    </tr>
                    <!-- <tr>
                        <td width="50%">
                            <div class="typographic">
                                <img src="../images/goods.png">
                                <a href="#" class="block-text">包邮 正品玛姬儿压缩面膜无纺布纸膜100粒 送泡瓶面膜刷喷瓶 新款</a>
                                <span>x1</span>
                                <a href="#" class="service">售后申请</a>
                            </div>
                        </td>
                    </tr> -->
                </tbody>
            </table>
        </div>
        <div class="choose-order">
            <Pagination
            :pageNoProp="page"
            :pageSizeProp="limit"
            :continuesProp="5"
            :changePage="'myOrderChangePage'"
            />
            <!-- <div class="pagination">
                <ul>
                    <li class="prev disabled">
                        <a href="javascript:">«上一页</a>
                    </li>
                    <li class="page actived">
                        <a href="javascript:">1</a>
                    </li>
                    <li class="page">
                        <a href="javascript:">2</a>
                    </li>
                    <li class="page">
                        <a href="javascript:">3</a>
                    </li>
                    <li class="page">
                        <a href="javascript:">4</a>
                    </li>

                    <li class="next disabled">
                        <a href="javascript:">下一页»</a>
                    </li>
                </ul>
                <div>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;共2页&nbsp;</span>
                </div>
            </div> -->
        </div>
    </div>
</template>

<script>
import Pagination from '@/components/Pagination';
export default {
    name: 'MyOrder',
    components: {
        Pagination
    },
    data() {
        return {
            page: 1,
            limit: 3,
            pages: 0,
            total: 0,
            orderList: [],
        }
    },
    mounted() {
        this.getOrderList(this.page, this.limit);
        this.$bus.$on('myOrderChangePage', (page)=>{
            this.page = page;
            this.getOrderList(page, this.limit);
        });
    },
    methods: {
        async getOrderList(page, limit) {
            let result = await this.$API.reqOrderList(page, limit);
            if(result.code == 200) {
                this.pages = result.data.pages;
                this.total = result.data.total;
                this.orderList = result.data.records;
            }else {
                alert(result.message);
            }
        },
    },
}
</script>

<style lang="less" scoped>
.order-content {
    margin: 0 20px;
    color: #666;

    //标题
    .title {
        margin-bottom: 22px;
        border: 1px solid #ddd;

        h3 {
            padding: 12px 10px;
            font-size: 15px;
            background-color: #f1f1f1;

        }
    }

    //表头
    .chosetype {
        margin-bottom: 15px;
        color: #666;

        table {
            border: 1px solid #e6e6e6;
            border-collapse: separate;
            border-radius: 2px;
            width: 100%;
            max-width: 100%;
            border-spacing: 0;

            th {
                padding: 6px 8px;
                color: #666;
                font-weight: 700;
                vertical-align: bottom;
                background-color: #f4f4f4;
                line-height: 18px;
                border-bottom: 1px solid #e6e6e6;
                font-size: 12px;
                text-align: left;
            }
        }
    }

    // 表单内容
    .orders {
        font-size: 12px;

        a {
            &:hover {
                color: #4cb9fc;
            }
        }

        table {
            border: 1px solid #e6e6e6;
            border-collapse: collapse;
            border-radius: 2px;
            width: 100%;
            margin-bottom: 18px;
            max-width: 100%;

            th {
                padding: 6px 8px;
                line-height: 18px;
                text-align: left;
                vertical-align: bottom;
                background-color: #f4f4f4;
                font-size: 12px;
                color: #666;

                .pull-right {
                    float: right;
                    cursor: pointer;

                    img {
                        margin-right: 10px;
                        vertical-align: middle;
                    }
                }
            }

            td {
                font-size: 12px;
                color: #666;
                padding: 6px 8px;
                line-height: 18px;
                text-align: left;
                vertical-align: middle;
                border: 1px solid #e6e6e6;

                &.center {
                    text-align: center;
                }

                .typographic {
                    img {
                        float: left;
                        margin-right: 10px;
                    }

                    a {
                        float: left;
                        min-width: 80px;
                        max-width: 250px;
                        color: #e1251b;

                        &.service {
                            color: #666;
                        }
                    }

                    span {
                        float: left;
                        min-width: 80px;
                        max-width: 250px;
                        text-align: center;
                    }

                }
            }

        }
    }

    // 分页
    .choose-order {
        .pagination {
            margin: 38px 0;

            ul {
                font-size: 0;
                display: inline-block;

                li {
                    display: inline-block;
                    padding: 4px 9px;
                    font-size: 14px;
                    border: 1px solid #e0e9ee;

                    &.prev,
                    &.next {
                        background-color: #fafafa;
                    }

                    &.prev {
                        border-right-color: #28a3ef;
                    }

                    &.page {
                        border-color: #28a3ef;
                        border-left: 0;

                        &.actived {
                            background-color: #28a3ef;

                            a {
                                color: #fff;
                            }

                        }
                    }
                }
            }

            div {
                display: inline-block;
                font-size: 14px;
                color: #333;
            }
        }
    }
}
</style>