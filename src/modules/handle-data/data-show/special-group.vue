<script setup lang="ts">
  import { getDataListAPI } from '@/service/detail'
  import { useGridStore } from '@/store/modules/grid'
  import type { DibaoItem } from '@/types/handle-data'
  import { onLoad } from '@dcloudio/uni-app'
  import { ref } from 'vue'

  const query = defineProps<{
    type?: string
    cate?: string
  }>()
  const gridStore = useGridStore()
  // 提示栏信息
  const textArr = ref([
    "什么？数据不精确？快去入户核实吧！",
    "点击一行，可查看完整信息。",
    "如果信息展示不完整，请联系技术人员。"
  ])
  // 表格数据
  const dataList = ref<any>([])
  const total = ref<number>()
  const title = ref<string>()
  const dataParams = ref({
    pn: 1,
    comm_num: gridStore.commNum,
    grid_num: query.type === '1' ? 'NaN' : gridStore.gridNum,
    cate: query.cate
  })
  const getDataList = async () => {
    const res = await getDataListAPI(dataParams.value)
    dataList.value = res.result.result
    total.value = res.result.total
    title.value = res.result.title
  }
  const rowIndex = ref<number>(0)
  const onRowClick = (i: { rowIndex: number }) => {
    rowIndex.value = i.rowIndex
    popupRef.value!.open!()

  }
  const onRowClick1 = (i: { rowIndex: number }) => {
    const theOne = dataList.value.find((item: any, index: number) => index === i.rowIndex)
    const params = {
      comm_num: dataParams.value.comm_num,
      grid_num: theOne.grid_num,
      builds_num: theOne.buildings_area,
      build_num: theOne.building_num,
      unit_num: theOne.unit_num
    }
    const paramsStr = JSON.stringify(params)
    const comm_name = title.value?.match(/(\S*)社区/)
    const build_name = isNaN(theOne.building_num) ? theOne.building_num : theOne.building_num + '号楼'
    const addr = `${comm_name![0]}第${theOne.grid_num}网格${theOne.builds_name}${build_name}${theOne.unit_num}单元`
    uni.navigateTo({
      url: `/pages/details/man-detail?id=${theOne.id}&addr=${addr}&room=${theOne.room_num}&params=${paramsStr}&comm_num=${dataParams.value.comm_num}`
    })
  }
  // 分页
  const onPnChange = (e: { value: number }) => {
    dataParams.value.pn = e.value
    getDataList()
  }
  onLoad(() => {
    getDataList()
  })
  // 弹出层
  const popupRef = ref<UniHelper.UniPopupInstance>()
</script>

<template>
  <view class="sg-wrapper">
    <view class="title">{{ title || '数据展示区域' }}</view>
    <view class="notice">
      <wd-notice-bar direction="vertical" :text="textArr" :delay="5" prefix="warn-bold" />
    </view>
    <view class="data-form" v-if="dataList.length">
      <!-- 低保 -->
      <view class="dibao" v-if="query.cate === '0'">
        <wd-table :data="dataList" @row-click="onRowClick">
          <wd-table-col prop="受补人" label="受补人" fixed width="180rpx" align="center" />
          <wd-table-col prop="收款人" label="收款人" width="180rpx" align="center" />
          <wd-table-col prop="户主" label="户主" width="140rpx" align="center" />
          <wd-table-col prop="保障标准" label="标准" width="140rpx" align="center" />
          <wd-table-col prop="保障人数" label="人数" width="140rpx" align="center" />
          <wd-table-col prop="保障金额" label="金额" width="140rpx" align="center" />
        </wd-table>
      </view>
      <!-- 残疾人 -->
      <view class="disabled" v-else-if="query.cate === '1'">
        <wd-table :data="dataList" @row-click="onRowClick">
          <wd-table-col prop="姓名" label="姓名" fixed width="180rpx" align="center" />
          <wd-table-col prop="性别" label="性别" width="180rpx" align="center" />
          <wd-table-col prop="残疾类别" label="残疾类别" width="140rpx" align="center" />
          <wd-table-col prop="补贴类型" label="补贴类型" width="140rpx" align="center" />
          <wd-table-col prop="联系电话" label="联系电话" width="260rpx" align="center" />
        </wd-table>
      </view>
      <!-- 高龄老人、空巢老人、留守儿童 -->
      <view class="disabled" v-else>
        <wd-table :data="dataList" @row-click="onRowClick1">
          <wd-table-col prop="name" label="姓名" fixed width="180rpx" align="center" />
          <wd-table-col prop="gender" label="性别" width="180rpx" align="center" />
          <wd-table-col prop="age" label="年龄" width="180rpx" align="center" />
          <wd-table-col prop="residence_type" label="户籍类型" width="140rpx" align="center" />
          <wd-table-col prop="health" label="健康状况" width="140rpx" align="center" />
        </wd-table>
      </view>
    </view>
    <view class="no-data" v-else>
      <wd-status-tip image="content" tip="暂无内容" />
    </view>
    <view class="pagination">
      <wd-pagination v-model="dataParams.pn" :total="total" @change="onPnChange" />
    </view>
    <uni-popup ref="popupRef" type="bottom">
      <view class="popup-wrapper">
        <!-- <text class="popup-title">详情</text> -->
        <view class="data-wrapper" v-for="(value, key) in dataList[rowIndex]" :key="key">
          <text class="key">{{ key }}</text>
          <text class="value">{{ value }}</text>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<style lang="scss">
  .sg-wrapper {
    padding: 10rpx;

    .title {
      width: 100%;
      height: 72rpx;
      line-height: 72rpx;
      text-align: center;
      font-size: 34rpx;
      font-weight: 500;
      color: $GridColor;
    }

    .notice {
      margin-bottom: 10rpx;
    }

    .popup-wrapper {
      padding: 30rpx 20rpx;
      background-color: #fff;
      border: 1rpx solid $GridColor;
      border-radius: 15rpx 15rpx 0 0;
      box-sizing: border-box;

      .data-wrapper {
        border-bottom: 1rpx dashed #c8c7cc;
        display: flex;
        align-items: center;
        font-size: 24rpx;

        .key {
          width: 120rpx;
          color: $GridColor;
          font-weight: 500;
          margin-left: 15rpx;
        }

        .value {
          text-align: justify;
          flex: 1;
        }
      }
    }
  }
</style>