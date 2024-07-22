<script setup lang=ts>
  import { getResidentDetailAPI } from '@/service/home'
  import type { ResidentItem } from '@/types/home'
  import { onLoad } from '@dcloudio/uni-app'
  import { ref } from 'vue'


  // 接收路径参数
  const query = defineProps<{
    id?: number
    addr?: string
    room?: string
    params?: string
  }>()
  // 组装请求参数
  const params = { ...JSON.parse(query.params!), room_num: query.room }
  // 请求家庭成员信息
  const familyMemList = ref<ResidentItem[]>()
  const getResidentDetail = async () => {
    const res = await getResidentDetailAPI(params)
    familyMemList.value = res.result
    // console.log(familyMemList.value)
    // TODO:渲染家庭成员信息 2024-07-21
  }

  onLoad(() => {
    getResidentDetail()
  })
</script>

<template>
  <view class="man-detail">
    <view class="grid_bg">
      <view>residents-info</view>
    </view>
  </view>
</template>

<style lang="scss">
  page {
    height: 100%;
  }

  .man-detail {
    width: 100%;
    height: 100%;
    padding: 20rpx;

    .grid_bg {
      width: 100%;
      height: 100%;
      background-image:
        linear-gradient(90deg, rgba($color: $GridColor, $alpha: 0.1) 1rpx, transparent 1rpx),
        linear-gradient(180deg, rgba($color: $GridColor, $alpha: 0.1) 1rpx, transparent 1rpx);
      background-size: 40rpx 40rpx;
    }
  }
</style>
