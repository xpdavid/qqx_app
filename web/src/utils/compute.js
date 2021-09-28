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
                link.value = link.value + basicScore;
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

