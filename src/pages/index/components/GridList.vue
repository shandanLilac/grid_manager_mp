<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { gridChartOpts } from '@/static/config/ucharts-opts'
  import { onReady } from '@dcloudio/uni-app'
  import { getGridChartDataAPI, getGridManagerInfoAPI, getGridNumAPI, type GridItem, } from '@/service/home'
  import type { GridManagerInfo } from '@/types/home';
  import { useGridStore } from '@/store/modules/grid'

  const gridStore = useGridStore()

  // 获取网格列表数据
  const grids = ref<GridItem[]>()
  const getGridNum = async () => {
    const res = await getGridNumAPI(1)
    grids.value = res.result
  }

  // 网格员信息
  const gridParams = computed(() => {
    return {
      comm_num: gridStore.commNum || 1,
      grid_num: gridStore.gridNum || 1
    }
  })
  const gridManagerInfo = ref<GridManagerInfo[]>()
  const getGridManagerInfo = async () => {
    const res = await getGridManagerInfoAPI(gridParams.value)
    gridManagerInfo.value = res.result
  }
  // 选择网格
  const onChange: UniHelper.UniDataSelectOnChange = (e) => {
    gridStore.updateGridNum(e)
    getGridManagerInfo()
    getGridChartData()
  }
  // 图表
  const chartData = ref({})
  const getGridChartData = async () => {
    const res = await getGridChartDataAPI(gridParams.value)
    chartData.value = JSON.parse(JSON.stringify(res.result))
  }

  onReady(() => {
    getGridNum()
    getGridManagerInfo()
    getGridChartData()
  })
  const getIndex = (e: any) => {
    console.log(e)
  }
</script>

<template>
  <view class="grid-container">
    <!-- 标题 -->
    <view class="gc-head">
      <view class="title">网格</view>
    </view>
    <!-- 内容 -->
    <uni-card title="网格概况" margin="10rpx" padding="10rpx">
      <view class="gc-body">
        <!-- 选择网格 -->
        <view class="grid-choose grid-item">
          <uni-data-select v-model="gridParams.grid_num" :localdata="grids" @change="onChange" />
        </view>
        <!-- 网格员 -->
        <view class="grid-manager grid-item">
          <view class="label">网格员</view>
          <view class="gm-wrapper" v-for="item in gridManagerInfo" :key="item.id">
            <uni-collapse class="uni-collapse">
              <uni-collapse-item :title="item.name + ' ' + item.phone">
                <view class="colla-content">
                  <view>姓名：{{ item.name }}</view>
                  <view>性别：{{ item.gender }}</view>
                  <view>身份证号码：{{ item.id_card }}</view>
                  <view>电话：{{ item.phone }}</view>
                  <view>类别：{{ item.type }}</view>
                  <view>政治面貌：{{ item.political_type }}</view>
                  <view>分配日期：{{ item.date }}</view>
                </view>
              </uni-collapse-item>
            </uni-collapse>
          </view>
        </view>
        <!-- 网格信息 -->
        <view class="grid-info grid-item">
          <view class="label">重点人员：</view>
          <view class="chart">
            <qiun-data-charts type="mount" :opts="gridChartOpts" :chartData="chartData" :inScrollView="true"
              @getIndex="getIndex" />
          </view>
        </view>
      </view>
    </uni-card>
  </view>
</template>

<style lang="scss">
  .grid-container {
    margin-top: 20rpx;

    .gc-head {
      @include commonHead();
    }

    .gc-body {
      padding-bottom: 10rpx;

      .grid-item {
        margin-bottom: 20rpx;
        @include indexInfoDetail();

        .gm-wrapper {
          .uni-collapse {
            width: 100%;
          }

          .colla-content {
            padding-left: 30rpx;
          }
        }
      }

      .grid-info {
        .chart {
          width: 100%;
          height: 300rpx;
        }
      }
    }
  }
</style>