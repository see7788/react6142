import mobz from 'mobz'
import cookies from 'js-cookie'
const ws = new WebSocket('ws://39.97.216.195:6007/15801580543');
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
        fjs(): IdDb[]
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
/*cookies.remove('doorType')
cookies.remove('doorFloorsMin')
cookies.remove('doorFloorsMax')*/
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
    return {
        fjs: {
            1: {
                'id': 1,//id
                'doorFloor': 1,//楼层
                'doorName': '1层西卫',//房间名
                'doorType': 'girl',//girl|boy
                'dateTime': 'string',//时间
                'nowNum': 6,//当前人数
                'kenNum': 12
            },
            2: {
                'id': 2,//id
                'doorFloor': 2,//楼层
                'doorName': '2层西卫',//房间名
                'doorType': 'girl',//girl|boy
                'dateTime': 'string',//时间
                'nowNum': 7,//当前人数
                'kenNum': 15
            },
            3: {
                'id': 3,//id
                'doorFloor': 3,//楼层
                'doorName': '3层西卫1',//房间名
                'doorType': 'girl',//girl|boy
                'dateTime': 'string',//时间
                'nowNum': 2,//当前人数
                'kenNum': 13
            },
            4: {
                'id': 4,//id
                'doorFloor': 4,//楼层
                'doorName': '4层西卫1',//房间名
                'doorType': 'girl',//girl|boy
                'dateTime': 'string',//时间
                'nowNum': 9,//当前人数
                'kenNum': 10
            },
            5: {
                'id': 5,//id
                'doorFloor': 5,//楼层
                'doorName': '5层西卫2',//房间名
                'doorType': 'girl',//girl|boy
                'dateTime': 'string',//时间
                'nowNum': 3,//当前人数
                'kenNum': 6
            },
            6: {
                'id': 6,//id
                'doorFloor': 6,//楼层
                'doorName': '6层西卫2',//房间名
                'doorType': 'girl',//girl|boy
                'dateTime': 'string',//时间
                'nowNum': 9,//当前人数
                'kenNum': 20
            },
            7: {
                'id': 7,//id
                'doorFloor': 7,//楼层
                'doorName': '7层西卫2',//房间名
                'doorType': 'girl',//girl|boy
                'dateTime': 'string',//时间
                'nowNum': 9,//当前人数
                'kenNum': 10
            },
            8: {
                'id': 8,//id
                'doorFloor': 8,//楼层
                'doorName': '8层西卫2',//房间名
                'doorType': 'girl',//girl|boy
                'dateTime': 'string',//时间
                'nowNum': 9,//当前人数
                'kenNum': 30
            },
            9: {
                'id': 9,//id
                'doorFloor': 9,//楼层
                'doorName': '9层西卫2',//房间名
                'doorType': 'girl',//girl|boy
                'dateTime': 'string',//时间
                'nowNum': 9,//当前人数
                'kenNum': 11
            },
            11: {
                'id': 11,//id
                'doorFloor': 1,//楼层
                'doorName': '1层西卫',//房间名
                'doorType': 'boy',//girl|boy
                'dateTime': 'string',//时间
                'nowNum': 6,//当前人数
                'kenNum': 9
            },
            12: {
                'id': 12,//id
                'doorFloor': 2,//楼层
                'doorName': '2层西卫',//房间名
                'doorType': 'boy',//girl|boy
                'dateTime': 'string',//时间
                'nowNum': 7,//当前人数
                'kenNum': 15
            },
            13: {
                'id': 13,//id
                'doorFloor': 3,//楼层
                'doorName': '3层西卫1',//房间名
                'doorType': 'boy',//girl|boy
                'dateTime': 'string',//时间
                'nowNum': 2,//当前人数
                'kenNum': 11
            },
            14: {
                'id': 14,//id
                'doorFloor': 4,//楼层
                'doorName': '4层西卫1',//房间名
                'doorType': 'boy',//girl|boy
                'dateTime': 'string',//时间
                'nowNum': 9,//当前人数
                'kenNum': 20
            },
            15: {
                'id': 15,//id
                'doorFloor': 5,//楼层
                'doorName': '5层西卫2',//房间名
                'doorType': 'boy',//girl|boy
                'dateTime': 'string',//时间
                'nowNum': 3,//当前人数
                'kenNum': 6
            },
            16: {
                'id': 16,//id
                'doorFloor': 6,//楼层
                'doorName': '6层西卫2',//房间名
                'doorType': 'boy',//girl|boy
                'dateTime': 'string',//时间
                'nowNum': 9,//当前人数
                'kenNum': 10
            },
            17: {
                'id': 17,//id
                'doorFloor': 7,//楼层
                'doorName': '7层西卫2',//房间名
                'doorType': 'boy',//girl|boy
                'dateTime': 'string',//时间
                'nowNum': 9,//当前人数
                'kenNum': 15
            },
            18: {
                'id': 18,//id
                'doorFloor': 8,//楼层
                'doorName': '8层西卫2',//房间名
                'doorType': 'boy',//girl|boy
                'dateTime': 'string',//时间
                'nowNum': 9,//当前人数
                'kenNum': 20
            },
            19: {
                'id': 19,//id
                'doorFloor': 9,//楼层
                'doorName': '9层西卫2',//房间名
                'doorType': 'boy',//girl|boy
                'dateTime': 'string',//时间
                'nowNum': 9,//当前人数
                'kenNum': 15
            }
        },
        uiDb: {
            a: () => {
                const data: uiDb_a = []
                get().select.fjs().forEach(({ id, doorName, doorType, kenNum, nowNum }) => {
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
                get().select.fjs().forEach(({ id, doorName, doorType, kenNum, nowNum }) => {
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
            fjs: () => {
                const db = get().fjs;
                const doorType = get().select.doorType
                const min = get().select.doorFloors[0]
                const max = get().select.doorFloors[1]
                return Object.values(db).filter(c => {
                    return c.doorType === doorType && c.doorFloor >= min && c.doorFloor <= max
                })
            },
            doorType: (cookies.get('doorType') || 'boy') as DoorType,
            doorTypeSet: (doorType) => {
                get().select.doorType = doorType
                cookies.set('doorType', doorType)
            },
            doorFloors: [
                Number(cookies.get('doorFloorsMin') || 1),
                Number(cookies.get('doorFloorsMax') || 20)
            ],
            doorFloorsSet: (doorFloors) => {
                get().select.doorFloors = doorFloors
                cookies.set('doorFloorsMin', `${doorFloors[0]}`)
                cookies.set('doorFloorsMax', `${doorFloors[1]}`)
            }
        }
    }
})