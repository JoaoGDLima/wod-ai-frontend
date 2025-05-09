import { FaRocket, FaCogs, FaCubes } from "react-icons/fa";
import { motion } from "framer-motion";
import { Tooltip } from "react-tooltip";

interface BadgeClassificacaoProps {
  classificacao: string;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: "text-xs px-2 py-0.5",
  md: "text-sm px-3 py-1",
  lg: "text-base px-4 py-2",
};

export default function BadgeClassificacao({ classificacao, size = "md" }: BadgeClassificacaoProps) {
  const getBadgeInfo = (nivel: string) => {
    switch (nivel) {
      case "Iniciante":
        return {
          icon: <FaCubes className="mr-2" />,
          text: "Iniciante",
          style: "bg-red-100 text-red-700 border-red-300",
          desc: "Até 4 pontos. Começando agora ou com pouca experiência.",
        };
      case "Intermediário":
        return {
          icon: <FaCogs className="mr-2" />,
          text: "Intermediário",
          style: "bg-yellow-100 text-yellow-700 border-yellow-300",
          desc: "Entre 4 e 7 pontos. Já tem uma base sólida.",
        };
      case "Avançado":
        return {
          icon: <FaRocket className="mr-2" />,
          text: "Avançado",
          style: "bg-green-100 text-green-700 border-green-300",
          desc: "Acima de 7 pontos. Alto nível de performance.",
        };
      default:
        return {
          icon: null,
          text: "Desconhecido",
          style: "bg-gray-100 text-gray-700 border-gray-300",
          desc: "Classificação não encontrada.",
        };
    }
  };

  const badge = getBadgeInfo(classificacao);
  const tooltipId = `tooltip-${classificacao}`;

  return (
    <>
      <motion.span
        data-tooltip-id={tooltipId}
        data-tooltip-content={badge.desc}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`inline-flex items-center mt-2 rounded-full font-semibold border transition-all duration-150 ${sizeMap[size]} ${badge.style}`}
      >
        {badge.icon}
        {badge.text}
      </motion.span>
      <Tooltip id={tooltipId} place="top" />
    </>
  );
}
