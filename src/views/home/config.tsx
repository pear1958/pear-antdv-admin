export const options = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisTick: {
        alignWithLabel: true
      }
    }
  ],
  yAxis: [
    {
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
    }
  ],
  series: [
    {
      name: '数量',
      type: 'bar',
      itemStyle: {
        color: '#2097F3'
      },
      barWidth: 40,
      data: [10, 52, 200, 334, 390, 330, 220]
    }
  ]
}
