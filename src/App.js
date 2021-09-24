import React, { useState, useEffect } from 'react';
import { Row, Col, Button } from 'antd';
import './App.less';

import CardLib from './components/CardLib';
import CardEnemy from './components/CardEnemy';
import CardCommon from './components/CardCommon';
import CardMineUsed from './components/CardMineUsed';
import CardMineUnused from './components/CardMineUnused';
import GroupChart from './components/GroupChart';
import Suggest from './components/Suggest';

import carddata from './carddata'
import { initCardsPosition, getLinks, computeSize, getSuggestion } from './utils/compute'

import DragContext from './context/DragContext'

function App() {

  const [cards, setCards] = useState(carddata.nodes)
  const [groups, setGroups] = useState(carddata.groups)
  const [links, setLinks] = useState([])
  const [suggestion, setSuggestion] = useState(null)

  // 初始化
  const init = () => {
    // 1. 初始化卡牌，将卡牌位置position都设置为牌库0
    initCardsPosition(cards)
    // 2. 根据卡牌组合，设置卡牌间的关系
    const links = getLinks(carddata.groups)
    setLinks(links)
    // 3. 根据卡牌关系，设置卡牌尺寸
    computeSize(cards, links)
    // 4. 计算自身卡牌和公共卡牌的建议
    const suggestion = getSuggestion(cards, links)
    setSuggestion(suggestion)
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
    const card = cards.find(l => l.id == cardId)
    if (position === card.position) {
      return
    }
    // 设置卡牌新的位置
    card.position = position;

    const enmemyCardIds = cards.filter(l => l.position === 1).map(l => l.id);
    // 获取我方手牌季节类型
    const myCardTypes = new Set(cards.filter(l => l.position === 4).map(l => l.cardType));
    // 废牌（即我方手牌类型不对应的公共牌和牌库牌）
    const dirtyCardIds = cards.filter(card => {
      if ((card.position === 2 || card.position === 0) && !myCardTypes.has(card.cardType)) {
        return true
      }
      return false
    }).map(l => l.id)
    // 重新计算所有可能的组合，关系及Size
    // 筛选掉所有包含对方展示牌的组合
    let newGroups = carddata.groups.filter((group) => {
      // 筛选掉所有包含对方展示牌的组合
      for (let i = 0, len = group.member.length; i < len; i++) {
        if (enmemyCardIds.includes(group.member[i])) {
          return false;
        }
        // 筛选掉所有废牌
        if (dirtyCardIds.includes(group.member[i])) {
          return false;
        }
      }
      return true;
    })
    setGroups(newGroups);

    // 设置新的关系
    const links = getLinks(newGroups);
    setLinks(links)

    // 根据卡牌关系，设置卡牌尺寸
    computeSize(cards, links);

    // 计算自身卡牌和公共卡牌的建议
    const suggestion = getSuggestion(cards, links);
    setSuggestion(suggestion);

    refreshCards();
  }

  const refreshCards = () => {
    setCards([].slice.call(cards))
  }

  const handleReset = () => {
    init()
  }

  return (
    <DragContext.Provider value={{ onDragStart: handleDragStart, onDropCard: handleDropCard }}>
      <div className="app">
        <Row className="app-input" >
          <Col span={10}>
            <CardLib dataSource={cards} />
            <CardEnemy dataSource={cards} />
            <CardCommon dataSource={cards} />
            <CardMineUsed dataSource={cards} />
            <CardMineUnused dataSource={cards} />
            <Suggest suggestion={suggestion} />
            <div style={{ textAlign: "center", paddingTop: 20 }}>
              <Button className='btn-reset' type='primary' shape="circle" size='large' onClick={handleReset}>
                重置牌局
              </Button>
            </div>
          </Col>
          <Col span={14}>
            <GroupChart cards={cards} links={links} />
          </Col>
        </Row>
      </div>
    </DragContext.Provider>

  );
}

export default App;
