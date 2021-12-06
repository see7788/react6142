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
export type DoorType = 'boy' | 'girl'
type DoorFloor = [number, number];
export interface IdDb {
    'id': number,//id
    'doorFloor': number,//楼层
    'doorName': string,//房间名
    'doorType': DoorType,//girl|boy
    'dateTime': string,//时间
    'nowNum': number,//当前人数
    'kenNum': number
}
export type Fjs = Record<number, IdDb>
type Sotre = {
    fjs: Fjs
    select: {
        fjs():IdDb[]
        doorType: DoorType,
        doorTypeSet(doorType: DoorType): void,
        doorFloors: DoorFloor,
        doorFloorsSet(ids: DoorFloor): void
    }
}
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
   // cookies.remove('doorType')
  //  cookies.remove('doorFloors')
    return {
        fjs: {
            1: {
                'id': 1,//id
                'doorFloor': 8,//楼层
                'doorName': '8层西卫',//房间名
                'doorType': 'boy',//girl|boy
                'dateTime': 'string',//时间
                'nowNum': 6,//当前人数
                'kenNum': 12
            },
            2: {
                'id': 2,//id
                'doorFloor': 8,//楼层
                'doorName': '8层西卫',//房间名
                'doorType': 'girl',//girl|boy
                'dateTime': 'string',//时间
                'nowNum': 7,//当前人数
                'kenNum': 9
            },
            3: {
                'id': 3,//id
                'doorFloor': 9,//楼层
                'doorName': '9层西卫1',//房间名
                'doorType': 'boy',//girl|boy
                'dateTime': 'string',//时间
                'nowNum': 2,//当前人数
                'kenNum': 10
            },
            4: {
                'id': 4,//id
                'doorFloor': 9,//楼层
                'doorName': '9层西卫1',//房间名
                'doorType': 'boy',//girl|boy
                'dateTime': 'string',//时间
                'nowNum': 9,//当前人数
                'kenNum': 15
            },
            5: {
                'id': 5,//id
                'doorFloor': 9,//楼层
                'doorName': '9层西卫2',//房间名
                'doorType': 'boy',//girl|boy
                'dateTime': 'string',//时间
                'nowNum': 3,//当前人数
                'kenNum': 15
            },
            6: {
                'id': 6,//id
                'doorFloor': 9,//楼层
                'doorName': '9层西卫2',//房间名
                'doorType': 'girl',//girl|boy
                'dateTime': 'string',//时间
                'nowNum': 9,//当前人数
                'kenNum': 15
            }
        },
        select: {
            fjs: () => {
                const db = get().fjs;
                const doorType=get().select.doorType
                const min=get().select.doorFloors[0]
                const max=get().select.doorFloors[1]
                return Object.values(db).filter(c => {
                    return c.doorType === doorType && c.doorFloor >= min && c.doorFloor <= max
                })
            },
            doorType: (cookies.get('doorType') || 'boy') as DoorType,
            doorTypeSet: (doorType) => {
                get().select.doorType = doorType
                cookies.set('doorType', doorType)
            },
            doorFloors: (cookies.get('doorFloors') || [1, 20]) as DoorFloor,
            doorFloorsSet: (doorFloors) => {
                get().select.doorFloors = doorFloors
                cookies.set('doorFloors', doorFloors)
            }
        }
    }
})