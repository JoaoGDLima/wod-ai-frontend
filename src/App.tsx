// src/App.jsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from "./components/Navbar";
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import PerfilPage from './pages/PerfilPage';
import CadastroAtletaPage from "./pages/CadastroAtletaPage";
import ListaAtletasPage from "./pages/ListaAtletaPage";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/perfil" element={<PerfilPage />} />
          <Route path="/cadastro-atleta" element={<CadastroAtletaPage />} />
          <Route path="/editar-atleta/:id" element={<CadastroAtletaPage />} />
          <Route path="/lista-atletas" element={<ListaAtletasPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
