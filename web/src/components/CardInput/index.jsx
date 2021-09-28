import React, {useState} from 'react';
import {Alert, Button, Input, Modal} from 'antd';

const {TextArea} = Input;

function CardInput({cards = [], handleCardsUpdate}) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [commonInput, setCommonInput] = useState('');
    const [mineInput, setMineInput] = useState('');
    let isMissingNodes = false;

    const common_ids = commonInput.split(/\s+/)
        .filter(value => cards.some(card => card.name === value))
        .map(value => cards.find(card => card.name === value).id)
    const mine_ids = mineInput.split(/\s+/)
        .filter(value => cards.some(card => card.name === value))
        .map(value => cards.find(card => card.name === value).id)

    if (commonInput.length !== 0 && common_ids.length !== commonInput.split(/\s+/).length) {
        isMissingNodes = true;
    }
    if (mineInput.length !== 0 && mine_ids.length !== mineInput.split(/\s+/).length) {
        isMissingNodes = true;
    }

    const confirm = () => {
        if (isMissingNodes) {
            return;
        }
        setIsModalVisible(false)
        handleCardsUpdate(common_ids, mine_ids)
    }

    return <div>
        <div style={{textAlign: "center", paddingTop: 8, paddingBottom: 8}}>
            <Button type="primary" onClick={() => setIsModalVisible(true)}>快捷输入</Button>
        </div>
        <Modal title="快捷输入" visible={isModalVisible} onOk={confirm} onCancel={() => setIsModalVisible(false)}>
            {isMissingNodes ? <Alert message="有些名字找不到，请检查!" type="error"/> : null}
            <div className="card-common">
                <div className="left">公共牌区</div>
                <div className="right">
                    <TextArea rows={3} value={commonInput} onChange={e => setCommonInput(e.target.value)}/>
                </div>
            </div>
            <div className="card-mine-unused">
                <div className="left">我方手牌</div>
                <div className="right">
                    <TextArea rows={3} value={mineInput} onChange={e => setMineInput(e.target.value)}/>
                </div>
            </div>
        </Modal>
    </div>
}

export default CardInput;