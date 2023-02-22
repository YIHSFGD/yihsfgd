import { datetime, YYYYMM01, YYYYMMDD } from "./datetime";
import { createUrl, replaceSubject, toSplitMakeComponent, toSublimation } from "./parsing";

export const fixedComponents = {
    mealServiceDietInfo: '20220905',
    hisTimetable: {
        start: '20220919',
        end: '20220923'
    },
}

async function async_httpGet(URL: string) {
    return await (await fetch(URL)).json();
}

export async function fetchMealServiceDietInfo() {
    const __res = await async_httpGet(createUrl('mealServiceDietInfo', {
        'MLSV_YMD':  (fixedComponents.mealServiceDietInfo.length <= 0) ? YYYYMMDD(new Date()) : fixedComponents.mealServiceDietInfo
    }));

    if (__res?.mealServiceDietInfo) {
        var _components = [];
        __res.mealServiceDietInfo[1].row.forEach(args => (
            _components.push({
                today: toSublimation(args.MMEAL_SC_NM),
                components: toSplitMakeComponent(args.DDISH_NM)
            })
        ))

        return _components;
    }
    return [];
}

export async function fetchHisTimetable(g: string, s: string) {
    const var_datetime = datetime();
    var visiable = false;
    const __res = await async_httpGet(createUrl('hisTimetable', {
        'TI_FROM_YMD': (fixedComponents.hisTimetable.start.length <= 0) ? var_datetime.start : fixedComponents.hisTimetable.start,
        'TI_TO_YMD': (fixedComponents.hisTimetable.end.length <= 0) ? var_datetime.end : fixedComponents.hisTimetable.end,
        'GRADE': g,
        'CLASS_NM': (s.length <= 1) ? `0${s}` : s
    }));

    if (__res.hisTimetable) {
        var _components = [];
        (__res.hisTimetable)[1].row.forEach(args => {
            if (!(["겨울방학", "여름방학", "봄방학"].includes(args.ITRT_CNTNT))) {
                visiable = true;
            }
            const aw = _components.find(obj => obj.mm == args.ALL_TI_YMD);

            if (!aw) {
                _components.push({
                    mm: args.ALL_TI_YMD,
                    components: [ replaceSubject(args.ITRT_CNTNT) ]
                })
            } else {
                aw.components.push(replaceSubject(args.ITRT_CNTNT));
            }
        })
        return (visiable) ? _components : [];
    }
    return [];
}

export async function fetchSchoolSchedule() {
    const date = new Date();
    date.setMonth(date.getMonth() + 4, 0);

    const __res = await async_httpGet(createUrl('SchoolSchedule', {
        'AA_FROM_YMD': YYYYMM01(new Date()),
        'AA_TO_YMD': YYYYMMDD(date)
    }));

    if (__res.SchoolSchedule) {
        var _components = [];
        (__res.SchoolSchedule)[1].row.forEach(args => {
            _components.push({
                date: args.AA_YMD,
                content: args.EVENT_NM
            })
        })
        return _components;
    }
    return [];
}