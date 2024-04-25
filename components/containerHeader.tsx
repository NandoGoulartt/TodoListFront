import { ReactNode } from "react";
import Header from "./header";

interface ContainerProps {
    children: ReactNode;
}

export default function ContainerHeader({ children }: ContainerProps) {
    return (
        <div className="min-h-screen flex w-full bg-white flex-col">
            <div>
                <Header />
            </div>
            <div className="flex flex-row flex-1">
                <aside className="bg-gray-800 text-white w-64 p-4">
                    <nav>
                        <ul className="space-y-2">
                            <li className="opcion-con-desplegable">
                                <div className="flex items-center justify-between p-2 hover:bg-gray-700">
                                    <div className="flex items-center">
                                        <i className="fas fa-calendar-alt mr-2"></i>
                                        <span>Planner</span>
                                    </div>
                                    <i className="fas fa-chevron-down text-xs"></i>
                                </div>
                            </li>
                            <li className="opcion-con-desplegable">
                                <div className="flex items-center justify-between p-2 hover:bg-gray-700">
                                    <div className="flex items-center">
                                        <i className="fas fa-calendar-alt mr-2"></i>
                                        <span>Estudos/Leituras</span>
                                    </div>
                                    <i className="fas fa-chevron-down text-xs"></i>
                                </div>
                            </li>
                            <li className="opcion-con-desplegable">
                                <div className="flex items-center justify-between p-2 hover:bg-gray-700">
                                    <div className="flex items-center">
                                        <i className="fas fa-calendar-alt mr-2"></i>
                                        <span>Projetos</span>
                                    </div>
                                    <i className="fas fa-chevron-down text-xs"></i>
                                </div>
                            </li>
                        </ul>
                    </nav>
                </aside>
                <div>
                    {children}
                </div>
            </div>
        </div>
    )
}