import { Select, Space } from "antd";

interface PropsWithOptions {
    onChange: Function;
    g: string;
    s: string;
}

export default function Options({ onChange, g, s }: PropsWithOptions): JSX.Element {
    return (
        <div className="mb-3">
            <Space wrap>
                <Select
                    value={g}
                    style={{ width: 80 }}
                    options={[
                        { value: '1', label: '1학년' },
                        { value: '2', label: '2학년' },
                        { value: '3', label: '3학년' },
                    ]}
                    onChange={(value: string) => onChange('grade', value)}
                />
                <Select
                    value={s}
                    style={{ width: 70 }}
                    options={[
                        { value: '1', label: '1반' },
                        { value: '2', label: '2반' },
                        { value: '3', label: '3반' },
                        { value: '4', label: '4반' },
                        { value: '5', label: '5반' },
                        { value: '6', label: '6반' },
                        { value: '7', label: '7반' },
                        { value: '8', label: '8반' },
                        { value: '9', label: '9반' },
                        { value: '10', label: '10반' },
                        { value: '11', label: '11반' },
                    ]}
                    onChange={(value: string) => onChange('class', value)}
                />
            </Space>
        </div>
    )
}