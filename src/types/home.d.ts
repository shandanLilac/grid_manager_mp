// 首页轮播图数据类型
export type NewsResult = {
  author: string
  content: string
  date_time: string
  id: number
  imgUrl: string
  title: string
}

// 用于图标渲染的社区数据类型
export type CommInfo = {
  buildingsArea: { name: string }[]
  population: {
    residence_type: '农村' | '城镇'
    count: number
  }[]
  chartData: ChartData
}
export type ChartData = {
  series: SeriesItem[]
}
type SeriesItem = {
  data: {
    name: '低保' | '残疾人' | '高龄' | '空巢老人' | '留守儿童'
    value: number
  }[]
}