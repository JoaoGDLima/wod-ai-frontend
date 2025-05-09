export interface Atributo {
    atributo: string;
    valor: number;
    peso?: number;
  }
  
  export function calcularScorePonderado(atributos: { valor: number; peso: number }[]): number {
    const totalPeso = atributos.reduce((acc, curr) => acc + curr.peso, 0);
    const score = atributos.reduce((acc, curr) => acc + curr.valor * curr.peso, 0) / totalPeso;
    return parseFloat(score.toFixed(2));
  }
  
  export function classificarAtleta(score: number): "Iniciante" | "Intermediário" | "Avançado" {
    if (score < 4) return "Iniciante";
    if (score < 7) return "Intermediário";
    return "Avançado";
  }
  