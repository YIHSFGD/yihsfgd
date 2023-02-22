interface PropsWithGraph {
    components: any;
}

export default function Graph({ components }: PropsWithGraph): JSX.Element {
    const createComponent = (): React.ReactNode[] => {
        var _jsxs: React.ReactNode[] = [ ];
        var parents: any[] = [];

        for (var i = 0; i < 7; i++) {
            _jsxs.push(<td key={Math.random() * 19450815}>{ i+1 }교시</td>);
            components.forEach(args => {
                _jsxs.push(<td key={Math.random() * 19450815}>{ args.components[i] }</td>)
            })
            parents.push(_jsxs);
            _jsxs = [];
        }
        return parents;
    }
    return (
        <table id="graph">
            <thead className="text-xs sm:text-base bold">
                <tr>
                    <th>교시</th>
                    <th>월</th>
                    <th>화</th>
                    <th>수</th>
                    <th>목</th>
                    <th>금</th>
                </tr>
            </thead>
            <tbody className="text-xs sm:text-sm">
                {
                    createComponent().map(args => (
                        <tr key={Math.random() * 19450815}>
                            { args }
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}