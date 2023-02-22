export const ATPT_OFCDC_SC_CODE = "Q10";
export const SD_SCHUL_CODE = "8490212";
export const Endpoint: string = 'https://open.neis.go.kr/hub/';
export const ShowReplaceSubjects = {
    '* 결산관리': '회계A',
    '한문Ⅰ': '한문',
    '금융 일반': '금융',
    '실용 영어': '영어',
    '실용 수학': '수학',
    '운동과 건강': '체육',
    '* 사무환경조성': '사무',
    '* 원가계산': '회B',
    '* 회의 운영ㆍ지원': '사무'
}

export function createUrl(type: string, options: object): string {
    var __original = (Endpoint + type.toString() + "?");
    options['Type'] = 'json';
    options['SD_SCHUL_CODE'] = SD_SCHUL_CODE;
    options['ATPT_OFCDC_SC_CODE'] = ATPT_OFCDC_SC_CODE;
    options['Key'] = process.env.REACT_APP_API_KEY;
    
    for (const k in options) {
        __original += `${k}=${options[k]}&`;
    }
    return (__original[__original.length] == "&") ? __original[__original.length-1] : __original;
}

export function replaceSubject(str: string): string {
    return (ShowReplaceSubjects[str]) ? ShowReplaceSubjects[str] : str;
}

export function toSplitMakeComponent(args: string): any {
    var components = [];
    args.split('<br/>').forEach(args => {
        var ts = args.split(' (');
        components.push({
            name: ts[0].trim().replace('/', ''),
            nutrients: (ts[1] == undefined) ? '' : ('(' + ts[1])
        });
    })

    return components;
}

export function toSublimation(name: string): string {
    return (name == "조식") ? "🌄 아침" : (name == "중식") ? "☀️ 점심" : "🌙 저녁";
}