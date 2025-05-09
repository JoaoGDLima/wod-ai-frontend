import { useEffect } from "react";
import BadgeClassificacao from "./BadgeClassificacao";
import { classificarAtleta  } from "../utils/calculateScore";
import { setUserScoreClassificacao } from "../utils/userStorage";

type ScoreAtletaProps = {
  score: number;
};

export function ScoreAtleta({ score }: ScoreAtletaProps) {
  const nivel = classificarAtleta(score);

  useEffect(() => {
    setUserScoreClassificacao(score, nivel);
  }, [score, nivel]);
  
  return (
    <div className="bg-white p-6 rounded-xl">
      <div className="flex flex-col items-center gap-4">
        {/* Passando o valor correto para a classificação */}
        <BadgeClassificacao classificacao={nivel} size="lg" />

        <div className="w-full">
          <div className="h-4 bg-gray-200 rounded-full">
            <div
              className={`h-4 rounded-full ${
                nivel === "Iniciante"
                  ? "bg-red-400"
                  : nivel === "Intermediário"
                  ? "bg-yellow-400"
                  : "bg-green-500"
              }`}
              style={{ width: `${(score / 10) * 100}%` }}
            />
          </div>
          <div className="text-center mt-2 text-gray-700 font-medium">
            Score: {score.toFixed(1)} / 10
          </div>
        </div>
      </div>
    </div>
  );
}
