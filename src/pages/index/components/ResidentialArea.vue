<script lang="ts">
  // 新东西：在vue组件中配置小程序的组件样式隔离选项
  export default {
    options: {
      styleIsolation: 'shared'
    }
  }
</script>
<script setup lang='ts'>
  import { ref } from 'vue'

  const value = ref('1-1')
  const pickerData = ref([
    {
      text: '城北小区一号楼',
      value: '1-0',
      children: [
        { text: '1单元', value: '1-1' },
        { text: '2单元', value: '1-2' },
        { text: '3单元', value: '1-3' },
        { text: '4单元', value: '1-4' },
      ]
    },
    {
      text: '城北小区二号楼',
      value: '2-0',
      children: [
        { text: '1单元', value: '2-1' },
        { text: '2单元', value: '2-2' },
        { text: '3单元', value: '2-3' },
        { text: '4单元', value: '2-4' },
      ]
    },
    {
      text: '城北小区三号楼',
      value: '3-0',
      children: [
        { text: '1单元', value: '3-1' },
        { text: '2单元', value: '3-2' },
        { text: '3单元', value: '3-3' },
        { text: '4单元', value: '3-4' },
      ]
    },
  ])
  const onchange: UniHelper.UniDataPickerOnChange = (e) => {
    console.log(e)
  }
</script>

<template>
  <view class="area-container">
    <view class="ac-head">
      <view class="title">居民小区</view>
    </view>
    <view class="ac-body">
      <!-- 小区、平房区列表 -->
      <view class="residential-area-list">
        <text class="ra-item">城北小区</text>
        <text class="ra-item">邮政家属楼</text>
        <text class="ra-item">城关小学对面平房区</text>
      </view>
      <!-- 级联选择器：楼栋 - 单元 -->
      <view class="data-picker-wrapper">
        <uni-data-picker v-model="value" :localdata="pickerData" popup-title="请选择楼栋-单元" @change="onchange" />
      </view>
    </view>
  </view>
</template>

<style lang='scss'>
  .area-container {
    margin-top: 20rpx;
    // padding: 10rpx;
    background-color: #fff;
    border-radius: 8rpx;
    overflow: hidden;

    .ac-head {
      @include commonHead();
    }

    .ac-body {
      :deep(.selected-area) {
        flex: 0 1 auto;
        height: auto;
      }
    }
  }
</style>