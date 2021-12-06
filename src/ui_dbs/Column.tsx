import React, { FC, useEffect, useState } from "react";
import { Column } from '@antv/g2plot';
import store from '../store/webSocket'
export type Param = {
    uiType: '双柱' | '堆叠' | '堆叠背景'
    uiId: number
    style?: React.CSSProperties
}
const Ui: FC<Param> = (props) => {
    const db = store(s => s.fjs)
    const doorFloors = store(s => s.select.doorFloors)
    const doorType = store(s => s.select.doorType)
    const domId = `idColumn${props.uiId}`;
    const uiPunlicFile = {
        xField: 'xField',
        yField: 'yField',
        seriesField: 'seriesField',
    }
    type UiData = {
        xField: string,
        yField: number,
        seriesField: string,
    }[]
    const uiDataCreate = {
        '双柱': () => {
            const data: UiData = [];
            store.select.fjs().forEach(({ id, doorName, doorType, kenNum, nowNum }) => {
                data.push({
                    xField: `${id}:${doorName}-${doorType}`,
                    yField: kenNum,
                    seriesField: '坑位总数',
                });
                data.push({
                    xField: `${id}:${doorName}-${doorType}`,
                    yField: nowNum,
                    seriesField: '当前人数',
                })
            })
            return data;
        },
        '堆叠': () => {
            const data: UiData = [];
            store.select.fjs().forEach(({ id, doorName, doorType, kenNum, nowNum }) => {
                data.push({
                    xField: `${id}:${doorName}-${doorType}`,
                    yField: nowNum,
                    seriesField: '当前人数',
                });
                data.push({
                    xField: `${id}:${doorName}-${doorType}`,
                    yField: kenNum - nowNum,
                    seriesField: '坑位剩余',
                });
            })
            return data;
        },
        '堆叠背景': () => {
            const data: UiData = [];
            store.select.fjs().forEach(({ id, doorFloor, doorName, doorType, kenNum, nowNum }) => {
                data.push({
                    xField: `${id}:${doorName}-${doorType}`,
                    yField: nowNum,
                    seriesField: '当前人数',
                });
                data.push({
                    xField: `${id}:${doorName}-${doorType}`,
                    yField: kenNum - nowNum,
                    seriesField: '坑位剩余',
                });
            })
            return data;
        }
    }
    const [data] = useState(uiDataCreate[props.uiType]())
    const uiCreate = {
        '双柱': () => {
            return new Column(domId, {
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
            return new Column(domId, {
                data,
                isStack: true,
                ...uiPunlicFile,
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
        '堆叠背景': () => {
            return new Column(domId, {
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
    useEffect(() => {
        const uiObj = uiCreate[props.uiType]();
        uiObj.render();
        return () => {
            uiObj.changeData(uiDataCreate[props.uiType]())
        }
    }, [db,doorFloors, doorType])

    return <div id={domId}></div>
}

export default Ui;