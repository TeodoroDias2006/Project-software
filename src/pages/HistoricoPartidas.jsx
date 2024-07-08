import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/historicoPartidas.css';
import { Link } from 'react-router-dom';

function HistoricoPartidas() {
  const [partidas, setPartidas] = useState([]);

  useEffect(() => {
    axios.get('/api/historico')
      .then(response => {
        setPartidas(response.data);
      })
      .catch(error => {
        console.error("Houve um erro ao buscar o histórico de partidas:", error);
      });
  }, []);

  return (
    <div>
      <div className="rotas">
      <Link to="/login" className="link-rota">Login</Link>
      <Link to="/cadastro" className="link-rota">Cadastro</Link>
      <Link to="/editar-perfil" className="link-rota">Editar Perfil</Link>
      <Link to="/mapa" className="link-rota">Mapa</Link>
      <Link to="/favoritar-partida" className="link-rota">Partidas Favoritas</Link>
      <Link to="/detalhes-partida" className="link-rota">Detalhes Partidas</Link>
      <Link to="/cadastro-partida" className="link-rota">Cadastro Partidas</Link>
      <Link to="/historico-partidas" className="link-rota">Historico Partidas</Link>
      <Link to="/pagamento" className="link-rota">Pagamento</Link>
      <Link to="/contato" className="link-rota">Contato</Link></div>
      <div className="container">
      <h1>Histórico de Partidas</h1>
      <div className="partidas-list">
        {HistoricoPartidas((partida) => (
          <div key={partida.id} className="partida-item">
            <h2>{partida.nome}</h2>
            <p>{partida.data}</p>
            <p>{partida.local}</p>
            <p>{partida.tipoEsporte}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}

export default HistoricoPartidas;