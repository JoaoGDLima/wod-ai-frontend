import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaHome, FaUser, FaUserPlus, FaUsers, FaBars, FaTimes, FaSignOutAlt, FaSignInAlt, FaPlusCircle } from "react-icons/fa"; // Importando o ícone para o cadastro
import { useAuth } from "../hooks/useAuth";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth(); // Usando o hook de autenticação

  const linkStyle = (path: string) =>
    location.pathname === path
      ? "text-blue-600 font-bold border-b-2 border-blue-600"
      : "text-gray-700 hover:text-blue-600";

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    logout(); // Chama a função de logout do hook
    navigate("/login"); // Redireciona para a página de login após o logout
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between sticky top-0 z-50">
      <h1 className="text-xl font-semibold text-blue-700">🏋️ WOD Generator</h1>

      <div className="hidden md:flex items-center space-x-6">
        <Link to="/home" className={`flex items-center gap-1 ${linkStyle("/")}`}>
          <FaHome /> Home
        </Link>
        <Link to="/perfil" className={`flex items-center gap-1 ${linkStyle("/perfil")}`}>
          <FaUser /> Perfil
        </Link>
        <Link to="/lista-atletas" className={`flex items-center gap-1 ${linkStyle("/lista-atletas")}`}>
          <FaUsers /> Lista de Atletas
        </Link>
        {user ? (
          <div className="flex items-center gap-3">
            <img
              src={user.avatarUrl || "https://i.pravatar.cc/40"} // Fallback de avatar
              alt="avatar"
              className="w-8 h-8 rounded-full"
            />
            <span className="text-gray-800 font-medium">{user.name}</span>
            <button onClick={handleLogout} title="Logout" className="text-red-500 hover:text-red-700">
              <FaSignOutAlt size={18} />
            </button>
          </div>
        ) : (
          <>
            <Link to="/login" className="text-blue-600 flex items-center gap-1">
              <FaSignInAlt /> Login
            </Link>
          </>
        )}
      </div>

      {/* Botão hamburger mobile */}
      <div className="md:hidden">
        <button onClick={toggleMenu}>
          {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>
      </div>

      {/* Menu mobile */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-start p-4 space-y-4 md:hidden z-50">
          <Link to="/home" onClick={toggleMenu} className={`flex items-center gap-2 ${linkStyle("/")}`}>
            <FaHome /> Home
          </Link>
          <Link to="/perfil" onClick={toggleMenu} className={`flex items-center gap-2 ${linkStyle("/perfil")}`}>
            <FaUser /> Perfil
          </Link>
          {user ? (
            <button
              onClick={() => {
                handleLogout();
                toggleMenu();
              }}
              className="flex items-center gap-2 text-red-500"
            >
              <FaSignOutAlt /> Logout
            </button>
          ) : (
            <>
              <Link to="/login" onClick={toggleMenu} className="flex items-center gap-2 text-blue-600">
                <FaSignInAlt /> Login
              </Link>
              <Link to="/cadastro" onClick={toggleMenu} className="flex items-center gap-2 text-blue-600">
                <FaPlusCircle /> Cadastro de Atleta
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
