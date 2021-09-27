import React, {useContext} from 'react';
import DragContext from '../../context/DragContext'

function DropArea({children, position}) {
    const context = useContext(DragContext);
    const handleDrop = (e) => {
        const cardId = e.dataTransfer.getData("cardId");
        context.onDropCard(Number.parseInt(cardId), position);
    }
    const handleDragOver = (e) => {
        e.preventDefault();
    }
    return (
        <div className="drop-area" onDrop={handleDrop} onDragOver={handleDragOver}>
            {children}
        </div>
    );
}

export default DropArea;
