import React from 'react';
import CardItem from '../CardItem';
import DropArea from '../DropArea';

function CardMineUnused({dataSource = []}) {
    return (
        <div className="card-mine-unused">
            <div className="left">ććšćç</div>
            <div className="right">
                <DropArea position={4}>
                    {
                        dataSource.filter(l => l.position === 4).map((item) => {
                            return <CardItem key={item.id} dataSource={item}/>
                        })
                    }
                </DropArea>
            </div>
        </div>
    );
}

export default CardMineUnused;
