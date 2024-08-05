import { defineStore } from "pinia"
import { ref } from "vue"

export type CommonType = string | number | undefined

export const useGridStore = defineStore('grid', () => {
  // 社区
  // 社区编号
  const commNum = ref<CommonType>(1)
  const updateCommNum = (val: CommonType) => {
    commNum.value = val
  }

  // 网格
  // 网格编号
  const gridNum = ref<CommonType>(1)
  const updateGridNum = (val: CommonType) => {
    gridNum.value = val
  }

  // 居民小区
  // 居民小区编号
  const buildsNum = ref<CommonType>()
  const updateBuildsNum = (val: CommonType) => {
    buildsNum.value = val
  }
  // 居民小区楼栋编号
  const buildNum = ref<CommonType>()
  const updateBuildNum = (val: CommonType) => {
    buildNum.value = val
  }
  // 居民小区单元编号
  const unitNum = ref<CommonType>()
  const updateUnitNum = (val: CommonType) => {
    unitNum.value = val
  }

  // 重置状态
  const resetStates = () => {
    gridNum.value = undefined
    buildNum.value = undefined
    buildNum.value = void 0
    unitNum.value = void 0
  }
  return {
    // 社区
    commNum, updateCommNum,
    // 网格
    gridNum, updateGridNum,
    // 居民小区
    buildsNum, buildNum, unitNum, updateBuildsNum, updateBuildNum, updateUnitNum,
    // 通用
    resetStates
  }
})