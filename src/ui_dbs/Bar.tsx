import React, { FC, useEffect,useState } from "react";
import { Bar } from '@antv/g2plot';
import store from '../store/webSocket'
export type Param = {
    uiType: '双柱' | '堆叠'
    uiId: number
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
        xField: number,
        yField: string,
        seriesField: string,
    }[]
    const uiDataCreate = {
        '双柱': () => {
            const data: UiData = [];
            store.select.fjs().forEach(({ id, doorName, doorType, kenNum, nowNum }) => {
                data.push({
                    xField: kenNum,
                    yField: `${id}:${doorName}-${doorType}`,
                    seriesField: '坑位总数',
                });
                data.push({
                    xField: nowNum,
                    yField: `${id}:${doorName}-${doorType}`,
                    seriesField: '当前人数',
                })
            })
            return data;
        },
        '堆叠': () => {
            const data: UiData = [];
            store.select.fjs().forEach(({ id, doorName, doorType, kenNum, nowNum }) => {
                data.push({
                    xField: nowNum,
                    yField: `${id}:${doorName}-${doorType}`,
                    seriesField: '当前人数',
                });
                data.push({
                    xField: kenNum - nowNum,
                    yField: `${id}:${doorName}-${doorType}`,
                    seriesField: '坑位剩余',
                });
            })
            return data;
        }
    }
    const [data] = useState(uiDataCreate[props.uiType]())
    const uiCreate = {
        '双柱': () => {
            return new Bar(domId, {
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
            return new Bar(domId, {
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