import React from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

export default function Header() {
    const router = useRouter();

    const handleLogout = () => {
        Cookies.remove('token');
        router.push('/');
    };

    return (
        <header className="w-full text-gray-700 bg-white shadow-sm body-font fixed top-0 z-10">
            <div className="container flex items-start justify-between p-6 mx-auto flex-row">
                <a href='/home' className="flex items-center mb-4 font-medium text-gray-900 title-font md:mb-0">
                    <h1>TodoApp</h1>
                </a>

                <div className="items-center h-full pl-6 ml-6 border-l border-gray-200">
                    <button onClick={handleLogout} className="px-4 py-2 text-xs font-bold text-white uppercase transition-all duration-150 bg-red-400 rounded shadow outline-none active:bg-red-600 hover:shadow-md focus:outline-none ease">
                        Sair
                    </button>
                </div>
            </div>
        </header>
    );
}
