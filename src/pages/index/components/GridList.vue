<script setup lang='ts'>
  import { ref } from 'vue'

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
</script>

<template>
  <div class="grid-container">
    <view class="gc-head">
      <view class="title">网格</view>
      <!-- <view class="community">概况 ></view> -->
    </view>
    <view class="gc-body">
      <view class="gc-body-item">
        <uni-section title="选择网格" sub-title="县府街社区" type="square">
          <view class="select-wrapper">
            <uni-data-select v-model="value" :localdata="grids" @change="onChange"></uni-data-select>
          </view>
        </uni-section>
      </view>
      <view class="gc-body-item">
        <uni-section class="mb-10" title="网格概况" type="line">
          <view class="grid-info">
            <view class="info-item" v-for="(item, index) in 10" :key="index">
              <view class="key">范围:</view>
              <view class="value">
                <text>城北小区,平房区</text>
              </view>
            </view>
          </view>
        </uni-section>
      </view>
    </view>
  </div>
</template>

<style scoped lang='scss'>
  .grid-container {
    margin-top: 20rpx;
    // padding: 10rpx;
    background-color: #fff;
    border-radius: 8rpx;
    overflow: hidden;

    .gc-head {
      @include commonHead();
    }

    .gc-body {
      padding: 8rpx;

      .select-wrapper {
        padding-left: 32rpx;
        z-index: 256;
      }

      .grid-info {
        padding-left: 32rpx;

        .info-item {
          height: 48rpx;
          margin: 4rpx 0;
          display: flex;
          align-items: center;

          .key {
            width: 80rpx;
          }

          .value {
            flex: 1;
          }
        }
      }
    }
  }
</style>