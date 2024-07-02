<script setup lang="ts">
  import { ref } from 'vue'
  const activeIndex = ref(0)
  const handleChange: UniHelper.SwiperOnChange = (e) => {
    activeIndex.value = e.detail.current
  }
</script>

<template>
  <view class="carousel">
    <swiper :circular="true" :autoplay="true" :interval="3000" @change="handleChange">
      <swiper-item>
        <navigator url="/pages/index/index" hover-class="none" class="navigator">
          <image mode="aspectFill" class="image" src="@/static/imgs/news1.jpg"></image>
        </navigator>
      </swiper-item>
      <swiper-item>
        <navigator url="/pages/index/index" hover-class="none" class="navigator">
          <image mode="aspectFill" class="image" src="@/static/imgs/news2.png"></image>
        </navigator>
      </swiper-item>
    </swiper>
    <!-- 指示点 -->
    <!-- <view class="indicator">
      <text v-for="(item, index) in 2" :key="item" class="dot" :class="{ active: index === activeIndex }"></text>
    </view> -->
    <view class="indicator">
      <text class="count">{{ activeIndex + 1 }}/2</text>
      <text class="title ellipsis1">title...</text>
    </view>
  </view>
</template>

<style lang="scss">
  :host {
    display: block;
    height: 370rpx;
  }

  /* 轮播图 */
  .carousel {
    height: 100%;
    position: relative;
    overflow: hidden;
    transform: translateY(0);
    background-color: #efefef;

    .indicator {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 48rpx;
      background-color: rgba($color: #333, $alpha: 0.7);
      color: #fff;
      display: flex;
      align-items: center;
      box-sizing: border-box;

      .count {
        width: 82rpx;
        text-align: center;
      }

      .title {
        flex: 1;
        margin-left: 8rpx;

      }
    }

    // .indicator {
    //   position: absolute;
    //   left: 0;
    //   right: 0;
    //   bottom: 16rpx;
    //   display: flex;
    //   justify-content: center;

    //   .dot {
    //     width: 30rpx;
    //     height: 6rpx;
    //     margin: 0 8rpx;
    //     border-radius: 6rpx;
    //     background-color: rgba(255, 255, 255, 0.4);
    //   }

    //   .active {
    //     background-color: #fff;
    //   }
    // }

    .navigator,
    .image {
      width: 100%;
      height: 100%;
    }
  }
</style>