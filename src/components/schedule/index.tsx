interface PropsWithSchedule {
    period: number;
    className: string;
}

export default function Schedule({ period, className }: PropsWithSchedule): JSX.Element {
    return (
        <div className="inline-block">
            <span className="text-base bold mx-2">{ period + "교시" }</span>
            <span className="text-sm">{ className }</span>
        </div>
    )
}