import { useEffect } from 'react';
import echarts from 'echarts';

/**
 * 简单使用Echarts的Hook
 */
function useEchart(domref, options, effcts) {
  let myChart = null

  const renderChart = () => {
    if (!myChart) {
      myChart = echarts.init(domref.current)
    }
    myChart.setOption(options)
  }
  useEffect(() => {
    renderChart()
  }, effcts || [options])

  useEffect(() => {
    // 卸载代码写在这里而不是上面，是因为放在上面，每次数据改变重新渲染，那么都会先清除echart，再初始化
    return () => {
      if (myChart) {
        myChart.dispose()
        myChart = null
      }
    }
  }, [])
}
export default useEchart