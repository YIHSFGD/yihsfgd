import Box from "../box";

interface PropsWithMealField {
    today: string;
    components: ({[key: string]: string})[];
}

export default function MealField({ today, components }: PropsWithMealField): JSX.Element {
    return (
        <div className="my-1 w-full">
            <Box>
                <div className="my-1">
                    <span className="text-base bold">{ today }</span>
                    <hr className="my-2" />
                    <div className="text-sm">
                        {
                            components.map(a => (
                                <div className="w-auto h-auto" key={a.name}>
                                    <span className="text-sm">{ a.name }</span>
                                    <span className="mx-2 text-sm not_emphasized">{ a.nutrients }</span>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </Box>
        </div>
    )
}