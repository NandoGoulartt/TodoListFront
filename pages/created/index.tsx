import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from '@/components/header';

export default function Page({ token }: { token: string }) {
    const router = useRouter();
    const { taskId } = router.query;
    const [task, setTask] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [taskName, setTaskName] = useState('');
    const [priority, setPriority] = useState('');
    const [deadline, setDeadline] = useState('');


    const handleCreateTask = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/create`, {
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

            router.push('/home');
        } catch (error: any) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <Header />
            <div className="bg-white rounded-lg p-8 max-w-md z-20">
                <div className="space-y-4">
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
                            <option value="Baixa">Baixa</option>
                            <option value="Média">Média</option>
                            <option value="Alta">Alta</option>
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
                    <div className="flex justify-between">
                        <a href="/" className="px-4 py-2 bg-gray-600 text-white rounded-md font-medium hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500">
                            Voltar
                        </a>
                        <div className="flex items-center">
                            <button
                                type="submit"
                                disabled={isLoading}
                                onClick={handleCreateTask}
                                className="px-4 py-2 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                {isLoading ? 'Criando...' : 'Criar Tarefa'}
                            </button>
                            {error && <p className="text-red-500 mt-2 ml-4">{error}</p>}
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
        props: { token },
    };
}
