import 'antd/dist/antd.css';
import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import Column from './ui_dbs/Column';
import Bar from './ui_dbs/Bar';
import Chart from './ui_dbs/Chart';
import Radio from './ui_select_doorType/Radio';
import Slider from './ui_select_doorFloors/Slider';
const App = () => {
  //https://antv-g2.gitee.io/zh/examples/pie/rose#donut-rose
  return (
    <div>
      <Radio />
      <Chart uiId={1} uiType='堆叠' />
      <Slider />
    </div>
  )
}
//<React.StrictMode>
ReactDOM.render(<App />, document.getElementById('root'));
reportWebVitals();