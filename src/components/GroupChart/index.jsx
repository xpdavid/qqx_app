import React, { useRef, useEffect } from 'react';
import useEchart from '../../utils/hooks/useEchart';

function GroupChart({ cards, links }) {
  // 获取我方手牌季节类型
  const myCardTypes = new Set(cards.filter(l => l.position === 4).map(l => l.cardType));
  let nodes = cards.filter(card => {
    // 图表不展示对方卡牌
    if (card.position === 1) {
      return false
    }
    // 图表只展示有组合的卡牌
    if (!links.find(l => l.target == card.id || l.source == card.id)) {
      return false
    }
    // 对于公共牌和牌库牌，只展示与手牌季节配对的
    if ((card.position === 2 || card.position === 0) && !myCardTypes.has(card.cardType)) {
      return false
    }
    return true
  })
  // 根据nodes和links生成nodeLinks
  let nodeLinks = JSON.parse(JSON.stringify(links));// 深拷贝
  nodeLinks.forEach((nodeLink) => {
    // 根据新的nodes重置关系
    nodeLink.source = nodes.findIndex(l => l.id === nodeLink.source);
    nodeLink.target = nodes.findIndex(l => l.id === nodeLink.target);
  });

  const domref = useRef()

  nodes.forEach(function (node) {
    node.value = node.symbolSize;
    node.label = {
      show: node.symbolSize > 8
    };
    if (node.position === 0) {//牌库的牌
      node.category = 0
    } else if (node.position === 2) {//公共牌
      node.category = 1
    } else if (node.position === 4) {//我方手牌
      node.category = 2
    } else if (node.position === 3) {//我方展示牌
      node.category = 3
    }

    node.draggable = true;
  });

  var categories = [
    {
      name: '牌库',
      itemStyle: {
        color: '#000'
      }
    },
    {
      name: '公共牌',
      itemStyle: {
        color: '#FF9800'
      }
    },
    {
      name: '我方手牌',
      itemStyle: {
        color: '#03a9f4'
      }
    },
    {
      name: '我方展示牌',
      itemStyle: {
        color: '#080'
      }
    }
  ];

  // 指定图表的配置项和数据
  var options = {
    title: {
      text: '推测组合关系图',
      subtext: '关系越多球越大，线越粗优先级越高',
      top: 'top',
      left: 'left'
    },
    tooltip: {},
    legend: [{
      // selectedMode: 'single',
      data: categories.map(function (a) {
        return a.name;
      })
    }],
    animationDuration: 1500,
    animationEasingUpdate: 'quinticInOut',
    series: [
      {
        name: '卡牌',
        type: 'graph',
        layout: 'force',
        data: nodes,
        links: nodeLinks,
        categories: categories,
        roam: true,
        focusNodeAdjacency: true,
        force: {
          repulsion: 100,
          edgeLength: [50, 100],
          gravity:0.05
        },
        label: {
          position: 'inside',
          formatter: '{b}'
        }
      }
    ]
  }

  useEchart(domref, options, [nodes, nodeLinks])
  return (
    <div id="group_chart"  >
      <div ref={domref} className="group-chart-content"></div>
    </div>
  );
}

export default GroupChart;
