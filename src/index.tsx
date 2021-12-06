import 'antd/dist/antd.css';
import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import Column from './ui_dbs/Column';
import Radar from './ui_dbs/Radar';
import Charts from './ui_dbs/Charts';
import RadialBar from './ui_dbs/RadialBar';
import Radio from './ui_select_doorType/Radio';
import Slider from './ui_select_doorFloors/Slider';
const App = () => {
  //https://antv-g2.gitee.io/zh/examples/pie/rose#donut-rose
  return (
    <div>
      <Radio />
      <RadialBar uiType='堆叠玉珏图' />
      <Slider />
    </div>
  )
}
//<React.StrictMode>
ReactDOM.render(<App />, document.getElementById('root'));
reportWebVitals();