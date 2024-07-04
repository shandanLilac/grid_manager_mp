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
  // 居民列表（表格）
  const loading = ref(false)
</script>

<template>
  <view class="area-container">
    <view class="ac-head">
      <view class="title">居民小区</view>
    </view>
    <view class="ac-body">
      <!-- 小区、平房区列表 -->
      <uni-card title="居民小区列表" sub-title="北街社区第一网格">
        <view class="area-list">
          <uni-tag text="城北小区" type="error" :inverted="true" :circle="true"></uni-tag>
          <uni-tag text="邮政家属楼" type="error" :inverted="true" :circle="true"></uni-tag>
          <uni-tag text="城关小学对面平房" type="error" :inverted="true" :circle="true"></uni-tag>
        </view>
      </uni-card>
      <!-- 级联选择器：楼栋 - 单元 -->
      <uni-card title="请选择楼栋-单元" sub-title="北街社区第一网格城北小区">
        <view class="data-picker-wrapper">
          <uni-data-picker v-model="value" :localdata="pickerData" popup-title="请选择楼栋-单元" @change="onchange" />
        </view>
      </uni-card>
      <uni-card title="居民信息列表" sub-title="北街社区第一网格城北小区1号楼1单元">
        <!-- <uni-section title="居民信息列表" sub-title="北街社区第一网格城北小区1号楼1单元" type="square"> -->
        <view class="data-list">
          <uni-table :loading="loading" stripe empty-text="暂无更多数据">
            <uni-tr>
              <uni-th width="64" align="center">室</uni-th>
              <uni-th width="64" align="center">姓名</uni-th>
              <uni-th width="64" align="center">与户主关系</uni-th>
              <uni-th width="204" align="center">户籍</uni-th>
              <uni-th width="64" align="center">备注</uni-th>
              <uni-th width="264" align="center">操作</uni-th>
            </uni-tr>
            <uni-tr>
              <uni-td align="center">101</uni-td>
              <uni-td align="center">黄华</uni-td>
              <uni-td align="center">户主</uni-td>
              <uni-td>甘肃省山丹县清泉镇城北小区1-1-101</uni-td>
              <uni-td align="center">低保</uni-td>
              <uni-td>
                <view class="uni-group">
                  <button class="uni-button" size="mini" type="primary" plain>详情</button>
                  <button class="uni-button" size="mini" type="primary">修改</button>
                  <button class="uni-button" size="mini" type="warn">删除</button>
                </view>
              </uni-td>
            </uni-tr>
          </uni-table>
        </view>
        <!-- </uni-section> -->
      </uni-card>
    </view>
  </view>
</template>

<style lang='scss'>
  .area-container {
    margin-top: 20rpx;

    .ac-head {
      @include commonHead();
    }

    .ac-body {
      .area-list {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
      }

      :deep(.selected-area) {
        flex: 0 1 auto;
        height: auto;
      }

      .data-list {
        .uni-group {
          display: flex;
          justify-content: space-around;
          align-items: center;
        }
      }
    }
  }
</style>