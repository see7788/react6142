import React, { FC, useEffect } from "react";
import { Bar } from '@antv/g2plot';
import store from '../store/webSocket'
export type Param = {
    uiType: '双柱' | '堆叠' | '堆叠+背景'
}
let domId = 0;
const UiStart: FC<Param> = (props) => {
    const db = store(s => s.fjs)
    domId++
    const divId = `idColumn${domId}`;
    useEffect(() => {
        const uiPunlicFile = {
            xField: 'xField',
            yField: 'yField',
            seriesField: 'seriesField',
        }
        const data: any[] = []
        const uiConfig = {
            '双柱': () => {
                Object.values(db).forEach(({ id, doorFloor, doorName, doorType, kenNum, nowNum }) => {
                    data.push({
                        yField: `${doorName}-${doorType}`,
                        xField: kenNum,
                        seriesField: '坑位总数',
                    });
                    data.push({
                        yField: `${doorName}-${doorType}`,
                        xField: nowNum,
                        seriesField: '当前人数',
                    })
                })
                return new Bar(divId, {
                    ...uiPunlicFile,
                    data,
                    isGroup: true,
                    /** 设置颜色 */
                    //color: ['#1ca9e6', '#f88c24'],
                    /** 设置间距 */
                    // marginRatio: 0.1,
                    label: {
                        // 可手动配置 label 数据标签位置
                        position: 'middle', // 'top', 'middle', 'bottom'
                        // 可配置附加的布局方法
                        layout: [
                            // 柱形图数据标签位置自动调整
                            { type: 'interval-adjust-position' },
                            // 数据标签防遮挡
                            { type: 'interval-hide-overlap' },
                            // 数据标签文颜色自动调整
                            { type: 'adjust-color' },
                        ],
                    },
                })
            },
            '堆叠': () => {
                Object.values(db).forEach(({ id, doorFloor, doorName, doorType, kenNum, nowNum }) => {
                    data.push({
                        yField: `${id}-${doorName}${doorType}`,
                        xField: nowNum,
                        seriesField: '当前人数',
                    });
                    data.push({
                        yField: `${id}-${doorName}${doorType}`,
                        xField: kenNum - nowNum,
                        seriesField: '坑位剩余',
                    });
                })
                return new Bar(divId, {
                    data,
                    ...uiPunlicFile,
                    isStack: true,
                    label: {
                        // 可手动配置 label 数据标签位置
                        position: 'middle', // 'top', 'bottom', 'middle'
                        // 可配置附加的布局方法
                        layout: [
                            // 柱形图数据标签位置自动调整
                            { type: 'interval-adjust-position' },
                            // 数据标签防遮挡
                            { type: 'interval-hide-overlap' },
                            // 数据标签文颜色自动调整
                            { type: 'adjust-color' },
                        ],
                    },
                })
            },
            '堆叠+背景': () => {
                Object.values(db).forEach(({ id, doorFloor, doorName, doorType, kenNum, nowNum }) => {
                    data.push({
                        yField: `${id}-${doorName}${doorType}`,
                        xField: nowNum,
                        seriesField: '当前人数',
                    });
                    data.push({
                        yField: `${id}-${doorName}${doorType}`,
                        xField: kenNum - nowNum,
                        seriesField: '坑位剩余',
                    });
                })
                return new Bar(divId, {
                    data,
                    isStack: true,
                    ...uiPunlicFile,
                    label: {
                        // 可手动配置 label 数据标签位置
                        position: 'middle', // 'top', 'bottom', 'middle'
                    },
                    interactions: [{ type: 'active-region', enable: false }],
                    columnBackground: {
                        style: {
                            fill: 'rgba(0,0,0,0.1)',
                        },
                    },
                })
            }
        }
        const obj = uiConfig[props.uiType]();
        obj.render();
    }, [db])
    return <div id={divId}></div>
}

export default UiStart;