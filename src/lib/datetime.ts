export function datetime() {
    var today = new Date();
    var monday = new Date(today);

    var day = monday.getDay(),
    diff = monday.getDate() - day + (day == 0 ? -6:1);
    monday.setDate(diff);

    var friday = new Date(today);
    friday.setDate(today.getDate() - today.getDay() + 5);

    return {
        start: YYYYMMDD(monday),
        end: YYYYMMDD(friday)
    }
};

export function YYYYMMDD(date: Date): string {
    return date.getFullYear().toString().padStart(4, '0') + (date.getMonth() + 1).toString().padStart(2, '0') + date.getDate().toString().padStart(2, '0');
}

export function YYYYMM01(date: Date): string {
    return date.getFullYear().toString().padStart(4, '0') + (date.getMonth() + 1).toString().padStart(2, '0') + '01';
}

export function dateString(date: string): string {
    return `${date.slice(0, 4)}년 ${date.slice(4, 6)}월 ${date.slice(6, 8)}일`;
}