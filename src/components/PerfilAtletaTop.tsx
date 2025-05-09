import { ScoreAtleta } from "./ScoreAtleta";
import { calcularScorePonderado } from "../utils/calculateScore";

type PerfilAtletaTopProps = {
  user: { avatarUrl: string; name: string };
  atributos: { atributo: string; valor: number; peso?: number }[];
};

export default function PerfilAtletaTop({ user, atributos }: PerfilAtletaTopProps) {
  // Calcula o score ponderado com os atributos
  const score = calcularScorePonderado(atributos);

  return (
    <div className="w-full bg-white p-6 rounded-xl shadow mb-2">
        
      {/* Avatar do usuário com borda e sombra */}
      <div className="flex justify-center mb-4">
        <img
          src={user.avatarUrl || "https://i.pravatar.cc/100"}
          alt="Avatar"
          className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-lg transform transition-transform hover:scale-105"
        />
      </div>

      {/* Nome do usuário */}
      <span className="text-2xl font-semibold text-gray-800 mb-2 text-center w-full block">{user.name}</span>

      {/* Score do atleta */}
      <ScoreAtleta score={score} />

      {/* Detalhes adicionais ou informações (se necessário) */}
      <div className="mt-1 text-center text-gray-500 text-sm">
        <p>Atualize seus atributos e veja seu progresso!</p>
      </div>
    </div>
  );
}
