import { useState } from "react";
import tiposTreino from "../data/tiposTreinos.json";
import Select, { type MultiValue, type ActionMeta } from "react-select";
import niveis from "../data/niveis.json";
import objetivos from "../data/objetivos.json";
import equipamentosData from "../data/equipamentos.json";
import exerciciosData from "../data/exercicios.json";
import Modal from "../components/Modal";

export default function HomePage() {
  const [tipo, setTipo] = useState("");
  const [tempo, setTempo] = useState("");
  const [nivel, setNivel] = useState("");
  const [objetivo, setObjetivo] = useState("");
  const [equipamentos, setEquipamentos] = useState<any[]>([]);
  const [evitarExercicios, setEvitarExercicios] = useState<any[]>([]);
  const [historico, setHistorico] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [wodData, setWodData] = useState<any>(null);

  const handleMultiSelectChange = (
    setter: React.Dispatch<React.SetStateAction<any[]>>
  ) => (newValue: MultiValue<any>, _actionMeta: ActionMeta<any>) => {
    setter([...newValue]);
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = {
      tipo,
      tempo,
      nivel,
      objetivo,
      equipamentos: equipamentos.map((e: any) => e.value),
      evitarExercicios: evitarExercicios.map((e: any) => e.value),
      historico: historico.split(",").map(e => e.trim()),
    };
    console.log("Prompt Payload:", payload);

    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:3000/generate-wod/OpenRouter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // manda o token aqui
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Erro ao gerar WOD");
      }

      const data = await response.json();
      console.log("WOD gerado:", data);

      setWodData(data);
      setModalVisible(true); // Exibir modal após receber o WOD 
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  const handleSave = () => {
    alert("WOD salvo com sucesso!");
  };

  const handleShare = () => {
    alert("Compartilhado com sucesso!");
  };

  const handleDelete = () => {
    setWodData(null);
    setModalVisible(false);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-xl space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">Gerar WOD com IA</h1>

        <select
          className="w-full border p-2 rounded"
          value={tipo}
          onChange={e => setTipo(e.target.value)}
        >
          <option value="">Selecione o tipo de treino</option>
          {tiposTreino.map(opcao => (
            <option key={opcao.value} value={opcao.value}>
              {opcao.label}
            </option>
          ))}
        </select>

        <input
          className="w-full border p-2 rounded"
          type="number"
          placeholder="Tempo em minutos"
          value={tempo}
          onChange={e => setTempo(e.target.value)}
        />

        <select
          className="w-full border p-2 rounded"
          value={nivel}
          onChange={e => setNivel(e.target.value)}
        >
          <option value="">Selecione o nível</option>
          {niveis.map(opcao => (
            <option key={opcao.value} value={opcao.value}>
              {opcao.label}
            </option>
          ))}
        </select>

        <select
          className="w-full border p-2 rounded"
          value={objetivo}
          onChange={e => setObjetivo(e.target.value)}
        >
          <option value="">Selecione o objetivo</option>
          {objetivos.map(opcao => (
            <option key={opcao.value} value={opcao.value}>
              {opcao.label}
            </option>
          ))}
        </select>

        <Select
          isMulti
          options={equipamentosData}
          value={equipamentos}
          onChange={handleMultiSelectChange(setEquipamentos)}
          className="w-full"
          placeholder="Selecione os equipamentos"
        />

        <Select
          isMulti
          options={exerciciosData}
          value={evitarExercicios}
          onChange={handleMultiSelectChange(setEvitarExercicios)}
          className="w-full"
          placeholder="Exercícios a evitar"
        />

        <input
          className="w-full border p-2 rounded"
          type="text"
          placeholder="Histórico recente (ex: pernas ontem, descanso)"
          value={historico}
          onChange={e => setHistorico(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Gerar WOD
        </button>
      </form>

      <Modal
        isVisible={modalVisible}
        data={wodData}
        onClose={handleCloseModal}
        onSave={handleSave}
        onShare={handleShare}
        onDelete={handleDelete}
      />

    </div>
  );
}

