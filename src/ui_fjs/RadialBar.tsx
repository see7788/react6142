import React, { FC, useEffect, useState } from 'react';
import { RadialBar } from '@ant-design/charts';
import store from '../store/webSocket'

export type Param = {
    uiType: '堆叠玉珏图'
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
        '堆叠玉珏图': store.uiDb.b,
    }[props.uiType]
    const [data, dataSet] = useState(uiDataCreate())
    useEffect(() => {
        dataSet(uiDataCreate());
    }, [db, doorFloors, doorType])
    switch (props.uiType) {
        case '堆叠玉珏图':
            return <RadialBar data={data} {...{
                ...uiPunlicFile,
                isStack: true,
                legend:{
                    position:'top'
                  },
                maxAngle: 200,
            }} />;
       }
};

export default Ui;