<script setup lang="ts">
  import { getNewsCarouselAPI, type NewsList } from '@/service/home'
  import { onLoad } from '@dcloudio/uni-app'
  import { ref } from 'vue'

  const activeIndex = ref(0)
  const handleChange: UniHelper.SwiperOnChange = (e) => {
    activeIndex.value = e.detail.current
  }
  // 请求接口，获取轮播图数据
  const carouselData = ref<NewsList[]>([])
  const getNewsCarouselData = async () => {
    const res = await getNewsCarouselAPI()
    carouselData.value = res.result
  }

  onLoad(() => {
    getNewsCarouselData()
  })

</script>

<template>
  <view class="carousel">
    <swiper :circular="true" :autoplay="true" :interval="5000" @change="handleChange">
      <swiper-item v-for="item in carouselData" :key="item.id">
        <navigator :url="`/pages/details/art-detail?type=news&id=${item.id}`" hover-class="none" class="navigator">
          <image mode="aspectFill" class="image" :src="item.imgUrl" />
        </navigator>
      </swiper-item>
    </swiper>
    <view class="indicator">
      <text class="count">{{ activeIndex + 1 }}/{{ carouselData.length }}</text>
      <text class="title ellipsis1">{{ carouselData[activeIndex]?.title }}</text>
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
        font-size: 24rpx;
        margin-left: 8rpx;

      }
    }

    .navigator,
    .image {
      width: 100%;
      height: 100%;
    }
  }
</style>