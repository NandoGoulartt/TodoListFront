import { useRouter } from "next/router";

export interface Task {
    id: number;
    title: string;
    priority: string;
    prazo: string;
}
interface TaskRowProps {
    task: Task;
    token: string;
}

export default function TaskRow({ task, token }: TaskRowProps) {
    const router = useRouter();
    const handleDeleteTask = async (task: Task) => {

        const confirmed = window.confirm(`Tem certeza que deseja excluir a tarefa "${task.title}"?`);

        if (confirmed) {

            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${task.id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to create task');
                }

                window.location.reload();
            } catch (error: any) {
                console.log(error)
            }
        }
    }

    const handleEditTask = async (task: { id: number, title: string, priority: string, prazo: string }) => {
        router.push(`/edit/${task.id}`);
    }
    return (
        <tr>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <div className="flex items-center">
                    <div className="flex-shrink-0 w-48">
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
                <div className="flex justify-center gap-3">
                    <button
                        onClick={() => handleEditTask(task)}
                        className="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer"
                    >
                        Editar
                    </button>
                    <button
                        onClick={() => handleDeleteTask(task)}
                        className="bg-red-500 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer"
                    >
                        Deletar
                    </button>
                </div>
            </td>
        </tr>
    )
}