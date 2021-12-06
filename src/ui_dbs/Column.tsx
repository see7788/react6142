import React, { FC, useEffect, useState } from 'react';
import { Column } from '@ant-design/charts';
import { each, groupBy } from '@antv/util';
import store from '../store/webSocket'

export type Param = {
    uiType: '堆叠' | '堆叠联通区域' | '堆叠标注展示总计' | '堆叠设置背景色' | '分组柱状图'
    style?: React.CSSProperties
}
const uiPunlicFile = {
    xField: 'xField',
    yField: 'yField',
    seriesField: 'seriesField',
}
const Ui: FC<Param> = (props) => {
    const db = store(s => s.fjs)
    const doorFloors = store(s => s.select.doorFloors)
    const doorType = store(s => s.select.doorType)
    const uiDataCreate = {
        '堆叠': store.uiDb.b,
        '堆叠联通区域': store.uiDb.b,
        '堆叠标注展示总计': store.uiDb.b,
        '堆叠设置背景色': store.uiDb.b,
        '分组柱状图': store.uiDb.a
    }[props.uiType]
    const [data, dataSet] = useState(uiDataCreate())
    useEffect(() => {
        dataSet(uiDataCreate());
    }, [db, doorFloors, doorType])
    switch (props.uiType) {
        case '堆叠':
            return <Column data={data} {...{
                ...uiPunlicFile,
                isStack: true,
                label: {
                    // 可手动配置 label 数据标签位置
                    position: 'middle',
                    // 'top', 'bottom', 'middle'
                    // 可配置附加的布局方法
                    layout: [
                        // 柱形图数据标签位置自动调整
                        {
                            type: 'interval-adjust-position',
                        }, // 数据标签防遮挡
                        {
                            type: 'interval-hide-overlap',
                        }, // 数据标签文颜色自动调整
                        {
                            type: 'adjust-color',
                        },
                    ],
                },
            }} />;
        case '堆叠联通区域':
            return <Column data={data} {...{
                ...uiPunlicFile,
                isStack: true,
                label: {
                    // 可手动配置 label 数据标签位置
                    position: 'middle', // 'top', 'bottom', 'middle'
                },
                interactions: [
                    {
                        type: 'active-region',
                        enable: false,
                    },
                ],
                connectedArea: {
                    style: (oldStyle, element) => {
                        return {
                            fill: 'rgba(0,0,0,0.25)',
                            stroke: oldStyle.fill,
                            lineWidth: 0.5,
                        };
                    },
                },
            }} />;
        case '堆叠标注展示总计':
            const annotations: any[] = [];
            each(groupBy(data as any, 'xField'), (values: any, k: any) => {
                const value = values.reduce((a: any, b: any) => a + b.value, 0);
                annotations.push({
                    type: 'text',
                    position: [k, value],
                    content: `${value}`,
                    style: {
                        textAlign: 'center',
                        fontSize: 14,
                        fill: 'rgba(0,0,0,0.85)',
                    },
                    offsetY: -10,
                });
            });
            return <Column data={data} {...{
                ...uiPunlicFile,
                isStack: true,
                label: {
                    // 可手动配置 label 数据标签位置
                    position: 'middle',
                    // 'top', 'bottom', 'middle'
                    // 可配置附加的布局方法
                    layout: [
                        // 柱形图数据标签位置自动调整
                        {
                            type: 'interval-adjust-position',
                        }, // 数据标签防遮挡
                        {
                            type: 'interval-hide-overlap',
                        }, // 数据标签文颜色自动调整
                        {
                            type: 'adjust-color',
                        },
                    ],
                },
                // 使用 annotation （图形标注）来展示：总数的 label
                annotations,
            }} />;
        case '堆叠设置背景色':
            return <Column data={data} {...{
                ...uiPunlicFile,
                isStack: true,
                label: {
                    // 可手动配置 label 数据标签位置
                    position: 'middle', // 'top', 'bottom', 'middle'
                },
                interactions: [
                    {
                        type: 'active-region',
                        enable: false,
                    },
                ],
                columnBackground: {
                    style: {
                        fill: 'rgba(0,0,0,0.1)',
                    }
                }
            }} />;
        case '分组柱状图':
            return <Column data={data} {...{
                ...uiPunlicFile,
                isStack: true,
                label: {
                    // 可手动配置 label 数据标签位置
                    position: 'middle',
                    // 'top', 'middle', 'bottom'
                    // 可配置附加的布局方法
                    layout: [
                        // 柱形图数据标签位置自动调整
                        {
                            type: 'interval-adjust-position',
                        }, // 数据标签防遮挡
                        {
                            type: 'interval-hide-overlap',
                        }, // 数据标签文颜色自动调整
                        {
                            type: 'adjust-color',
                        },
                    ],
                },
            }} />;
    }
};

export default Ui;