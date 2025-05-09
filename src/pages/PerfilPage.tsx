import { useState } from "react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";
import { getUser } from "../utils/userStorage";
import atributosData from "../data/userAttributes.json";
import PerfilAtletaTop from "../components/PerfilAtletaTop";

export default function PerfilAtleta() {
    const [atributos, setAtributos] = useState(atributosData);
    const user = getUser();

    const handleChange = (index: number, novoValor: number) => {
        const atualizados = [...atributos];
        atualizados[index].valor = novoValor;
        setAtributos(atualizados);
    };

    return (
        <div className="max-w-4xl mx-auto p-6">

            {user && <PerfilAtletaTop user={user} atributos={atributos} />}

            {/* Gráfico de Radar */}
            <div className="h-80 mb-6 bg-white shadow rounded-xl p-4">
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart outerRadius="80%" data={atributos}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="atributo" />
                        <PolarRadiusAxis angle={30} domain={[0, 10]} />
                        <Radar
                            name="Atributos"
                            dataKey="valor"
                            stroke="#2563eb"
                            fill="#3b82f6"
                            fillOpacity={0.6}
                        />
                    </RadarChart>
                </ResponsiveContainer>
            </div>

            {/* Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {atributos.map((item, index) => (
                    <div key={item.atributo} className="flex flex-col bg-white p-4 shadow rounded-lg">
                        <label className="text-gray-700 font-semibold mb-1">{item.atributo}</label>
                        <input
                            type="range"
                            min={0}
                            max={10}
                            value={item.valor}
                            onChange={(e) => handleChange(index, parseInt(e.target.value))}
                            className="w-full"
                        />
                        <span className="text-sm text-gray-500 mt-1">Valor: {item.valor}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
