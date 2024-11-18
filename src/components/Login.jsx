import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../services/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Toaster, toast } from 'sonner';
import '../styles/login.css';

function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [lembrar, setLembrar] = useState(false);
  const navigate = useNavigate();

  const toggleSenhaVisivel = () => {
    setSenhaVisivel(!senhaVisivel);
  };

  const handleEntrarClick = async (e) => {
    e.preventDefault();
    if (email && senha) {
      try {
        const response = await api.post('/login', { email, password: senha });
        if (response && response.data) {
          localStorage.setItem('userId', response.data.id);
          login(response.data);
          toast.success('Login realizado com sucesso!');
          navigate('/');
        } else {
          throw new Error('Resposta inválida da API');
        }
      } catch (error) {
        toast.error('Erro ao fazer login: ' + (error.response?.data?.error || error.message));
      }
    } else {
      toast.error('Preencha os campos de email e senha');
    }
  };

  return (
    <>
      <Toaster position="top-center" />
      <div className="min-h-screen flex" id="imglocal">
        <div className="w-1/2 flex items-center justify-end LocalLogo">
          <img src="/src/assets/telaCadastro1.png" alt="Logo" className="h-full w-full object-cover" />
        </div>

        <div className="w-2/4 form-container py-8 login-form-container">
          <div className="form-wrapper">
            <h2 className="form-header">Bem vindo de volta!</h2>
            <h3 className="form-subtitle">Acesse sua conta para continuar</h3>

            <form onSubmit={handleEntrarClick} className="form">
              <div className="Formulario">
                <label htmlFor="email" className="label">E-mail</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="input"
                  placeholder="Digite seu e-mail"
                />
              </div>

              <div className="relative Formulario">
                <label htmlFor="password" className="label">Senha</label>
                <input
                  id="password"
                  type={senhaVisivel ? 'text' : 'password'}
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                  className="input"
                  placeholder="Digite sua senha"
                />
                <FontAwesomeIcon
                  icon={senhaVisivel ? faEye : faEyeSlash}
                  onClick={toggleSenhaVisivel}
                  className="eye-icon"
                />
              </div>

              <div className="form-remember">
                <input
                  id="lembrar"
                  type="checkbox"
                  checked={lembrar}
                  onChange={(e) => setLembrar(e.target.checked)}
                  className="checkbox"
                />
                <label htmlFor="lembrar" className="label-checkbox">Lembre-me</label>
              </div>

              <button type="submit" className="submit-button">Entrar</button>
            </form>

            <p className="link-text">
              Não tem uma conta?{' '}
              <Link to="/cadastro" className="link">Cadastre-se aqui</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
