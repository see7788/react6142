import React, { FC } from 'react';
import { Radio, RadioChangeEvent } from 'antd';
import store from '../store/webSocket';
type RadioParam = {
    style?: React.CSSProperties
}
const Ui: FC<RadioParam> = ({style}) => {
    const doorType = store(s => s.select.doorType)
    const doorTypeSet = (e: RadioChangeEvent) => {
        store.select.doorTypeSet(e.target.value)
    }
    return (
        <Radio.Group
            style={style||{}}
            onChange={doorTypeSet}
            value={doorType}>
            <Radio value={'boy'}>boy</Radio>
            <Radio value={'girl'}>girl</Radio>
        </Radio.Group>
    )
}
export default Ui;