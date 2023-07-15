<template>
  <!-- 放大镜 -->
  <div class="spec-preview">
    <img :src="imgObj.imgUrl" />
    <!-- <img src="../images/s1.png" /> -->
    <div class="event" @mousemove="handler"></div>
    <div class="big">
      <img :src="imgObj.imgUrl" ref="bigImg"/>
      <!-- <img src="../images/s1.png" /> -->
    </div>
    <!-- 鼠标遮罩 -->
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
  export default {
    name: "Zoom",
    props: ["skuImageList"],
    data() {
      return {
        currentIndex: 0,
      }
    },
    mounted() {
      this.$bus.$on('changeSkuImgIndex', (index)=>{
        this.currentIndex = index;
      });
    },
    computed: {
      imgObj() {
        return this.skuImageList[this.currentIndex]||{};
      },
    },
    methods: {
      handler(event) {
        let mask = this.$refs.mask;
        //offsetX
        let left = event.offsetX - mask.offsetWidth/2;
        if(left < 0) {
          left = 0;
        }
        if(left > mask.offsetWidth) {
          left = mask.offsetWidth;
        }
        let top = event.offsetY - mask.offsetHeight/2;
        if(top < 0) {
          top = 0;
        }
        if(top > mask.offsetHeight) {
          top = mask.offsetHeight;
        }
        mask.style.left = left+'px';
        mask.style.top = top+'px';
        //大图的移动方向和鼠标在小图内的移动方向相反，并且根据放大比例关系移动相同倍数的距离
        this.$refs.bigImg.style.left = -2 * left + 'px';
        this.$refs.bigImg.style.top = -2 * top + 'px';
      },
    },
  }
</script>

<style lang="less">
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
      /* 禁用遮罩的鼠标事件防止事件冒泡 */
      pointer-events: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>