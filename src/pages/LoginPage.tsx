// src/pages/LoginPage.jsx
import { useState } from "react";
import axios from "axios"; // Importando axios para fazer a requisição HTTP
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../hooks/useAuth";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Para exibir "carregando" no botão
  const navigate = useNavigate(); 
  const { login } = useAuth();

  const apiUrl = import.meta.env.VITE_API_URL;


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email === "" || senha === "") {
      setError("Todos os campos são obrigatórios!");
      return;
    }

    setError("");
    setLoading(true); // Ativa o carregando

    try {
      const response = await axios.post(`${apiUrl}/auth/login`, {
        email,
        senha,
      });

      // Se a resposta for bem-sucedida
      const { token } = response.data;
      const fakeUser = {
        name: "João Guilherme Dedonatti de Lima",
        avatarUrl: "https://i.pravatar.cc/40",
      };

      login(fakeUser, token); 
      navigate('/home');
    } catch (error) {
      console.error("Erro no login", error);
      setError("Credenciais inválidas.");
    } finally {
      setLoading(false); // Desativa o carregando
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="password">
              Senha
            </label>
            <input
              id="password"
              type="password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Carregando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
