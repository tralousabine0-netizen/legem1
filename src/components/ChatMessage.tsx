import React from 'react';
import { Copy, User, Bot, AlertCircle, ThumbsUp, ThumbsDown, RotateCcw } from 'lucide-react';
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
      "group flex space-x-4 p-6 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors",
      message.isError && "bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30"
    )}>
      {/* Avatar */}
      <div className={cn(
        "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center",
        message.role === 'user' 
          ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white" 
          : message.isError
            ? "bg-red-600 text-white"
            : "bg-gradient-to-br from-gray-600 to-gray-700 text-white"
      )}>
        {message.role === 'user' ? (
          <User className="w-5 h-5" />
        ) : message.isError ? (
          <AlertCircle className="w-5 h-5" />
        ) : (
          <Bot className="w-5 h-5" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-sm font-semibold text-gray-900 dark:text-white">
            {message.role === 'user' ? 'You' : 'Assistant'}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {formatTime(message.timestamp)}
          </span>
        </div>
        
        <div className={cn(
          "prose prose-sm max-w-none dark:prose-invert",
          message.isError && "text-red-700 dark:text-red-400"
        )}>
          <div className="whitespace-pre-wrap text-gray-800 dark:text-gray-200 leading-relaxed">
            {message.content}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-1 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={copyToClipboard}
            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
            title="Copy message"
          >
            <Copy className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          </button>
          
          {message.role === 'assistant' && !message.isError && (
            <>
              <button
                className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
                title="Good response"
              >
                <ThumbsUp className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </button>
              <button
                className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
                title="Bad response"
              >
                <ThumbsDown className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </button>
              <button
                className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
                title="Regenerate response"
              >
                <RotateCcw className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};