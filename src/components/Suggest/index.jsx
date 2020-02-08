import React from 'react';
import { Card, Collapse } from 'antd';
import CardItem from '../CardItem';

const { Panel } = Collapse;

function Suggest({ suggestion }) {
  if (!suggestion) {
    return <Card className="suggestion" title="建议(只包含公共牌和我方手牌)">
      公共牌区和我方手牌没有牌，无法给出建议
  </Card>
  }
  return (
    <Card className="suggestion" title="建议">
      <Collapse defaultActiveKey={['1', '2', '3']}>
        <Panel header="推荐牌（参考右侧关系图，优先拿最大的黄球，其次拿蓝球的，两个同样大的球拿靠近大蓝球或者大绿球的）" key="1">
          <div>
            <div>
              <div>
                公共牌
              </div>
              <div>
                {
                  suggestion.goodCards.filter(l => l.position === 2).map((item) => {
                    return <CardItem key={item.id} dataSource={item} />
                  })
                }
              </div>
            </div>
            <div>
              <div>
                手牌
              </div>
              <div>
                {
                  suggestion.goodCards.filter(l => l.position === 4).map((item) => {
                    return <CardItem key={item.id} dataSource={item} />
                  })
                }
              </div>
            </div>
          </div>
        </Panel>
        <Panel header="鸡肋（单组合牌，且组合牌在牌库）" key="2">
          {
            suggestion.normalCards.map((item) => {
              return <CardItem key={item.id} dataSource={item} />
            })
          }
        </Panel>
        <Panel header="单牌（形成不了组合的牌）" key="3">

          {
            suggestion.singleCards.map((item) => {
              return <CardItem key={item.id} dataSource={item} />
            })
          }
        </Panel>
        <Panel header="废牌（无法拿到的公共牌）" key="4">

          {
            suggestion.dirtyCards.map((item) => {
              return <CardItem key={item.id} dataSource={item} />
            })
          }
        </Panel>
      </Collapse> ,
    </Card >
  );
}

export default Suggest;
