import Container from '@/components/container';
import Form from '@/components/form';
import InputText from '@/components/inputText';
import { useState } from 'react';

export default function Page() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
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
                setSuccess('Dados enviados com sucesso!');
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
        <Container>
            <Form title={'Cadastro de conta'} error={error} success={success} handleSubmit={handleSubmit} loading={loading} textButton='Criar conta!'>
                <InputText name='name' isRequired={true} placeholder='Seu nome' label='Nome' />
                <InputText name='email' isRequired={true} placeholder='Seu@email.com' label='Email' />
                <InputText name='password' type={'password'} isRequired={true} placeholder='Sua senha' label='Senha' />
                <InputText name='confirmarSenha' type={'password'} isRequired={true} placeholder='Confirme sua senha' label='Confirme sua Senha' />
                <a href="/" className="text-xs text-gray-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Já tenho uma conta!</a>
            </Form>
        </Container>
    );
}
