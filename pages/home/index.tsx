export default function Page() {
    return (
        <div className="min-h-screen flex flex-col">
            <header className="w-full text-gray-700 bg-white shadow-sm body-font fixed top-0 z-10">
                <div className="container flex items-start justify-between p-6 mx-auto flex-row">
                    <a className="flex items-center mb-4 font-medium text-gray-900 title-font md:mb-0">
                        <h1>TodoApp</h1>
                    </a>

                    <div className="items-center h-full pl-6 ml-6 border-l border-gray-200">
                        <a href="#_"
                            className="px-4 py-2 text-xs font-bold text-white uppercase transition-all duration-150 bg-red-400 rounded shadow outline-none active:bg-teal-600 hover:shadow-md focus:outline-none ease">
                            Sair
                        </a>
                    </div>
                </div>
            </header>
            <div className="flex-grow  mt-20">
                <div className="bg-white p-8 rounded-md w-full">
                    <div className=" flex items-center justify-end pb-6">
                        <div className="flex items-center justify-end">

                            <div className="lg:ml-40 ml-10 space-x-8">
                                <button className="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">Create</button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                                <table className="min-w-full leading-normal">
                                    <thead>
                                        <tr>
                                            <th
                                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Nome da atividade
                                            </th>
                                            <th
                                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Etiqueta
                                            </th>
                                            <th
                                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Prazo
                                            </th>
                                            <th
                                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Acoes
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 w-10 h-10">
                                                        <img className="w-full h-full rounded-full"
                                                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                                                            alt="" />
                                                    </div>
                                                    <div className="ml-3">
                                                        <p className="text-gray-900 whitespace-no-wrap">
                                                            Vera Carpenter
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">Admin</p>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">
                                                    Jan 21, 2020
                                                </p>
                                            </td>

                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <span
                                                    className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                                    <span aria-hidden
                                                        className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                                                    <span className="relative">Activo</span>
                                                </span>
                                            </td>
                                        </tr>
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
