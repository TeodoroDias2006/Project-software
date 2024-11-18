import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Toaster, toast } from 'sonner';
import '../styles/cadastro.css';

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

      <div className="min-h-screen flex" id='imglocal'>
        <div className="w-1/2 flex items-center justify-end LocalLogo">
           <img src="/src/assets/telaCadastro1.png" alt="Logo" className="h-full w-full object-cover" />
        </div>

        <div className="w-2/4 form-container py-8 cadastro-form-container">
          <div className="form-wrapper">
            <h2 className="form-header">Bem vindo ao Meet Beach..!</h2>
            <h3 className="form-subtitle">Preencha os seus dados para prosseguir com o cadastro</h3>

            <form onSubmit={handleSubmit} className="form">
              <div className='Formulario'>
                <label htmlFor="nome" className="label">Nome</label>
                <input id="nome" type="text" value={nome} onChange={(e) => setNome(e.target.value)} required className="input" placeholder="Digite seu nome" />
              </div>

              <div className='Formulario'>
                <label htmlFor="age" className="label">Idade</label>
                <input id="age"  type="number" min="1" value={age} onChange={(e) => setAge(e.target.value)} required className="input" placeholder="Digite sua idade" />
              </div>

              <div className='Formulario'>
                <label htmlFor="email" className="label">E-mail</label>
                <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="input" placeholder="Digite seu e-mail" />
              </div>

              <div className='Formulario'>
                <label htmlFor="verifyEmail" className="label">Verifique seu e-mail</label>
                <input id="verifyEmail" type="email" value={verifyEmail} onChange={(e) => setVerifyEmail(e.target.value)} required className="input" placeholder="Confirme seu e-mail" />
              </div>

              <div className="relative Formulario">
                <label htmlFor="password" className="label">Senha</label>
                <input id="password" type={senhaVisivel ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} required className="input" placeholder="Digite uma senha" />
                <FontAwesomeIcon icon={senhaVisivel ? faEye : faEyeSlash} onClick={toggleSenhaVisivel} className="eye-icon" />
              </div>

              <button type="submit" className="submit-button">Registrar</button>
            </form>

            <p className="link-text">
              Ao se registrar, você está de acordo com nossos <a href="#" className="link">termos e condições</a> e confirma estar ciente de nossa <a href="#" className="link">política de privacidade</a>.
            </p>
            <p className="link-text">
              Já tem uma conta? <Link to="/login" className="link">Faça seu login!</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cadastro;
