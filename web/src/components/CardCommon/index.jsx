import React from 'react';
import CardItem from '../CardItem';
import DropArea from '../DropArea';

function CardCommon({dataSource = []}) {
    return (
        <div className="card-common">
            <div className="left">公共牌区</div>
            <div className="right">
                <DropArea position={2}>
                    {
                        dataSource.filter(l => l.position === 2).map((item) => {
                            return <CardItem key={item.id} dataSource={item}/>
                        })
                    }
                </DropArea>
            </div>
        </div>
    );
}

export default CardCommon;
