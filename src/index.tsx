import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import Column from './ui_dbs/Column';
import Bar from './ui_dbs/Bar';
import store, { DoorType } from './store/webSocket'
import Slider from './ui_select_doorFloors/Slider'
import { Radio,RadioChangeEvent } from 'antd';
const App = () => {
  //  <Slider uiType='横向' />
  //  <Slider uiType='竖向' />
  const doorType = store(s => s.select.doorType)
  const doorTypeSet = (e:RadioChangeEvent) => {
    store.select.doorTypeSet(e.target.value)
  }
//https://antv-g2.gitee.io/zh/examples/pie/rose#donut-rose
  return (
    <div>
      <Column uiId={1} uiType='堆叠' />
      <Slider />
      <Radio.Group
        onChange={doorTypeSet}
        value={doorType}>
        <Radio value={'boy'}>boy</Radio>
        <Radio value={'girl'}>girl</Radio>
      </Radio.Group>
    </div>
  )
}
ReactDOM.render(<App />, document.getElementById('root'));
reportWebVitals();