
import React from 'react';

interface PlanningAssistantProps {
    onGetPlanning: () => void;
    suggestion: string;
    isLoading: boolean;
    error: string;
}

const PlanningAssistant: React.FC<PlanningAssistantProps> = ({ onGetPlanning, suggestion, isLoading, error }) => {
    return (
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border-2 border-pink-200 h-full flex flex-col">
            <div className="mb-4">
                 <h2 className="font-fancy text-2xl text-pink-500">Assistente de Planejamento IA</h2>
            </div>
           
            <div className="flex-grow bg-pink-50/70 rounded-lg p-4 min-h-[300px] overflow-y-auto border border-pink-200">
                {isLoading && (
                     <div className="flex items-center justify-center h-full">
                        <div className="text-center text-pink-500">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-400 mx-auto mb-2"></div>
                            <p className="font-semibold">Planejando seu cronograma...</p>
                        </div>
                    </div>
                )}
                {error && <p className="text-red-500 text-center p-4">{error}</p>}
                {suggestion && (
                    <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                        {suggestion}
                    </div>
                )}
                {!isLoading && !suggestion && !error && (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-center text-pink-400 italic">Clique no botão abaixo para obter<br/> um plano de estudos personalizado! 💖</p>
                    </div>
                )}
            </div>
             <button
                onClick={onGetPlanning}
                disabled={isLoading}
                className="w-full mt-4 bg-pink-500 text-white font-bold py-3 px-4 rounded-full hover:bg-pink-600 transition-colors duration-300 shadow-md disabled:bg-pink-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span>{isLoading ? 'Pensando...' : 'Obter Sugestão de Plano!'}</span>
            </button>
        </div>
    );
};

export default PlanningAssistant;