import React, { FC } from 'react';
import { Slider, Button } from 'antd';
import store from '../store/webSocket';
import _ from 'lodash';
type SliderParam = { uiType?: '竖向' }
const Ui:FC<SliderParam>= ({ uiType }) => {
    const db = store(s => {
        return {
            db: s.select.doorFloors,
            set: (e: [number, number]) => {
                s.select.doorFloorsSet(e);
            },
            maxDoorFloors: _.max(Object.values(s.fjs).map(v => v.doorFloor))
        }
    });
    return (<Slider
        defaultValue={db.db}
        vertical={!!uiType}
        range={{ draggableTrack: true }}
        onChange={db.set}
        min={1}
        max={db.maxDoorFloors}
    />)
}
export default Ui;