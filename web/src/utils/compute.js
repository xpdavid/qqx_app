/**
 * 初始化卡牌位置
 * 将卡牌位置position都设置为牌库0
 */
export function initCardsPosition(cards) {
    cards.forEach(item => {
        item.position = 0
        item.symbolSize = 8
    })
}

/**
 * 初始化卡牌大小
 */
function initCardsSize(cards) {
    cards.forEach(item => {
        item.symbolSize = 8
    })
}

/**
 * 获取link节点，没有就新增，此处nodeId1<nodeId2
 */
function getLink(links, nodeId1, nodeId2) {
    let link = links.find(l => l.source === nodeId1 && l.target === nodeId2)
    if (!link) {
        link = {
            id: links.length,
            name: '组合：',
            source: nodeId1,
            target: nodeId2,
            value: 1,
            lineStyle: {
                normal: {
                    width: 1
                }
            }
        }
        links.push(link)
    }
    return link
}

// 计算卡牌之间的关系
export function getLinks(groups) {
    const links = [];
    groups.forEach(group => {
        const basicScore = group.score / (group.member.length - 1);
        for (let i = 0; i < group.member.length; i++) {
            for (let j = i + 1; j < group.member.length; j++) {
                const link = getLink(links, group.member[i], group.member[j]);
                link.value = Number.parseInt(link.value + basicScore);
                link.name += (' ' + group.name);
                link.lineStyle.normal.width = link.value / 3;
                // link.lineStyle.normal.color = link.value > 10 ? 'green' : (link.value > 5 ? 'orange' : '#000');
            }
        }
    })
    return links
}

/**
 *  根据卡牌关系，设置卡牌尺寸
 */
export function computeSize(cards, links) {
    initCardsSize(cards)
    links.forEach((item) => {
        cards[item.source].symbolSize += 5;
        cards[item.target].symbolSize += 5;
    })
}

export function getSuggestion(cards, links) {
    const suggestion = {
        dirtyCards: [], // 无法得到牌为废牌
        singleCards: [], // 只有自己一个的为单牌
        normalCards: [], // 单组合牌（暂不可用）
        goodCards: [] //推荐牌
    }
    // 首先筛选出公共区和我方手牌
    const unusedCards = cards.filter(l => l.position === 2 || l.position === 4);
    // 获取我方手牌季节类型
    const myCardTypes = new Set(cards.filter(l => l.position === 4).map(l => l.cardType));
    // 没有公共区和我方手牌则没有建议
    if (unusedCards.length === 0) {
        return null
    }

    // 遍历卡牌
    unusedCards.forEach(card => {
        const cardlinks = links.filter(link => link.source === card.id || link.target === card.id);
        // 牌在公共区，并且手牌没有相应季节牌
        if (card.position === 2 && !myCardTypes.has(card.cardType)) {
            suggestion.dirtyCards.push(card);
            return
        }
        if (cardlinks.length === 0) {
            // 筛选没有任何关系的牌
            suggestion.singleCards.push(card);
        } else if (cardlinks.length === 1) {
            // 筛选出只有一个组合，并且组合牌在牌库
            const groupCardId = cardlinks[0].soucre === card.id ? cardlinks[0].target : cardlinks[0].soucre;
            if (unusedCards.find(l => l.cardId === groupCardId)) {
                suggestion.goodCards.push(card);
            } else {
                suggestion.normalCards.push(card);
            }
        } else {
            suggestion.goodCards.push(card);
        }
    })
    return suggestion
}
