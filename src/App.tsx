import React, { useState, lazy, Suspense } from 'react';
import { Select, Pagination, Space } from 'antd'
const Column = lazy(() => import('./ui_fjs/Column'));
const Radar = lazy(() => import('./ui_fjs/Radar'));
const Charts = lazy(() => import('./ui_fjs/Charts'));
const RadialBar = lazy(() => import('./ui_fjs/RadialBar'));
const Radio = lazy(() => import('./ui_select_doorType/Radio'));
const Slider = lazy(() => import('./ui_select_doorFloors/Slider'));
const { Option } = Select
const App = () => {
    const uis = [
        () => <RadialBar uiType='堆叠玉珏图' />,
        () => <Column uiType='柱状堆叠' />,
        () => <Column uiType='柱状分组' />,
        () => <Column uiType='柱状堆叠联通区域' />,
        () => <Column uiType='柱状堆叠标注展示总计' />,
        () => <Column uiType='柱状堆叠设置背景色' />,
        () => <Charts uiType='玫瑰堆叠' />,
        () => <Charts uiType='玫瑰分组' />,
        () => <Charts uiType='玫瑰带贴图的分组' />,
        () => <Radar uiType='雷达图双色' />,
        () => <Radar uiType='雷达图双色带底色' />,
    ]
    const [uiId, uiIdSet] = useState(5)
    const UiNow = uis[uiId]
    return (
        <Suspense fallback={<div>来个动画吧...</div>}>
            <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                <div style={{
                    flex: "1",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                }}>
                    <UiNow />
                </div>
                <Slider />
                <Space>
                    <Radio />
                    <Pagination
                        simple
                        size="small"
                        pageSize={1}
                        defaultCurrent={uiId}
                        onChange={e => uiIdSet(e - 1)}
                        total={uis.length} />
                </Space>
            </div>
        </Suspense>
    )
}
export default App;

/*
 <Space>
                    <Radio />
                    <Select
                        showSearch
                        defaultValue={uiId}
                        style={{ width: 200 }}
                        placeholder="Select a person"
                        optionFilterProp="children"
                        onChange={e => { uiIdSet(e) }}
                    >
                        {
                            Object.keys(uis).map((k,i) => {
                                return (
                                    <Option key={i} value={i}>{i}</Option>
                                )
                            })
                        }
                    </Select>
                </Space>
                */