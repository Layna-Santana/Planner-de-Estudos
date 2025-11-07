
import React, { useState, useCallback } from 'react';
import { getTaskBreakdown } from '../services/geminiService';

const TaskBreakdownAssistant: React.FC = () => {
    const [taskInfo, setTaskInfo] = useState('');
    const [breakdown, setBreakdown] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleGetBreakdown = useCallback(async () => {
        if (!taskInfo.trim()) {
            setError("Por favor, me fale sobre sua tarefa primeiro! ૮ ˶•~•˶ ა");
            return;
        }
        setIsLoading(true);
        setError('');
        setBreakdown('');
        try {
            const result = await getTaskBreakdown(taskInfo);
            setBreakdown(result);
        } catch (err) {
            setError('Oh, céus! Tive um probleminha para pensar. Você poderia tentar de novo?');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, [taskInfo]);

    return (
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border-2 border-pink-200">
            <h2 className="font-fancy text-2xl text-pink-500 mb-4">Precisa de ajuda com uma tarefa?</h2>
            <p className="text-pink-400 mb-4 text-sm">Me conte sobre uma tarefa (como o tema de uma redação ou os requisitos de um projeto) e eu te ajudarei a dividi-la em passos menores! ♡</p>
            
            <textarea
                value={taskInfo}
                onChange={(e) => setTaskInfo(e.target.value)}
                placeholder="ex: Escrever uma redação de 10 páginas sobre as causas da Revolução Francesa..."
                className="w-full px-4 py-2 border-2 border-pink-300 rounded-lg focus:ring-pink-400 focus:border-pink-400 transition mb-4"
                rows={4}
                aria-label="Descrição da tarefa para divisão"
            />
            
            <button
                onClick={handleGetBreakdown}
                disabled={isLoading}
                className="w-full bg-pink-500 text-white font-bold py-2 px-4 rounded-full hover:bg-pink-600 transition-colors duration-300 shadow-md disabled:bg-pink-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
                <span>{isLoading ? 'Pensando...' : 'Dividir tarefa!'}</span>
            </button>

            {(isLoading || error || breakdown) && (
                 <div className="mt-4 bg-pink-50/70 rounded-lg p-4 min-h-[150px] overflow-y-auto border border-pink-200">
                    {isLoading && (
                        <div className="flex items-center justify-center h-full" aria-live="polite">
                           <div className="text-center text-pink-500">
                               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-400 mx-auto mb-2"></div>
                               <p className="font-semibold">Criando seu plano...</p>
                           </div>
                       </div>
                    )}
                    {error && <p className="text-red-500 text-center p-4" role="alert">{error}</p>}
                    {breakdown && (
                        <div className="whitespace-pre-wrap text-gray-700 leading-relaxed text-sm">
                           {breakdown}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default TaskBreakdownAssistant;