<script setup lang=ts>
  import { getNewsDetailAPI, type NewsDetail } from '@/service/home'
  import { onLoad } from '@dcloudio/uni-app'
  import { ref } from 'vue'

  const props = defineProps<{
    type?: string
    id: string
  }>()
  const newsDetail = ref<NewsDetail>()
  const getNewsDetail = async () => {
    const res = await getNewsDetailAPI(props.id)
    newsDetail.value = res.result
  }
  onLoad(() => {
    getNewsDetail()
  })
</script>

<template>
  <view class="art-detail">
    <view class="grid_bg">
      <view class="title">{{ newsDetail?.title }}</view>
      <view class="info">
        <text class="author">{{ newsDetail?.author }}</text>
        <text class="date">{{ newsDetail?.date_time }}</text>
      </view>
      <view v-html="newsDetail?.content"></view>
    </view>
  </view>
</template>

<style lang="scss">
  page {
    height: 100%;
  }

  .art-detail {
    width: 100%;
    height: 100%;
    padding: 20rpx;

    .grid_bg {
      width: 100%;
      height: 100%;
      background-image:
        linear-gradient(to right, #e8f5e9 1rpx, transparent 1rpx),
        linear-gradient(to bottom, #e8f5e9 1rpx, transparent 1rpx);
      background-size: 42rpx 42rpx;

      .title {
        padding: 20rpx;
        text-align: center;
        font-weight: 700;
      }

      .info {
        margin-top: 20rpx;
        padding: 20rpx;
        border: dashed 1px #eee;
        background-color: #f7f7f7;
        font-size: 26rpx;
      }
    }
  }
</style>
