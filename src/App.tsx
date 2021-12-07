import React, { useState } from 'react';
import Column from './ui_fjs/Column';
import Radar from './ui_fjs/Radar';
import Charts from './ui_fjs/Charts';
import RadialBar from './ui_fjs/RadialBar';
import Radio from './ui_select_doorType/Radio';
import Slider from './ui_select_doorFloors/Slider';
import { Select, Space } from 'antd'
const { Option } = Select
const App = () => {
    const uis = {
        '1玉珏图堆叠': () => <RadialBar uiType='堆叠玉珏图' />,
        '2柱状图堆叠': () => <Column uiType='堆叠' />,
        '3柱状图分组': () => <Column uiType='分组' />,
        '4柱状图堆叠联通区域': () => <Column uiType='堆叠联通区域' />,
        '5柱状图堆叠标注展示总计': () => <Column uiType='堆叠标注展示总计' />,
        '6柱状图堆叠设置背景色': () => <Column uiType='堆叠设置背景色' />,
        "7玫瑰图堆叠": () => <Charts uiType='堆叠' />,
        "8玫瑰图分组": () => <Charts uiType='分组' />,
        "9带贴图的分组": () => <Charts uiType='带贴图的分组' />,
        "10雷达图双色": () => <Radar uiType='双色' />,
        "11雷达图双色带底色": () => <Radar uiType='双色带底色' />,
    }
    type Uis = keyof typeof uis
    const defUi: Uis = '11雷达图双色带底色'
    const [ui, uiSet] = useState<keyof typeof uis>(defUi)
    return (
        <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <Space>
                <Radio />
                <Select
                    showSearch
                    defaultValue={defUi}
                    style={{ width: 200 }}
                    placeholder="Select a person"
                    optionFilterProp="children"
                    onChange={(e) => { uiSet(e) }}
                >
                    {
                        Object.keys(uis).map(k => {
                            return (
                                <Option key={k} value={k}>{k}</Option>
                            )
                        })
                    }
                </Select>
            </Space>
            <div style={{
                flex: "1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
            }}>
                {uis[ui]()}
            </div>
            <Slider />
        </div>
    )
}
export default App;