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
  return (
    <div>
      <Radio />
      <Column uiType='堆叠联通区域' />
      <Slider />
    </div>
  )
}
//<React.StrictMode>
ReactDOM.render(<App />, document.getElementById('root'));
reportWebVitals();