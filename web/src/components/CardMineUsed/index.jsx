import React from 'react';
import CardItem from '../CardItem';
import DropArea from '../DropArea';

function CardMineUsed({dataSource = []}) {
    return (
        <div className="card-mine-used">
            <div className="left">我方展示牌</div>
            <div className="right">
                <DropArea position={3}>
                    {
                        dataSource.filter(l => l.position === 3).map((item) => {
                            return <CardItem key={item.id} dataSource={item}/>
                        })
                    }
                </DropArea>
            </div>
        </div>
    );
}

export default CardMineUsed;
