import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export type Atleta = {
  id: string;
  name: string;
  avatarUrl: string;
};

const CadastroAtletaForm = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // <- Pega o ID da URL se for edição
  const [name, setName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) {
      const stored = localStorage.getItem("atletas");
      if (stored) {
        const atletas: Atleta[] = JSON.parse(stored);
        const atleta = atletas.find((a) => a.id === id);
        if (atleta) {
          setName(atleta.name);
          setAvatarUrl(atleta.avatarUrl);
        }
      }
    }
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !avatarUrl) {
      setError("Todos os campos são obrigatórios!");
      return;
    }

    const stored = localStorage.getItem("atletas");
    const atletas: Atleta[] = stored ? JSON.parse(stored) : [];

    if (id) {
      // Atualização
      const atualizados = atletas.map((a) =>
        a.id === id ? { ...a, name, avatarUrl } : a
      );
      localStorage.setItem("atletas", JSON.stringify(atualizados));
    } else {
      // Cadastro
      const novo: Atleta = {
        id: Date.now().toString(),
        name,
        avatarUrl,
      };
      atletas.push(novo);
      localStorage.setItem("atletas", JSON.stringify(atletas));
    }

    navigate("/lista-atletas");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6">
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="mb-4">
        <label className="block text-gray-700">Nome</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Nome do Atleta"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Avatar URL</label>
        <input
          type="text"
          value={avatarUrl}
          onChange={(e) => setAvatarUrl(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="URL do Avatar"
        />
      </div>

      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
        {id ? "Salvar" : "Cadastrar"}
      </button>
    </form>
  );
};

export default CadastroAtletaForm;
