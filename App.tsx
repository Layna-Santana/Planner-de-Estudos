
import React, { useState, useMemo, useCallback } from 'react';
import { Task } from './types';
import { getPlanningSuggestions } from './services/geminiService';
import Header from './components/Header';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import PlanningAssistant from './components/PlanningAssistant';
import TaskBreakdownAssistant from './components/TaskBreakdownAssistant';

export default function App() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [aiSuggestion, setAiSuggestion] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const sortedTasks = useMemo(() => {
        return [...tasks].sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
    }, [tasks]);

    const handleAddTask = (task: Omit<Task, 'id'>) => {
        const newTask: Task = { ...task, id: crypto.randomUUID() };
        setTasks(prevTasks => [...prevTasks, newTask]);
    };

    const handleDeleteTask = (id: string) => {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    };

    const handleGetPlanning = useCallback(async () => {
        if (tasks.length === 0) {
            setError("Adicione algumas tarefas primeiro para que eu possa te ajudar a planejar! ♡");
            return;
        }
        setIsLoading(true);
        setError('');
        setAiSuggestion('');
        try {
            const suggestion = await getPlanningSuggestions(tasks);
            setAiSuggestion(suggestion);
        } catch (err) {
            setError('Ah, não! Algo deu errado ao conversar com meu assistente de planejamento. Por favor, tente novamente.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, [tasks]);
    
    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="min-h-screen bg-pink-50 text-gray-700 p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                <Header onPrint={handlePrint} />
                <main className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border-2 border-pink-200">
                            <h2 className="font-fancy text-2xl text-pink-500 mb-4">Adicionar Nova Tarefa! ♡</h2>
                            <TaskInput onAddTask={handleAddTask} />
                        </div>
                        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border-2 border-pink-200">
                            <h2 className="font-fancy text-2xl text-pink-500 mb-4">Minha Lista de Tarefas ♡</h2>
                            <TaskList tasks={sortedTasks} onDeleteTask={handleDeleteTask} />
                        </div>
                        <TaskBreakdownAssistant />
                    </div>
                    <div className="lg:col-span-3">
                         <div className="sticky top-8">
                             <PlanningAssistant
                                onGetPlanning={handleGetPlanning}
                                suggestion={aiSuggestion}
                                isLoading={isLoading}
                                error={error}
                            />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}