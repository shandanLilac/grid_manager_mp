<script setup lang="ts">
  import { uchartCommunity3, uchartCommunity1_data } from '@/static/config/ucharts-opts'
  import { onReady } from '@dcloudio/uni-app'
  import { ref } from 'vue'

  const chartData = ref({})
  const opts = ref(uchartCommunity3)

  onReady(() => {
    getServerData()
  })
  const getServerData = () => {
    setTimeout(() => {
      const res = uchartCommunity1_data
      chartData.value = JSON.parse(JSON.stringify(res))
    }, 500)
  }
  const onGetIndex = (e: any) => {
    console.log(e)
  }
</script>

<template>
  <view class="community-container">
    <view class="cc-head">
      <view class="title">社区</view>
    </view>
    <view class="cc-body">
      <!-- 社区列表 -->
      <!-- <uni-section title="社区列表" type="line"> -->
      <view class="communities">
        <view class="community-item" v-for="(item, index) in 12" :key="item" :class="{ active: index === 0 }">
          <text class="prefix">A</text>
          <text class="name">北街</text>
          <text class="entry">></text>
        </view>
      </view>
      <!-- </uni-section> -->

      <!-- 社区概况（图表版） -->
      <!-- <uni-section title="社区详情" type="line"> -->
      <uni-card title="县府街社区" :isFull="true" sub-title="概况" extra="简介 >">
        <view class="community-info">
          <view class="info_1">
            <view class="pie chart">
              总人口（城镇、农村）
            </view>
            <view class="ring chart">居民小区人口占比</view>
          </view>
          <view class="info_2">
            <qiun-data-charts type="mount" :opts="opts" :chartData="chartData" :optsWatch="false"
              canvasId="community_info_01" :inScrollView="true" pageScrollTop="" @getIndex="onGetIndex" />
          </view>
        </view>
      </uni-card>
      <!-- </uni-section> -->
    </view>
  </view>
</template>

<style lang="scss">
  .community-container {
    margin-top: 20rpx;
    border-radius: 8rpx;
    overflow: hidden;
    background-color: #fff;

    .cc-head {
      @include commonHead();
    }

    .communities {
      min-height: 280rpx;
      padding: 10rpx;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;

      .community-item {
        width: 160rpx;
        height: 68rpx;
        padding: 0 4rpx;
        border: 1rpx solid #ddd;
        border-radius: 8rpx;
        background: url('@/static/imgs/community-item-bg2.png') no-repeat center/cover;
        box-sizing: border-box;
        font-size: 26rpx;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .active {
        justify-content: center;
        border: 1rpx solid $tempColor;
        transition: all 0.2s;

        .prefix,
        .entry {
          display: none;
        }

        .name {
          color: $tempColor;
          font-weight: 600;
          font-size: 36rpx;
          text-align: center;
        }
      }
    }

    .community-info {
      width: 100%;
      height: 600rpx;
      display: flex;
      flex-direction: column;

      .info_1 {
        width: 100%;
        height: 300rpx;
        display: flex;
        justify-content: space-between;
      }

      .info_2 {
        flex: 1;
      }
    }
  }
</style>