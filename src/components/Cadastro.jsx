import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Toaster, toast } from 'sonner';
import '../styles/cadastro.css'

function Cadastro() {
  const [email, setEmail] = useState('');
  const [verifyEmail, setVerifyEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nome, setNome] = useState('');
  const [age, setAge] = useState('');
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const navigate = useNavigate();

  const toggleSenhaVisivel = () => {
    setSenhaVisivel(!senhaVisivel);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email !== verifyEmail) {
      toast.error("Os e-mails não coincidem!");
      return;
    }
    if (age <= 0) {
      toast.error("A idade deve ser positiva!");
      return;
    }
    try {
      await api.post('/usuarios', {
        name: nome,
        age: age,
        email: email,
        password: password,
      });
      toast.success("Usuário criado com sucesso!");
      navigate('/login');
    } catch (error) {
      toast.error("Erro ao criar usuário: " + (error.response?.data?.error || error.message));
    }
  };

  return (
    <>
      <Toaster position="top-center" />

      <div className="flex min-h-screen " id='imglocal'>
        <div className="w-1/2 flex items-center justify-end pr-4">
          <img src="/src/assets/telaCadastro1.png" alt="Logo" className="w-2/3 h-auto max-w-md" />
        </div>

        <div className="w-1/2 flex flex-col justify-center px-6 py-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-xs">
            <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900">Bem vindo ao Meet Beach..!</h2>
            <div className="mt-4 text-center">
              <h2>Preencha os seus dados para prosseguir com o cadastro</h2>
            </div>
          </div>

          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xs">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="nome" className="block text-sm font-medium text-gray-900">Nome</label>
                <input
                  id="nome"
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                  placeholder="Digite seu nome"
                />
              </div>

              <div>
                <label htmlFor="age" className="block text-sm font-medium text-gray-900">Idade</label>
                <input
                  id="age"
                  type="number"
                  min="1"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                  placeholder="Digite sua idade"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-900">E-mail</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                  placeholder="Digite seu e-mail"
                />
              </div>

              <div>
                <label htmlFor="verifyEmail" className="block text-sm font-medium text-gray-900">Verifique seu e-mail</label>
                <input
                  id="verifyEmail"
                  type="email"
                  value={verifyEmail}
                  onChange={(e) => setVerifyEmail(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                  placeholder="Confirme seu e-mail"
                />
              </div>

              <div className="relative">
                <label htmlFor="password" className="block text-sm font-medium text-gray-900">Senha</label>
                <input
                  id="password"
                  type={senhaVisivel ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                  placeholder="Digite uma senha"
                />
                <FontAwesomeIcon
                  icon={senhaVisivel ? faEye : faEyeSlash}
                  onClick={toggleSenhaVisivel}
                  className="absolute right-3 bottom-3 cursor-pointer text-gray-500"
                />
              </div>

              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
               Registrar
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-gray-500">
              Ao se registrar, você está de acordo com nossos{' '}
              <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">termos e condições</a> e confirma estar ciente de nossa{' '}
              <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">política de privacidade</a>.
            </p>
            <p className="mt-6 text-center text-sm text-gray-500">
              Já tem uma conta?{' '}
              <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">Faça seu login!</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cadastro;
