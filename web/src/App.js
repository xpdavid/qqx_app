import React, {useEffect, useState} from 'react';
import {Button, Col, Row} from 'antd';
import './App.less';

import CardLib from './components/CardLib';
import CardEnemy from './components/CardEnemy';
import CardCommon from './components/CardCommon';
import CardMineUsed from './components/CardMineUsed';
import CardMineUnused from './components/CardMineUnused';
import GroupChart from './components/GroupChart';
import CardInput from './components/CardInput';

import carddata from './carddata'
import {computeSize, getLinks, initCardsPosition} from './utils/compute'

import DragContext from './context/DragContext'

function App() {

    const [cards, setCards] = useState(carddata.nodes)
    const [links, setLinks] = useState([])

    // 初始化
    const init = () => {
        // 1. 初始化卡牌，将卡牌位置position都设置为牌库0
        initCardsPosition(cards)
        // 2. 根据卡牌组合，设置卡牌间的关系
        const links = getLinks(carddata.groups)
        setLinks(links)
        // 3. 根据卡牌关系，设置卡牌尺寸
        computeSize(cards, links)
        refreshCards();
    }

    // 初始化
    useEffect(() => {
        init()
    }, [])

    const handleDragStart = function (card) {

    }

    const handleDropCard = function (cardId, position) {
        // 获取拖动的卡牌
        const card = cards.find(l => l.id === cardId)
        if (position === card.position) {
            return
        }
        // 设置卡牌新的位置
        card.position = position;

        // 重新计算所有可能的组合，关系及Size
        // 筛选掉所有包含对方展示牌的组合
        const enemyCardIds = cards.filter(l => l.position === 1).map(l => l.id);
        let newGroups = carddata.groups.filter((group) => {
            // 筛选掉所有包含对方展示牌的组合
            for (let i = 0, len = group.member.length; i < len; i++) {
                if (enemyCardIds.includes(group.member[i])) {
                    return false;
                }
            }
            return true;
        })

        // 设置新的关系
        const links = getLinks(newGroups);
        setLinks(links)

        // 根据卡牌关系，设置卡牌尺寸
        computeSize(cards, links);

        refreshCards();
    }

    const handleCardsUpdate = (commonCardIds, minCardIds) => {
        commonCardIds.forEach(id => {
            const card = cards.find(l => l.id === id)
            card.position = 4 //我方手牌
        });
        minCardIds.forEach(id => {
            const card = cards.find(l => l.id === id)
            card.position = 2 //公共牌
        });
        refreshCards();
    }

    const refreshCards = () => {
        setCards([].slice.call(cards))
    }

    const handleReset = () => {
        init()
    }

    return (
        <DragContext.Provider value={{onDragStart: handleDragStart, onDropCard: handleDropCard}}>
            <div className="app">
                <Row className="app-input">
                    <Col span={10}>
                        <CardLib dataSource={cards}/>
                        <CardInput cards={cards} handleCardsUpdate={handleCardsUpdate}/>
                        <CardEnemy dataSource={cards}/>
                        <CardCommon dataSource={cards}/>
                        <CardMineUsed dataSource={cards}/>
                        <CardMineUnused dataSource={cards}/>
                        <div style={{textAlign: "center", paddingTop: 4}}>
                            <Button type="danger" onClick={handleReset}>重置牌局</Button>
                        </div>
                    </Col>
                    <Col span={14}>
                        <GroupChart cards={cards} links={links}/>
                    </Col>
                </Row>
            </div>
        </DragContext.Provider>

    );
}

export default App;
