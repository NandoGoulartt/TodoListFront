import Header from "@/components/header";
import { Dialog } from '@headlessui/react';
import { useEffect, useState } from "react";

export default function Page({ token }: { token: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const [taskName, setTaskName] = useState('');
    const [priority, setPriority] = useState('');
    const [deadline, setDeadline] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
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
                setError(error.message);
            }
        }

        fetchTasks();
    }, []);

    const handleCreateTask = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('http://localhost:3001/tasks/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    title: taskName,
                    priority: priority,
                    deadline: deadline,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to create task');
            }

            setIsOpen(false);
            setTaskName('');
            setPriority('');
            setDeadline('');
        } catch (error: any) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteTask = async (task: { id: number, title: string, priority: string, prazo: string }) => {

        const confirmed = window.confirm(`Tem certeza que deseja excluir a tarefa "${task.title}"?`);

        if (confirmed) {
            setIsLoading(true);
            setError(null);

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
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        }
    }

    const handleEditTask = async (task: { title: string, priority: string, prazo: string }) => {

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
                                    onClick={() => setIsOpen(true)}
                                    className="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer"
                                >
                                    Create
                                </button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="fixed z-10 inset-0 overflow-y-auto">
                            <div className="flex items-center justify-center min-h-screen">
                                <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
                                <div className="bg-white rounded-lg p-8 max-w-md z-20">
                                    <Dialog.Title className="text-lg font-medium text-gray-900 mb-4">Nova Tarefa</Dialog.Title>
                                    <div className="space-y-4">
                                        <form onSubmit={(e) => { e.preventDefault(); handleCreateTask(); }}>
                                            <div className="mb-4">
                                                <label htmlFor="taskName" className="block text-sm font-medium text-gray-700">
                                                    Nome da Tarefa
                                                </label>
                                                <input
                                                    type="text"
                                                    id="taskName"
                                                    name="taskName"
                                                    value={taskName}
                                                    onChange={(e) => setTaskName(e.target.value)}
                                                    className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                    required
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
                                                    Prioridade
                                                </label>
                                                <select
                                                    id="priority"
                                                    name="priority"
                                                    value={priority}
                                                    onChange={(e) => setPriority(e.target.value)}
                                                    className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                    required
                                                >
                                                    <option value="">Selecione a prioridade</option>
                                                    <option value="low">Baixa</option>
                                                    <option value="medium">Média</option>
                                                    <option value="high">Alta</option>
                                                </select>
                                            </div>
                                            <div className="mb-4">
                                                <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">
                                                    Prazo
                                                </label>
                                                <input
                                                    type="date"
                                                    id="deadline"
                                                    name="deadline"
                                                    value={deadline}
                                                    onChange={(e) => setDeadline(e.target.value)}
                                                    className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                                    required
                                                />
                                            </div>
                                            <div className="flex justify-end">
                                                <button
                                                    type="button"
                                                    onClick={() => setIsOpen(false)}
                                                    className="mr-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-md font-medium hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                                                >
                                                    Cancelar
                                                </button>
                                                <button
                                                    type="submit"
                                                    disabled={isLoading}
                                                    className="px-4 py-2 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                >
                                                    {isLoading ? 'Criando...' : 'Criar Tarefa'}
                                                </button>
                                                {error && <p className="text-red-500 mt-2">{error}</p>}
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </Dialog>
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
                                                    <p className="text-gray-900 whitespace-no-wrap">{new Date(task.prazo).toLocaleDateString('pt-BR')}</p>
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