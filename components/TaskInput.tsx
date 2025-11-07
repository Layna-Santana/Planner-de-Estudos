
import React, { useState } from 'react';
import { Task } from '../types';

interface TaskInputProps {
    onAddTask: (task: Omit<Task, 'id'>) => void;
}

const TaskInput: React.FC<TaskInputProps> = ({ onAddTask }) => {
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [error, setError] = useState('');
    
    const today = new Date().toISOString().split('T')[0];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!description.trim() || !dueDate) {
            setError('Por favor, preencha a tarefa e a data de entrega! 🎀');
            return;
        }
        onAddTask({ description, dueDate });
        setDescription('');
        setDueDate('');
        setError('');
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="description" className="block text-sm font-bold text-pink-700 mb-1">Descrição da Tarefa</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="ex: Terminar redação de história"
                    className="w-full px-4 py-2 border-2 border-pink-300 rounded-lg focus:ring-pink-400 focus:border-pink-400 transition"
                    rows={3}
                />
            </div>
            <div>
                <label htmlFor="dueDate" className="block text-sm font-bold text-pink-700 mb-1">Data de Entrega</label>
                <input
                    id="dueDate"
                    type="date"
                    value={dueDate}
                    min={today}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full px-4 py-2 border-2 border-pink-300 rounded-lg focus:ring-pink-400 focus:border-pink-400 transition"
                />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
                type="submit"
                className="w-full bg-pink-500 text-white font-bold py-2 px-4 rounded-full hover:bg-pink-600 transition-colors duration-300 shadow-md transform hover:scale-105"
            >
                Adicionar Tarefa
            </button>
        </form>
    );
};

export default TaskInput;