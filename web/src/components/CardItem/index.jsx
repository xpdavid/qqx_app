import React, {useContext} from 'react';
import {Tag} from 'antd';

import DragContext from '../../context/DragContext'

/**
 * 获取卡牌颜色
 */
function getCardColor(type) {
    switch (type) {
        case 0:
            return 'green';
        case 1:
            return 'red';
        case 2:
            return 'orange';
        default:
            return 'geekblue';
    }
}

function CardItem({dataSource}) {
    const context = useContext(DragContext);

    const handleDragStart = (e) => {
        e.dataTransfer.setData("cardId", dataSource.id);
        context.onDragStart(dataSource)
    }
    const color = getCardColor(dataSource.cardType)
    return <Tag className="card-item" draggable onDragStart={handleDragStart} color={color}>{dataSource.name}</Tag>
}

export default CardItem;
