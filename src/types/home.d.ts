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
  total: number
  town: number
  townRatio: string
  rural: number
  ruralRatio: string
  buildingsArea: { name: string }[]
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

// 网格员信息
export type GridManagerInfo = {
  id: number,
  name: string
  id_card: string
  gender: '男' | '女'
  political_type: string
  edu: string
  type: string
  phone: string
  date: string
}

// 楼栋单元数据
type UnitItem = {
  text: string
  value: string
}
export type BuildAndUnits = UnitItem & {
  children: UnitItem[]
}

// 居民信息
export type ResidentsList = {
  result: ResidentItem[]
  total: number
  str: string
}
type ResidentItem = {
  building_num: string
  buildings_area: string
  doing: string
  education: string
  grid_num: string
  health: string
  householder: string
  id: number
  id_card: string
  marriage: "已婚" | "未婚" | "离异" | "丧偶" | ""
  name: string
  nationality: string
  notes: string
  phone: string
  political_type: string
  religion: string
  residence_address: string
  residence_type: string
  room_num: string
  status: number
  tag: string
  unit_num: string
  visit: string
}