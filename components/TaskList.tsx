
import React from 'react';
import { Task } from '../types';

interface TaskListProps {
    tasks: Task[];
    onDeleteTask: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onDeleteTask }) => {
    
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        // Add timezone offset to display correct date
        const userTimezoneOffset = date.getTimezoneOffset() * 60000;
        return new Date(date.getTime() + userTimezoneOffset).toLocaleDateString('pt-BR', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    }

    if (tasks.length === 0) {
        return <p className="text-center text-pink-400 italic">Nenhuma tarefa ainda. Adicione uma para começar! ♡</p>;
    }

    return (
        <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
            {tasks.map(task => (
                <div key={task.id} className="flex items-center justify-between bg-pink-100 p-3 rounded-lg shadow-sm">
                    <div className="flex-1">
                        <p className="font-semibold text-pink-800">{task.description}</p>
                        <p className="text-sm text-pink-600 font-bold">{formatDate(task.dueDate)}</p>
                    </div>
                    <button
                        onClick={() => onDeleteTask(task.id)}
                        className="ml-4 text-pink-500 hover:text-red-500 transition-colors"
                        aria-label="Excluir tarefa"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>
                </div>
            ))}
        </div>
    );
};

export default TaskList;