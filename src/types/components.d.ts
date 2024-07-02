import type GridSwiper from '@/components/GridSwiper.vue'
import qiunDataCharts from '@/components/qiun-data-charts/qiun-data-charts.vue'
// declare module 'vue' {
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    GridSwiper: typeof GridSwiper,
    QiunDataCharts: typeof qiunDataCharts
  }
}
