import React, { FC, useEffect, useState } from 'react';
import { Rose } from '@ant-design/charts';
import store from '../store/webSocket'
//玫瑰图
export type Param = {
  uiType: '堆叠' | '带贴图的分组' | '分组'
  style?: React.CSSProperties
}
const uiPunlicFile = {
  xField: 'xField',
  yField: 'yField',
  seriesField: 'seriesField',
}
const Ui: FC<Param> = (props) => {
  const db = store(s => s.fjs)
  const doorFloors = store(s => s.select.doorFloors)
  const doorType = store(s => s.select.doorType)
  const uiDataCreate = {
    '堆叠': store.uiDb.b,
    '带贴图的分组': store.uiDb.b,
    '分组': store.uiDb.b
  }[props.uiType]
  const [data, dataSet] = useState(uiDataCreate())
  useEffect(() => {
    dataSet(uiDataCreate());
  }, [db, doorFloors, doorType])
  switch (props.uiType) {
    case '堆叠':
      return <Rose data={data} {...{
        ...uiPunlicFile,
      legend:{
        position:'top'
      },
        isStack: true,
        // 当 isStack 为 true 时，该值为必填
        radius: 0.9,
        label: {
          offset: -15,
        },
        interactions: [
          {
            type: 'element-active',
          },
        ],
      }} />;
    case '带贴图的分组':
      return <Rose data={data} {...{
        ...uiPunlicFile,
        isGroup: true,
        legend:{
          position:'top'
        },
        radius: 0.9,
        label: {
          offset: -15,
        },
        pattern: {
          type: 'dot',
        },
        interactions: [
          {
            type: 'element-active',
          },
        ],
      }} />;
    case '分组':
      return <Rose data={data} {...{
        ...uiPunlicFile,
        legend:{
          position:'top'
        },
        radius: 0.9,
        label: {
          offset: -15,
        },
        interactions: [
          {
            type: 'element-active',
          },
        ],
      }} />;
  }
};

export default Ui;