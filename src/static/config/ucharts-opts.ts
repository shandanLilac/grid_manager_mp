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

// 主页网格组件图表配置
export const gridChartOpts = {
  timing: "easeOut",
  duration: 1000,
  rotate: false,
  rotateLock: false,
  color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4", "#ea7ccc"],
  padding: [15, 15, 0, 5],
  fontSize: 13,
  fontColor: "#666666",
  dataLabel: true,
  dataPointShape: true,
  dataPointShapeType: "solid",
  touchMoveLimit: 60,
  enableScroll: false,
  enableMarkLine: false,
  legend: {
    show: false,
    position: "bottom",
    float: "center",
    padding: 5,
    margin: 5,
    backgroundColor: "rgba(0,0,0,0)",
    borderColor: "rgba(0,0,0,0)",
    borderWidth: 0,
    fontSize: 13,
    fontColor: "#666666",
    lineHeight: 11,
    hiddenColor: "#CECECE",
    itemGap: 10
  },
  xAxis: {
    disableGrid: true,
    disabled: false,
    axisLine: true,
    axisLineColor: "#CCCCCC",
    calibration: false,
    fontColor: "#666666",
    fontSize: 13,
    lineHeight: 20,
    marginTop: 0,
    rotateLabel: false,
    rotateAngle: 45,
    itemCount: 5,
    boundaryGap: "center",
    splitNumber: 5,
    gridColor: "#CCCCCC",
    gridType: "solid",
    dashLength: 4,
    gridEval: 1,
    scrollShow: false,
    scrollAlign: "left",
    scrollColor: "#A6A6A6",
    scrollBackgroundColor: "#EFEBEF",
    title: "",
    titleFontSize: 13,
    titleOffsetY: 0,
    titleOffsetX: 0,
    titleFontColor: "#666666",
    format: ""
  },
  yAxis: {
    data: [
      {
        min: 0
      }
    ],
    disabled: false,
    disableGrid: false,
    splitNumber: 5,
    gridType: "solid",
    dashLength: 8,
    gridColor: "#CCCCCC",
    padding: 10,
    showTitle: false
  },
  extra: {
    mount: {
      type: "mount",
      widthRatio: 1.5,
      borderWidth: 1,
      barBorderCircle: false,
      linearType: "none",
      linearOpacity: 1,
      colorStop: 0
    },
    tooltip: {
      showBox: true,
      showArrow: true,
      showCategory: false,
      borderWidth: 0,
      borderRadius: 0,
      borderColor: "#000000",
      borderOpacity: 0.7,
      bgColor: "#000000",
      bgOpacity: 0.7,
      gridType: "solid",
      dashLength: 4,
      gridColor: "#CCCCCC",
      boxPadding: 3,
      fontSize: 13,
      lineHeight: 20,
      fontColor: "#FFFFFF",
      legendShow: true,
      legendShape: "auto",
      splitLine: true,
      horizentalLine: false,
      xAxisLabel: false,
      yAxisLabel: false,
      labelBgColor: "#FFFFFF",
      labelBgOpacity: 0.7,
      labelFontColor: "#666666"
    },
    markLine: {
      type: "solid",
      dashLength: 4,
      data: []
    }
  }
}