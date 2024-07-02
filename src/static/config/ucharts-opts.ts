// 社区概况-特殊人群数量示意图
// 配置
export const uchartCommunity3 = {
  color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4", "#ea7ccc"],
  padding: [15, 15, 0, 5],
  enableScroll: false,
  legend: { show: false },
  xAxis: {
    disableGrid: true
  },
  yAxis: {
    data: [
      {
        min: 0
      }
    ]
  },
  extra: {
    mount: {
      type: "bar",
      widthRatio: 0.3,
      borderWidth: 0,
      barBorderRadius: [
        50,
        50,
        50,
        50
      ],
      linearType: "custom"
    }
  }
}
// 数据
export const uchartCommunity1_data = {
  series: [
    {
      data: [{ "name": "低保", "value": 68 }, { "name": "高龄", "value": 128 }, { "name": "残疾人", "value": 53 }, { "name": "独居老人", "value": 65 }, { "name": "留守儿童", "value": 43 }]
    }
  ]
}
