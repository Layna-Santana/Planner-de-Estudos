
import React from 'react';

interface HeaderProps {
    onPrint: () => void;
}

const Header: React.FC<HeaderProps> = ({ onPrint }) => {
    return (
        <header className="flex flex-col sm:flex-row justify-between items-center bg-white/50 backdrop-blur-sm p-4 rounded-2xl shadow-md border-2 border-pink-200 print:hidden">
            <div>
                 <h1 className="font-fancy text-4xl text-pink-600">Meu Planner de Estudos ♡</h1>
                 <p className="text-pink-400">Vamos nos organizar com fofura! ♡</p>
            </div>
            <button
                onClick={onPrint}
                className="mt-4 sm:mt-0 bg-pink-400 text-white font-bold py-2 px-6 rounded-full hover:bg-pink-500 transition-colors duration-300 shadow-sm flex items-center space-x-2"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v6a2 2 0 002 2h12a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7V9h6v3z" clipRule="evenodd" />
                </svg>
                <span>Imprimir Planner</span>
            </button>
        </header>
    );
};

export default Header;