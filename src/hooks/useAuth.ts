import { useState, useEffect } from "react";
import { getUser, setUser, clearUser } from "../utils/userStorage";
import { getToken, setToken, clearToken } from "../utils/tokenStorage";

// Hook customizado para autenticação
export function useAuth() {
  const [user, setUserState] = useState(getUser());
  const [token, setTokenState] = useState(getToken());

  // Atualiza o estado sempre que o usuário mudar no localStorage
  useEffect(() => {
    const handleUserChange = () => {
      setUserState(getUser());
      setTokenState(getToken());
    };

    window.addEventListener("userChanged", handleUserChange);

    return () => {
      window.removeEventListener("userChanged", handleUserChange);
    };
  }, []);

  // Função para logar o usuário
  const login = (userData: any, authToken: string) => {
    setUser(userData); // Salva o usuário no localStorage
    setToken(authToken); // Salva o token no localStorage
    setUserState(userData);
    setTokenState(authToken);
    window.dispatchEvent(new Event("userChanged")); // Notifica mudança no estado
  };

  // Função para fazer o logout
  const logout = () => {
    clearUser(); // Remove usuário do localStorage
    clearToken(); // Remove token do localStorage
    setUserState(null);
    setTokenState(null);
    window.dispatchEvent(new Event("userChanged")); // Notifica mudança no estado
  };

  return {
    user,
    token,
    isAuthenticated: !!token, // Verifica se o usuário está autenticado
    login,
    logout,
  };
}
