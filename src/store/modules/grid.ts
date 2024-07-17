import { getCommInfoAPI } from "@/service/home"
import type { ChartData, CommInfo } from "@/types/home"
import { defineStore } from "pinia"
import { ref, computed } from "vue"

export const useGridStore = defineStore('grid', () => {
  // 社区
  // 社区编号
  const commNum = ref(0)
  // 请求社区信息
  const commInfo = ref<CommInfo>()
  const chartData = ref<ChartData>()
  const getCommInfo = async () => {
    const res = await getCommInfoAPI({comm_num:commNum.value+1})
    commInfo.value = res.result
    chartData.value = JSON.parse(JSON.stringify(commInfo.value.chartData))
  }
  // 人口
  const popu = computed(() => {
    const total = commInfo.value?.population.map(x => x.count).reduce((a, b) => a + b, 0) || 1
    const town = commInfo.value?.population.find(x => x.residence_type === '城镇')?.count || 0
    const rural = commInfo.value?.population.find(x => x.residence_type === '农村')?.count || 0
    const townRatio = total && town ? (town / total * 100).toFixed(2) + '%' : 'NaN'
    const ruralRatio = total && rural ? (rural / total * 100).toFixed(2) + '%' : 'NaN'
    return { total, town, rural, ruralRatio, townRatio }
  })

  // 网格
  // 网格编号
  const gridNum=ref(1)

  // 居民小区
  return {
    // 社区
    commNum, commInfo, chartData, popu,getCommInfo,
    // 网格
    gridNum
  }
})