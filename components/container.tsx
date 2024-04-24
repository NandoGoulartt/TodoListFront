import { ReactNode } from "react";

interface ContainerProps {
    children: ReactNode;
}

export default function Container({ children }: ContainerProps) {
    return (
        <div className="min-h-screen flex items-center justify-center w-full">
            {children}
        </div>
    )
}