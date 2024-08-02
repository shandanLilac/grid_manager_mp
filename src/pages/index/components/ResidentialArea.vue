<script lang="ts">
  // 新东西：在vue组件中配置小程序的组件样式隔离选项
  export default {
    options: {
      styleIsolation: 'shared'
    }
  }
</script>
<script setup lang='ts'>
  import { dropItemAPI } from '@/service/detail'
  import { type BuildingsItem, getbuildingAndUnitsAPI, getBuildingsAListAPI, getResidentsListAPI } from '@/service/home'
  import { useGridStore } from '@/store/modules/grid'
  import type { PageParams } from '@/types/global'
  import type { BuildAndUnits, ResidentItem } from '@/types/home'
  import { onLoad } from '@dcloudio/uni-app'
  import { computed, ref, watch } from 'vue'

  const gridStore = useGridStore()
  // 居民小区
  // 居民小区-请求参数
  const buildParams = computed(() => {
    return {
      comm_num: gridStore.commNum || 1,
      grid_num: gridStore.gridNum || 1,
      builds_num: gridStore.buildsNum || 1,
      build_num: gridStore.buildNum || 1,
      unit_num: gridStore.unitNum || 1
    }
  })
  const pageParams: Required<PageParams> = {
    page_num: 1,
    page_size: 10
  }
  const buildingsAList = ref<BuildingsItem[]>()
  // 小区列表
  const getBuildingsAList = async () => {
    const res = await getBuildingsAListAPI(buildParams.value)
    buildingsAList.value = res.result
    gridStore.updateBuildsNum(res.result[0].id)
  }
  // 重置数据
  const resetData = () => {
    pageParams.page_num = 1
    residentsList.value = []
    isAll.value = false
  }
  // 切换小区
  const curIndex = ref(0)
  const tabBuildings = async (id: number, i: number) => {
    gridStore.updateBuildsNum(id)
    resetData()
    curIndex.value = i
    await getBuildingAndUnits()
    await getResidentsList()
  }

  // 楼栋单元数据
  const value = ref<string>()
  const pickerData = ref<BuildAndUnits[]>()
  const getBuildingAndUnits = async () => {
    const res = await getbuildingAndUnitsAPI(buildParams.value)
    pickerData.value = res.result
    value.value = res.result[0].children[0].value
    const buArr = (res.result[0].children[0].value).split('-')
    gridStore.updateBuildNum(buArr[0])
    gridStore.updateUnitNum(buArr[1])
  }
  // 居民信息列表数据
  const residentsList = ref<ResidentItem[]>([])
  const isAll = ref(false)
  const extraData = ref<{ total: number, str: string }>()
  const getResidentsList = async () => {
    if (isAll.value) return uni.showToast({ icon: 'none', title: '已加载全部' })
    const res = await getResidentsListAPI({ ...buildParams.value, ...pageParams })
    residentsList.value!.push(...res.result.result)
    const { total, str } = res.result
    extraData.value = { total, str }
    if (residentsList.value!.length < total) pageParams.page_num++
    else isAll.value = true
  }

  // onLoad 钩子函数
  onLoad(() => {
    getBuildingsAList()
    getBuildingAndUnits()
    getResidentsList()
  })
  // 网格数据变化后重新请求数据
  watch(() => buildParams.value.grid_num, async () => {
    resetData()
    await getBuildingsAList()
    await getBuildingAndUnits()
    await getResidentsList()
  })
  // 切换楼栋单元
  const onchange: UniHelper.UniDataPickerOnChange = (e) => {
    // TODO:更新楼栋、单元信息
    const buStr = e.detail.value[1].value
    const buArr = buStr.split('-')
    gridStore.updateBuildNum(buArr[0])
    gridStore.updateUnitNum(buArr[1])
    resetData()
    getResidentsList()
  }

  // 加载更多
  defineExpose({
    getMore: getResidentsList
  })

  // 看看居民详情
  const toManDetail = (id?: number, addr?: string, room?: string) => {
    const paramsStr = JSON.stringify(buildParams.value)
    uni.navigateTo({
      url: `/pages/details/man-detail?id=${id}&addr=${addr}&room=${room}&params=${paramsStr}&comm_num=${buildParams.value.comm_num}`
    })
  }
  // 删除居民信息
  const dropItem = async (id: number) => {
    const { confirm } = await uni.showModal({
      icon: 'fail',
      title: '警告',
      content: '不可逆操作，是否继续？'
    })
    if (!confirm) return uni.showToast({ icon: 'none', title: '已取消' })
    await dropItemAPI(id, buildParams.value.comm_num)
  }

</script>

<template>
  <view class="area-container">
    <view class="ac-head">
      <view class="title">居民小区</view>
    </view>
    <view class="ac-body">
      <!-- 小区、平房区列表 -->
      <uni-card title="居民小区列表" :sub-title="extraData?.str.match(/(\S*)网格/)?.[0]" margin="10rpx">
        <view class="area-list">
          <uni-tag type="success" circle :inverted="index !== curIndex" v-for="(item, index) in buildingsAList"
            :key="item.id" :text="item.name" @tap="tabBuildings(item.id, index)" />
        </view>
      </uni-card>
      <!-- 级联选择器：楼栋 - 单元 -->
      <uni-card title="请选择楼栋-单元" margin="10rpx">
        <view class="data-picker-wrapper">
          <uni-data-picker v-model="value" :localdata="pickerData" popup-title="请选择楼栋-单元" @change="onchange" />
        </view>
      </uni-card>
      <uni-card title="居民信息列表" :sub-title="extraData?.str" margin="10rpx">
        <view class="data-list">
          <uni-table class="uni-table" stripe empty-text="暂无更多数据">
            <uni-tr>
              <uni-th align="center" width="64">室</uni-th>
              <uni-th align="center" width="64">姓名</uni-th>
              <uni-th align="center" width="64">与户主关系</uni-th>
              <uni-th align="center" width="64">户籍</uni-th>
              <uni-th align="center" width="90">备注</uni-th>
              <uni-th align="center" width="180">操作</uni-th>
              <uni-th align="center" width="90">备注</uni-th>
              <uni-th align="center" width="180">操作</uni-th>
            </uni-tr>
            <uni-tr v-for="item in residentsList" :key="item.id"
              @tap="toManDetail(item.id, extraData!.str, item.room_num)">
              <uni-td align="center">{{ item.room_num }}</uni-td>
              <uni-td align="center">{{ item.name }}</uni-td>
              <uni-td align="center">{{ item.householder }}</uni-td>
              <uni-td align="center">{{ item.residence_type }}</uni-td>
              <uni-td class="uni-td" align="center">{{ item.tag }}</uni-td>
              <uni-td class="uni-td" align="center">{{ item.tag }}</uni-td>
              <uni-td>
                <view class="uni-group">
                  <text class="btn detail" @tap.stop="toManDetail(item.id, extraData!.str, item.room_num)">详情</text>
                  <navigator :url="`/pages/handle-info/index?type=m0&id=${item.id}&comm_num=${buildParams.comm_num}`"
                    hover-class="none">
                    <text class="btn modify">编辑</text>
                  </navigator>
                  <text class="btn delete" @tap.stop="dropItem(item.id!)">删除</text>
                </view>
              </uni-td>
            </uni-tr>
          </uni-table>
        </view>
      </uni-card>
      <view class="loading-text">{{ isAll ? '已加载全部数据' : '加载更多' }}</view>
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
          justify-content: space-between;
          justify-content: space-between;
          align-items: center;

          .btn {
            background-color: transparent;
            border: unset;
            font-size: 24rpx;
          }

          .detail {
            color: $GridColor;
          }

          .modify {
            color: $warnColor;
          }

          .delete {
            color: $dangerColor;
          }

          .btn {
            background-color: transparent;
            border: unset;
            font-size: 24rpx;
          }

          .detail {
            color: $GridColor;
          }

          .modify {
            color: $warnColor;
          }

          .delete {
            color: $dangerColor;
          }
        }
      }

      .loading-text {
        text-align: center;
        font-style: 24rpx;
        color: #666;
        padding: 20rpx 0;
      }
    }
  }
</style>