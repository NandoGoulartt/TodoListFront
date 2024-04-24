import { Children, ReactNode } from "react";

interface FormProps {
    children: ReactNode;
    handleSubmit: (event: any) => Promise<void>;
    loading: boolean;
    success: string;
    error: string;
    textButton: string;
    title: string;
}


export default function Form({ children, handleSubmit, loading, success, error, textButton, title }: FormProps) {
    return (
        <div className="bg-white shadow-md rounded-lg px-8 py-6 w-1/2">
            <h1 className="text-2xl font-bold text-center mb-4">{title}</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    {children}
                </div>
                <div>
                    {loading ? (
                        <p>Enviando...</p>
                    ) : null}

                    {success ? (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded-md mb-4">
                            {success}
                        </div>
                    ) : null}

                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md mb-4">
                            {error}
                        </div>
                    )}
                    <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">{textButton}</button>
                </div>
            </form>
        </div>
    )
}