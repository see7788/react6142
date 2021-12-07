import mobz from 'mobz'
import cookies from 'js-cookie'
import _ from 'lodash'
declare global {
    interface Window {
        config6142Db: {
            socketAllUrl: string
            fjs: Fjs
        }
    }
}
const ws = new WebSocket(window.config6142Db.socketAllUrl);
ws.onopen = () => {
    console.log('WebSocket onopen');
};

ws.onerror = (e) => {
    console.log('onerror', e)
};
//链接关闭的回调函数
ws.onclose = () => {
    console.log('WebSocket onopen');
};
type DoorType = 'boy' | 'girl'
type DoorFloor = [number, number];
interface IdDb {
    'id': number,//id
    'doorFloor': number,//楼层
    'doorName': string,//房间名
    'doorType': DoorType,//girl|boy
    'dateTime': string,//时间
    'nowNum': number,//当前人数
    'kenNum': number
}
type Fjs = Record<number, IdDb>
type uiDb_a = {
    xField: string,
    yField: number,
    seriesField: '坑位总数' | '当前人数',
}[]
type uiDb_b = {
    xField: string,
    yField: number,
    seriesField: '剩余坑位' | '当前人数',
}[]
type Sotre = {
    fjs: Fjs
    select: {
        doorType: DoorType,
        doorTypeSet(doorType: DoorType): void,
        doorFloors: DoorFloor,
        doorFloorsSet(ids: DoorFloor): void
    }
    uiDb: {
        a(): uiDb_a
        b(): uiDb_b
    }
}
/*
cookies.remove('doorType')
cookies.remove('doorFloorsMin')
cookies.remove('doorFloorsMax')
*/
export default mobz<Sotre>((get, set) => {
    ws.onmessage = ({ data }) => {
        switch (data.api) {
            case 'input':
                get().fjs[data.id] = data;
                break;
            default:
                console.log('不处理', data);
        }

    }
    const fjsFilter = () => {
        const db = get().fjs;
        const doorType = get().select.doorType
        const min = get().select.doorFloors[0]
        const max = get().select.doorFloors[1]
        return Object.values(db).filter(c => {
            return c.doorType === doorType && c.doorFloor >= min && c.doorFloor <= max
        })
    }
    const windowDoorFloors=Object.values( window.config6142Db.fjs).map(({doorFloor})=>doorFloor)
    return {
        fjs: window.config6142Db.fjs,
        uiDb: {
            a: () => {
                const data: uiDb_a = []
                fjsFilter().forEach(({ id, doorName, doorType, kenNum, nowNum }) => {
                    data.push({
                        xField: `${id}:${doorName}-${doorType}`,
                        yField: kenNum,
                        seriesField: '坑位总数',
                    });
                    data.push({
                        xField: `${id}:${doorName}-${doorType}`,
                        yField: nowNum,
                        seriesField: '当前人数',
                    })
                })
                return data;
            },
            b: () => {
                const data: uiDb_b = [];
                fjsFilter().forEach(({ id, doorName, doorType, kenNum, nowNum }) => {
                    data.push({
                        xField: `${id}:${doorName}-${doorType}`,
                        yField: nowNum,
                        seriesField: '当前人数',
                    });
                    data.push({
                        xField: `${id}:${doorName}-${doorType}`,
                        yField: kenNum - nowNum,
                        seriesField: '剩余坑位',
                    });
                })
                return data;
            }
        },
        select: {
            doorType: (cookies.get('doorType') || 'boy') as DoorType,
            doorTypeSet: (doorType) => {
                get().select.doorType = doorType
                cookies.set('doorType', doorType)
            },
            doorFloors:[
                Number(cookies.get('doorFloorsMin') || _.min(windowDoorFloors)),
                Number(cookies.get('doorFloorsMax') || _.max(windowDoorFloors))
            ],
            doorFloorsSet: (doorFloors) => {
                get().select.doorFloors = doorFloors
                cookies.set('doorFloorsMin', `${doorFloors[0]}`)
                cookies.set('doorFloorsMax', `${doorFloors[1]}`)
            }
        }
    }
})