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
        <nav className="bg-blue-500 p-4 flex items-center justify-between">
            <div>
                <h1 className="text-white text-xl font-semibold">Organiza Ai!</h1>
            </div>
            <div className="flex items-center space-x-4">
                <span className="text-white">Bem-vindo</span>
                <button onClick={handleLogout} className="px-4 py-2 text-xs font-bold text-white uppercase transition-all duration-150 bg-red-500 rounded shadow outline-none active:bg-red-600 hover:shadow-md focus:outline-none ease">
                    Sair
                </button>
            </div>
        </nav>
    );
}
