import React from 'react';
import { Tag, Collapse } from 'antd';
import CardItem from '../CardItem';
import DropArea from '../DropArea';

const { Panel } = Collapse;

function CardLib({ dataSource = [] }) {
  return (
    <Collapse className="card-lib" defaultActiveKey="1">
      <Panel header="牌库(请将牌从牌库拖到各个牌区)" key="1" extra={<span>
        <Tag color="green">春</Tag>
        <Tag color="red">夏</Tag>
        <Tag color="orange"> 秋</Tag>
        <Tag color="geekblue">冬 </Tag>
      </span>}>
        <DropArea position={0}>
          {
            dataSource.filter(l => l.position === 0).map((item) => {
              return <CardItem key={item.id} dataSource={item} />
            })
          }
        </DropArea>
      </Panel>
    </Collapse>
  );
}

export default CardLib;
