<script setup lang='ts'>
  import { ref } from 'vue'
  import { gridChartOpts } from "@/static/config/ucharts-opts";
  import { onReady } from '@dcloudio/uni-app'

  const grids = ref([
    { value: 0, text: '第一网格' },
    { value: 1, text: '第二网格' },
    { value: 2, text: '第三网格' },
    { value: 3, text: '第四网格' },
    { value: 4, text: '第五网格' },
    { value: 5, text: '第六网格' },
    { value: 6, text: '第七网格' },
    { value: 7, text: '第八网格' },
    { value: 8, text: '第九网格' },
  ])
  const value = ref(0)
  const onChange: UniHelper.UniDataSelectOnChange = (e) => {
    console.log(e)
  }

  // 图表
  const chartData = ref({})
  onReady(() => {
    getServerData()
  })
  const getServerData = () => {
    // 模拟异步获取数据
    setTimeout(() => {
      const res = ref({
        series: [
          {
            data: [{ "name": "低保", "value": 82 }, { "name": "高龄", "value": 63 }, { "name": "残疾人", "value": 86 }, { "name": "独居老人", "value": 65 }, { "name": "留守儿童", "value": 79 }]
          }
        ]
      })
      chartData.value = JSON.parse(JSON.stringify(res.value))
    }, 500);
  }
  const getIndex = (e: any) => {
    console.log(e)
  }
</script>

<template>
  <div class="grid-container">
    <view class="gc-head">
      <view class="title">网格</view>
    </view>
    <view class="gc-body">
      <view class="gc-body-item">
        <view class="select-wrapper">
          <view class="title">请选择网格</view>
          <uni-data-select v-model="value" :localdata="grids" @change="onChange"></uni-data-select>
        </view>
      </view>
      <view class="gc-body-item">
        <!-- <uni-section title="网格概况" type="line"> -->
        <uni-card title="网格概况" sub-title="北街社区第一网格" extra="查看简介">
          <view class="grid-manager">
            <view class="label">网格员</view>
            <view class="detail">
              <text class="text">文婷</text>
              <text class="text">0936-2727733</text>
            </view>
            <view class="label">辅助网格员</view>
            <view class="detail">
              <text class="text">丁芙蓉</text>
              <text class="text">0936-2727733</text>
            </view>
            <view class="label">重点人员</view>
          </view>
          <view class="grid-info">
            <qiun-data-charts type="mount" :opts="gridChartOpts" :chartData="chartData" :inScrollView="true"
              @getIndex="getIndex" />
          </view>
        </uni-card>
        <!-- </uni-section> -->
      </view>
    </view>
  </div>
</template>

<style scoped lang='scss'>
  .grid-container {
    margin-top: 20rpx;

    .gc-head {
      @include commonHead();
    }

    .gc-body {
      padding: 8rpx;

      .select-wrapper {
        z-index: 256;
        margin: 30rpx;
        padding: 20rpx;
        background-color: #fff;
        border: 1px #fff solid;
        border-radius: 8rpx;
        box-shadow: 0 0 6rpx 2rpx rgba($color: #000, $alpha: 0.08);
        box-sizing: border-box;

        .title {
          height: 64rpx;
          line-height: 64rpx;
          font-size: 30rpx;
          color: #666;
        }
      }

      .grid-manager {
        @include indexInfoDetail();
      }

      .grid-info {
        width: 100%;
        height: 300rpx;
      }
    }
  }
</style>