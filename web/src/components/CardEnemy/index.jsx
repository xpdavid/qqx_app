import React from 'react';
import CardItem from '../CardItem';
import DropArea from '../DropArea';

function CardEnemy({dataSource = [], onUpdateCards}) {
    return (
        <div className="card-enemy">
            <div className="left">对方展示牌</div>
            <div className="right">
                <DropArea position={1}>
                    {
                        dataSource.filter(l => l.position === 1).map((item) => {
                            return <CardItem key={item.id} dataSource={item}/>
                        })
                    }
                </DropArea>
            </div>
        </div>
    );
}

export default CardEnemy;
