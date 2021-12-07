import React, { useState } from 'react';
import reportWebVitals from './reportWebVitals';
import Column from './ui_dbs/Column';
import Radar from './ui_dbs/Radar';
import Charts from './ui_dbs/Charts';
import RadialBar from './ui_dbs/RadialBar';
import Radio from './ui_select_doorType/Radio';
import Slider from './ui_select_doorFloors/Slider';
import { Select, Space } from 'antd'
const App = () => {
    const ui = {
        '双柱': '',
        '堆叠': '',
        '堆叠+背景': ''
    }
    return (
        <div style={{}}>
            <Space><Radio /></Space>
            <Column uiType='堆叠联通区域' />
            <Slider />
        </div>
    )
}
export default App;