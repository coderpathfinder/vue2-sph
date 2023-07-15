<template>
    <div class="pagination">
        <button @click="backPage" :disabled="pageNo==1">上一页</button>
        <div style="display: inline-block;" v-if="showMod == 0">
            <button :class="{nowPage:pageNo == item}" @click="changePageNo(item)" v-for="item in totalPage" :key="item">{{item}}</button>
            <!-- <button>1</button> -->
            <!-- <button>···</button>
            <button>3</button>
            <button>4</button>
            <button>5</button>
            <button>6</button>
            <button>7</button>
            <button>···</button> -->
            <!-- <button>{{totalPage}}</button> -->
        </div>
        <div style="display: inline-block;" v-if="showMod == 1">
            <button :class="{nowPage:pageNo == 1}" @click="changePageNo(1)">1</button>
            <button>···</button>
            <button :class="{nowPage:pageNo == (totalPage-continues+item)}" @click="changePageNo(totalPage-continues+item)" v-for="item in continues" :key="item">{{totalPage-continues+item}}</button>
        </div>
        <div style="display: inline-block;" v-if="showMod == 2">
            <button :class="{nowPage:pageNo == item}" @click="changePageNo(item)" v-for="item in continues" :key="item">{{item}}</button>
            <button>···</button>
            <button :class="{nowPage:pageNo == totalPage}" @click="changePageNo(totalPage)">{{totalPage}}</button>
        </div>
        <div style="display: inline-block;" v-if="showMod == 4">
            <button :class="{nowPage:pageNo == 1}" @click="changePageNo(1)">1</button>
            <button>···</button>
            <button :class="{nowPage:pageNo == (item+startContinue-1)}" @click="changePageNo(item+startContinue-1)" v-for="item in continues" :key="item">{{item+startContinue-1}}</button>
            <button>···</button>
            <button :class="{nowPage:pageNo == totalPage}" @click="changePageNo(totalPage)">{{totalPage}}</button>
        </div>
        <button @click="nextPage" :disabled="pageNo==totalPage">下一页</button>

        <button style="margin-left: 30px">共 {{total}} 条</button>
    </div>
</template>
  
<script>
import { mapGetters } from 'vuex';
export default {
    name: "Pagination",
    props: ['pageNoProp', 'pageSizeProp', 'continuesProp', 'changePage'],
    data() {
        return {
            pageNo: 1,
            pageSize: 10,
            continues: 3
        }
    },
    beforeMount() {
        if(this.total == 0) {
            return;
        }
        if(this.continuesProp<3) {
            this.continues = 3;
        }else {
            this.continues = this.continuesProp;
        }

        if(!this.continuesProp%2) {
            this.continues = this.continuesProp + 1;
        }else {
            this.continues = this.continuesProp;
        }

        if(this.pageNoProp<1) {
            this.pageNo = 1;
        }else {
            this.pageNo = this.pageNoProp;
        }

        if(this.pageSizeProp<0) {
            this.pageSize = 10;
        }else {
            this.pageSize = this.pageSizeProp;
        }

        if(this.pageNoProp>this.totalPage) {
            this.pageNo = this.totalPage;
        }
    },
    computed: {
        //通过请求服务器返回后存到vuex中的数据，子组件自己去从store中取，不要让父组件传递
        ...mapGetters(['total']),
        totalPage() {
            if(this.total == 0) {
                return 1;
            }
            return Math.ceil(this.total/this.pageSize);
        },
        startContinue() {
            return this.pageNo - parseInt(this.continues/2);
        },
        endContinue() {
            return this.pageNo + parseInt(this.continues/2);
        },
        leftDot() {
            return this.startContinue - 1 > 2;
        },
        rightDot() {
            return this.totalPage - this.endContinue > 2;
        },
        showMod() {
            if(this.leftDot && this.rightDot) {
                return 4;
            }
            if(this.leftDot&&(!this.rightDot)) {
                return 1;
            }
            if(this.rightDot&&(!this.leftDot)) {
                return 2;
            }
            return 0;
        }
    },
    methods: {
        changePageNo(pageNo) {
            if(this.pageNo != pageNo) {
                this.pageNo = pageNo;
                this.$bus.$emit(this.changePage, this.pageNo);
            }
        },
        backPage() {
            if(this.pageNo > 1) {
                this.pageNo = this.pageNo - 1;
                this.$bus.$emit(this.changePage, this.pageNo);
            }
        },
        nextPage() {
            if(this.pageNo < this.totalPage) {
                this.pageNo = this.pageNo + 1;
                this.$bus.$emit(this.changePage, this.pageNo);
            }
        }
    }
}
</script>
  
<style scoped lang="less">
.pagination {
    text-align: center;
    button {
        margin: 0 5px;
        background-color: #f4f4f5;
        color: #606266;
        outline: none;
        border-radius: 2px;
        padding: 0 4px;
        vertical-align: top;
        display: inline-block;
        font-size: 13px;
        min-width: 35.5px;
        height: 28px;
        line-height: 28px;
        cursor: pointer;
        box-sizing: border-box;
        text-align: center;
        border: 0;

        &[disabled] {
            color: #c0c4cc;
            cursor: not-allowed;
        }

        &.active {
            cursor: not-allowed;
            background-color: #409eff;
            color: #fff;
        }

        &.nowPage {
            color: #ea4a36;
        }
    }
}
</style>