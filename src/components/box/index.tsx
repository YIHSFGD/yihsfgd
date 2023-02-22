import React from "react";

interface PropsWithCard {
    children?: React.ReactNode;
    a?: string;
    title?: string;
    type?: "warning" | "general";
}

export default function Box({ children, a, title, type="general" }: PropsWithCard): JSX.Element {
    return (
        <div className={`my-0.5 min-w-full border rounded py-1 px-3 ${type == "warning" ? "warning_field" : "field"}`} key={Math.random() * 19450815}>
            { children }
        </div>
    )
}