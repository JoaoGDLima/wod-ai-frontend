// components/Modal.tsx
import React from "react";
import { FaSave, FaShareAlt, FaTrashAlt } from "react-icons/fa"; // Importando ícones
import ReactMarkdown from "react-markdown"; // Importando o react-markdown
import markdownComponents from "./MarkdownComponents";

interface ModalProps {
    isVisible: boolean;
    data: any;
    onClose: () => void;
    onSave: () => void;
    onShare: () => void;
    onDelete: () => void;
}

const Modal: React.FC<ModalProps> = ({ isVisible, data, onClose, onSave, onShare, onDelete }) => {
    if (!isVisible) return null;

    const markdownContent = (typeof data === 'string')
        ? data
        : (data && typeof data.wod === 'string')
            ? data.wod
            : 'Erro ao carregar o WOD.';

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80 sm:w-96 md:w-1/2 lg:w-1/3 xl:w-1/4 relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                >
                    X
                </button>
                <h2 className="text-xl font-bold text-center">WOD Gerado</h2>
                <div className="mt-4 overflow-y-auto max-h-60">
                    {/* Passando a string para o react-markdown */}
                    <ReactMarkdown components={markdownComponents}>
                        {markdownContent}
                    </ReactMarkdown>
                </div>
                <div className="mt-4 flex justify-end space-x-4">
                    <button
                        onClick={onSave}
                        className="text-gray-600 hover:text-green-600 p-2 rounded-full"
                        title="Salvar"
                    >
                        <FaSave size={20} />
                    </button>
                    <button
                        onClick={onShare}
                        className="text-gray-600 hover:text-blue-600 p-2 rounded-full"
                        title="Compartilhar"
                    >
                        <FaShareAlt size={20} />
                    </button>
                    <button
                        onClick={onDelete}
                        className="text-gray-600 hover:text-red-600 p-2 rounded-full"
                        title="Apagar"
                    >
                        <FaTrashAlt size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
