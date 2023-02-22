import React from "react"

interface PropsWithContainer {
    children: React.ReactNode;
    title: string;
    description: string;
}

export default function Container({ children, title, description }: PropsWithContainer): JSX.Element {
    return (
        <div className="m-2 border rounded-md bg-white shadow">
            <div className="p-3">
                <div>
                    <span className="bold text-lg">{ title }</span>
                    <br />
                    <span className="text-xs gray">{ description }</span>
                </div>
                <div className="relative mt-2 w-auto flex flex-col justify-start items-start">
                    { children }
                </div>
            </div>
        </div>
    )
}