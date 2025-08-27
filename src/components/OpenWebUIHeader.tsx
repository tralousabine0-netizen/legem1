import React from 'react';
import { Menu, Settings, User } from 'lucide-react';

export const OpenWebUIHeader: React.FC = () => {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center space-x-3">
        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
          <Menu className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </button>
        <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
          Open WebUI
        </h1>
      </div>
      
      <div className="flex items-center space-x-2">
        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
          <Settings className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </button>
        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
          <User className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </button>
      </div>
    </div>
  );
};