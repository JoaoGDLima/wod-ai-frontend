import { Link } from "react-router-dom";
import ListaAtletas from "../components/ListaAtletas";

const ListaAtletasPage = () => {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Lista de Atletas</h1>
        <Link
          to="/cadastro-atleta"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Novo Atleta
        </Link>
      </div>
      <ListaAtletas />
    </div>
  );
};

export default ListaAtletasPage;
