<template>
  <div class="swiper-container" ref="cur">
    <div class="swiper-wrapper">
      <div v-for="(skuImage, index) in skuImageList" :key="skuImage.id" class="swiper-slide" @click="changeIndex(index)">
        <!-- <img src="../images/s1.png"> -->
        <img :class="{active:currentIndex==index}" :src="skuImage.imgUrl">
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>

  import Swiper from 'swiper'
  export default {
    name: "ImageList",
    props: ['skuImageList'],
    data() {
      return {
        currentIndex: 0,
      }
    },
    watch: {
      skuImageList(newValue, oldValue) {
        this.$nextTick(()=>{
          //初始化Swiper类的实例
          new Swiper(this.$refs.cur, {
            //设置轮播图防线
            // direction: "horizontal",
            // loop:true,
            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
            //展示区域同时展示三张图片
            slidesPerView: 3,
            slidesPerGroup: 1
          });
        });
      }
    },
    methods: {
      changeIndex(index) {
        this.currentIndex = index;
        //通知放大镜组件图片索引值修改
        this.$bus.$emit('changeSkuImgIndex', index);
      },
    },
  }
</script>

<style lang="less" scoped>
  .swiper-container {
    height: 56px;
    width: 412px;
    box-sizing: border-box;
    padding: 0 12px;

    .swiper-slide {
      width: 56px;
      height: 56px;

      img {
        width: 100%;
        height: 100%;
        border: 1px solid #ccc;
        padding: 2px;
        width: 50px;
        height: 50px;
        display: block;

        &.active {
          border: 2px solid #f60;
          padding: 1px;
        }

        &:hover {
          border: 2px solid #f60;
          padding: 1px;
        }
      }
    }

    .swiper-button-next {
      left: auto;
      right: 0;
    }

    .swiper-button-prev {
      left: 0;
      right: auto;
    }

    .swiper-button-next,
    .swiper-button-prev {
      box-sizing: border-box;
      width: 12px;
      height: 56px;
      background: rgb(235, 235, 235);
      border: 1px solid rgb(204, 204, 204);
      top: 0;
      margin-top: 0;
      &::after {
        font-size: 12px;
      }
    }
  }
</style>