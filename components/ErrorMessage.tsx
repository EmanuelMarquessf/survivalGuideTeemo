
import React from 'react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className="bg-red-100 border-l-4 border-red-600 text-red-800 p-6 rounded-md shadow-md my-6" role="alert">
      <div className="flex items-center">
        <div className="py-1">
          <svg className="fill-current h-6 w-6 text-red-600 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/>
          </svg>
        </div>
        <div>
          <p className="font-bold">Ops! Algo deu errado no acampamento!</p>
          <p className="text-sm">{message}</p>
        </div>
      </div>
      {onRetry && (
        <div className="mt-4 text-right">
          <button
            onClick={onRetry}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            Tentar Novamente
          </button>
        </div>
      )}
    </div>
  );
};

export default ErrorMessage;
