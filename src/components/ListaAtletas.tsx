import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEdit, FaTrash } from "react-icons/fa";
import type { Atleta } from "./CadastroAtletaForm";

const ListaAtletas = () => {
  const [atletas, setAtletas] = useState<Atleta[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("atletas");
    if (stored) setAtletas(JSON.parse(stored));
  }, []);

  const excluirAtleta = (id: string) => {
    const atualizados = atletas.filter((a) => a.id !== id);
    setAtletas(atualizados);
    localStorage.setItem("atletas", JSON.stringify(atualizados));
  };

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-4">
      {atletas.map((atleta) => (
        <div
          key={atleta.id}
          className="flex items-center justify-between p-4 bg-white rounded-xl shadow border"
        >
          <div className="flex items-center gap-4">
            <img src={/*atleta.avatarUrl  ||*/ "https://i.pravatar.cc/100"} className="w-14 h-14 rounded-full" alt="avatar" />
            <div>
              <p className="font-semibold text-base">{atleta.name}</p>
              <p className="text-sm text-gray-500">ID: {atleta.id}</p>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => navigate(`/perfil/${atleta.id}`)}
              title="Ver Perfil"
              className="text-blue-600 hover:text-blue-800"
            >
              <FaUser size={18} />
            </button>

            <button
              onClick={() => navigate(`/editar-atleta/${atleta.id}`)}
              title="Editar"
              className="text-yellow-500 hover:text-yellow-600"
            >
              <FaEdit size={18} />
            </button>

            <button
              onClick={() => excluirAtleta(atleta.id)}
              title="Excluir"
              className="text-red-500 hover:text-red-600"
            >
              <FaTrash size={18} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListaAtletas;
