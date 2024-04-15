import Header from "@/components/header";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Page({ token }: { token: string }) {
    const router = useRouter();
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        async function fetchTasks() {
            try {
                const response = await fetch('http://localhost:3001/tasks', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch tasks');
                }

                const tasksData = await response.json();
                setTasks(tasksData);
            } catch (error: any) {
                console.log(error)
            }
        }

        fetchTasks();
    }, []);

    const handleDeleteTask = async (task: { id: number, title: string, priority: string, prazo: string }) => {

        const confirmed = window.confirm(`Tem certeza que deseja excluir a tarefa "${task.title}"?`);

        if (confirmed) {

            try {
                const response = await fetch(`http://localhost:3001/tasks/${task.id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to create task');
                }


            } catch (error: any) {
                console.log(error)
            }
        }
    }

    const handleEditTask = async (task: { id: number, title: string, priority: string, prazo: string }) => {
        router.push(`/edit/${task.id}`);
    }
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <div className="flex-grow mt-20">
                <div className="bg-white p-8  w-full">
                    <div className="flex items-center justify-end pb-6">
                        <div className="flex items-center justify-end">
                            <div className="lg:ml-40 ml-10 space-x-8">
                                <button
                                    onClick={() => router.push(`/created`)}
                                    className="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer"
                                >
                                    Create
                                </button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                                <table className="min-w-full leading-normal">
                                    <thead>
                                        <tr>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Nome da atividade
                                            </th>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Etiqueta
                                            </th>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Prazo
                                            </th>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">

                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tasks.map((task: { id: number, title: string, priority: string, prazo: string }, index) => (
                                            <tr key={index}>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 w-10 h-10">
                                                            {task.title}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p className="text-gray-900 whitespace-no-wrap">{task.priority}</p>
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p className="text-gray-900 whitespace-no-wrap">{new Date(task.prazo).toISOString().split('T')[0]}</p>
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <div className="flex justify-around">
                                                        <button
                                                            onClick={() => handleEditTask(task)}
                                                            className="text-indigo-600 hover:text-indigo-900 focus:outline-none"
                                                        >
                                                            Editar
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteTask(task)}
                                                            className="text-red-600 hover:text-red-900 focus:outline-none"
                                                        >
                                                            Deletar
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export async function getServerSideProps(context: any) {
    const token = context.req.cookies.token;

    if (!token) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }
    return {
        props: { token: token },
    };
}