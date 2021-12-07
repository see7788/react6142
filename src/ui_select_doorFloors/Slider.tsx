import React, { FC } from 'react';
import { Slider } from 'antd';
import store from '../store/webSocket';
import _ from 'lodash';
type SliderParam = {
    uiType?: '竖向',
    style?: React.CSSProperties
}
/**
 * 包裹在Space会报错
 */
const Ui: FC<SliderParam> = ({ uiType, style }) => {
    const db = store(s => s.select.doorFloors)
    const max = store(s => _.max(Object.values(s.fjs).map(v => v.doorFloor)))
    const min = store(s => _.min(Object.values(s.fjs).map(v => v.doorFloor)))
    const set = store.select.doorFloorsSet
    return (<Slider
        tipFormatter={v=>`第${v}层`} 
        style={style || {}}
        tooltipVisible={true}//值为 true 时，Tooltip 将会始终显示；否则始终不显示，哪怕在拖拽及移入时
        range={{ draggableTrack: true }}//	双滑块模式
        defaultValue={db}
        onChange={set}
        min={min}
        max={max}
    />)
}
export default Ui;