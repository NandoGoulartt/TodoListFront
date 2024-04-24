interface InputProps {
    label: string
    placeholder: string;
    name: string;
    isRequired?: boolean;
    type?: string;
}

export default function InputText({ label, placeholder, name, isRequired = false, type = 'text' }: InputProps) {
    return (
        <div className="mb-4">
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{label}</label>
            <input type={type} id={name} name={name} className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder={placeholder} required={isRequired} />
        </div>
    )
}