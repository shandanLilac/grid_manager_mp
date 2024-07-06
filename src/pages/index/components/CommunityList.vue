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
  const onGetIndex = async (e: any) => {
    const { cancel } = await uni.showModal({ title: '提示消息', content: '前往查看花名册？' })
    if (cancel) return
    console.log(e)
    // TODO:跳转页面，渲染相应的数据
  }
</script>

<template>
  <view class="community-container">
    <view class="cc-head">
      <view class="title">社区</view>
    </view>
    <view class="cc-body">
      <!-- 社区列表 -->
      <!-- <uni-section title="社区" type="square"> -->
      <uni-card title="社区列表">
        <view class="communities">
          <view class="community-item" v-for="(item, index) in 12" :key="item" :class="{ active: index === 0 }">
            <text class="prefix">A</text>
            <text class="name">北街</text>
            <text class="entry">></text>
          </view>
        </view>
      </uni-card>
      <!-- </uni-section> -->

      <!-- 社区概况（图表版） -->
      <!-- <uni-section title="社区详情" sub-title="县府街社区" type="line"> -->
      <uni-card title="社区概况" sub-title="县府街社区" extra="简介 >">
        <view class="community-info">
          <view class="info-plain">
            <view class="population">
              <view class="label">人口：1000人</view>
              <text class="detail">
                <text class="num-town text">城镇100(10%)</text>
                <text class="num-rural text">农村900(90%)</text>
              </text>
            </view>
            <view class="area">
              <view class="label">范围：</view>
              <view class="detail">
                <text class="text">城北小区</text>
                <text class="text">邮政家属楼</text>
                <text class="text">仁和小区</text>
                <text class="text">仁爱小区</text>
                <text class="text">裕清苑</text>
                <text class="text">银海小区</text>
                <text class="text">仁和新城东区</text>
                <text class="text">仁和新城西区</text>
              </view>
            </view>
          </view>
          <view class="label">重点人群：</view>
          <view class="info-chart">
            <qiun-data-charts type="mount" :opts="opts" :chartData="chartData" :optsWatch="false"
              canvasId="community_info_01" :inScrollView="true" @getIndex="onGetIndex" />
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
    // background-color: #fff;

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
        width: 140rpx;
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
      @include indexInfoDetail();

      .info-chart {
        width: 100%;
        height: 150px;
      }
    }
  }
</style>