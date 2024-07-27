import type GridSwiper from '@/components/GridSwiper.vue'
import qiunDataCharts from '@/components/qiun-data-charts/qiun-data-charts.vue'
import type { defineCustomElement } from 'vue'

const _GridSwiper= defineCustomElement(GridSwiper)
const _qiunDataCharts=defineCustomElement(qiunDataCharts)
// 参照官网最新写法，给自定义组件或第三方组件定义类型

declare module 'vue' {
// declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    GridSwiper: typeof _GridSwiper,
    QiunDataCharts: typeof _qiunDataCharts
  }
}
