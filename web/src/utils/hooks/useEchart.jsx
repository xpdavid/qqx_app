import {useEffect, useRef} from 'react';
import * as echarts from 'echarts';

/**
 * 简单使用Echarts的Hook
 */
function useEchart(domref, options, effects) {
    const myChartContainer = useRef(null);

    const renderChart = () => {
        if (!myChartContainer.current) {
            myChartContainer.current = echarts.init(domref.current)
        }
        myChartContainer.current.setOption(options)
    }
    useEffect(() => {
        renderChart()
    }, effects || [options])

    useEffect(() => {
        // 卸载代码写在这里而不是上面，是因为放在上面，每次数据改变重新渲染，那么都会先清除echart，再初始化
        return () => {
            if (myChartContainer.current) {
                myChartContainer.current.dispose()
                myChartContainer.current = null
            }
        }
    }, [])
}

export default useEchart