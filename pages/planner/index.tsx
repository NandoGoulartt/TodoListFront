import ContainerHeader from "@/components/containerHeader";
import TaskRow, { Task } from "@/components/taskRow";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Planner({ token }: { token: string }) {
  const router = useRouter();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks`, {
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


  return (
    <ContainerHeader>
      <div className="flex h-full bg-white flex-col p-6">
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
                      {tasks.map((task: Task, index) => (
                        <div key={index}>
                          <TaskRow task={task} token={token} />
                        </div>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div> </div>
    </ContainerHeader>
  );
}

export async function getServerSideProps(context: any) {
  const token = context.req.cookies.token;

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  return {
    props: { token: token },
  };
}