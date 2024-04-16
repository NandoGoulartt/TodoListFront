import { useState } from 'react';

export default function Page() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        setLoading(true);
        setError('');
        const form = event.target;
        const formData = new FormData(form);

        const userData = {
            name: formData.get('name'),
            email: formData.get('email'),
            password: formData.get('password'),
            confirmPassword: formData.get('confirmarSenha')
        };

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            const responseData = await response.json();

            if (response.ok) {
                setSuccess(true);
                window.location.href = '/';
            } else {
                setError(responseData.message);
            }
        } catch (error) {
            setError('Erro ao enviar os dados');
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center w-full dark:bg-gray-950">
            <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg px-8 py-6 min-w-md">
                <h1 className="text-2xl font-bold text-center mb-4 dark:text-gray-200">Cadastro</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nome</label>
                        <input type="text" id="name" name="name" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Seu nome" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                        <input type="email" id="email" name="email" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Seu@email.com" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Senha</label>
                        <input type="password" id="password" name="password" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Sua senha" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="confirmarSenha" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Confirme sua Senha</label>
                        <input type="password" id="confirmarSenha" name="confirmarSenha" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Confirme sua senha" required />
                        <a href="/" className="text-xs text-gray-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Já tenho uma conta!</a>
                    </div>
                    {loading ? (
                        <p>Enviando...</p>
                    ) : null}

                    {success ? (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded-md mb-4">
                            Dados enviados com sucesso!
                        </div>
                    ) : null}

                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md mb-4">
                            {error}
                        </div>
                    )}

                    <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Criar Conta</button>
                </form>
            </div>
        </div>
    );
}
