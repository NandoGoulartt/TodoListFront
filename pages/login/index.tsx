import { useState } from 'react';
import Cookies from 'js-cookie';
import Container from '@/components/container';
import Form from '@/components/form';
import InputText from '@/components/inputText';

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    const form = event.target;
    const formData = new FormData(form);

    const userData = {
      email: formData.get('email'),
      password: formData.get('password'),
    };
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const data = await response.json();
        Cookies.set('token', data.token);
        setSuccess('Login feito com sucesso!')
        window.location.href = '/';
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setError('Erro ao fazer login. Por favor, tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Form title={'Cadastro de conta'} error={error} success={success} handleSubmit={handleSubmit} loading={loading} textButton='Criar conta!'>
        <InputText name='email' isRequired={true} placeholder='Seu@email.com' label='Email' />
        <InputText name='password' type={'password'} isRequired={true} placeholder='Sua senha' label='Senha' />
        <a href="/register" className="text-xs text-gray-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Criar uma conta!</a>
      </Form>
    </Container>
  );
}
