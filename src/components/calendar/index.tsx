import { Calendar } from "antd";
import type { Dayjs } from "dayjs";
import Box from "../box";

interface PropsWithCalendar {
    components: any;
}

export default function OriginalCalendar({ components }: PropsWithCalendar) {
    const createHeaderRender = ({ value, type, onChange, onTypeChange }: any) => {
        return (
            <div className="mb-6">
                <Box>
                    <span className="text-base bold">{value.year() + "년 " + (value.month() + 1) + "월"}</span>
                    <br />
                    <span className="text-xs">투명도가 낮은 부분을 클릭하면 다음 달 또는 이전 달로 이동합니다.</span>
                </Box>
            </div>
        );
    };
    const createDateCellRender = (value: Dayjs) => {
        var data = components.find(obj => obj.date == value.format('YYYYMMDD'));
        return (
            (data) ? (
                <span>{ data.content }</span>
            ) : undefined
        )
    }

    return (
        <Calendar dateCellRender={createDateCellRender} headerRender={createHeaderRender} className="text-xs sm:text-sm" />
    )
}