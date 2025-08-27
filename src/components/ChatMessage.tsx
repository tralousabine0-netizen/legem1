import React from 'react';
import { Copy, User, Bot, AlertCircle } from 'lucide-react';
import { ChatMessage as ChatMessageType } from '../types/chat';
import { cn } from '../utils/cn';

interface ChatMessageProps {
  message: ChatMessageType;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
    } catch (err) {
      console.error('Erreur lors de la copie:', err);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className={cn(
      "group flex space-x-4 p-4 hover:bg-gray-50 transition-colors",
      message.isError && "bg-red-50 hover:bg-red-100"
    )}>
      {/* Avatar */}
      <div className={cn(
        "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
        message.role === 'user' 
          ? "bg-blue-600 text-white" 
          : message.isError
            ? "bg-red-600 text-white"
            : "bg-gray-600 text-white"
      )}>
        {message.role === 'user' ? (
          <User className="w-4 h-4" />
        ) : message.isError ? (
          <AlertCircle className="w-4 h-4" />
        ) : (
          <Bot className="w-4 h-4" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2 mb-1">
          <span className="text-sm font-medium text-gray-900">
            {message.role === 'user' ? 'Vous' : 'Assistant'}
          </span>
          <span className="text-xs text-gray-500">
            {formatTime(message.timestamp)}
          </span>
        </div>
        
        <div className={cn(
          "prose prose-sm max-w-none",
          message.isError && "text-red-700"
        )}>
          <p className="whitespace-pre-wrap">{message.content}</p>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={copyToClipboard}
            className="p-1 hover:bg-gray-200 rounded transition-colors"
            title="Copier le message"
          >
            <Copy className="w-3 h-3 text-gray-500" />
          </button>
        </div>
      </div>
    </div>
  );
};