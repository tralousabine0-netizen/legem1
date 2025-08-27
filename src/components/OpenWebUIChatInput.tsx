import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Mic, Square, Loader2 } from 'lucide-react';

interface OpenWebUIChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export const OpenWebUIChatInput: React.FC<OpenWebUIChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px';
    }
  }, [message]);

  return (
    <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <div className="max-w-5xl mx-auto p-4">
        <form onSubmit={handleSubmit} className="relative">
          <div className="flex items-end space-x-3 bg-gray-50 dark:bg-gray-700 rounded-2xl p-3">
            {/* Attachment button */}
            <button
              type="button"
              className="flex-shrink-0 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              <Paperclip className="w-5 h-5" />
            </button>

            {/* Text input */}
            <div className="flex-1 relative">
              <textarea
                ref={textareaRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Send a message..."
                className="w-full resize-none bg-transparent border-none outline-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-sm leading-6"
                rows={1}
                disabled={isLoading}
                style={{ maxHeight: '200px' }}
              />
            </div>

            {/* Voice input button */}
            <button
              type="button"
              className="flex-shrink-0 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              <Mic className="w-5 h-5" />
            </button>

            {/* Send/Stop button */}
            <button
              type="submit"
              disabled={!message.trim() && !isLoading}
              className={cn(
                "flex-shrink-0 p-2 rounded-lg transition-all duration-200",
                isLoading
                  ? "bg-red-500 hover:bg-red-600 text-white"
                  : message.trim()
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-gray-200 dark:bg-gray-600 text-gray-400 cursor-not-allowed"
              )}
            >
              {isLoading ? (
                <Square className="w-5 h-5" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </div>
        </form>

        {/* Footer text */}
        <div className="text-center mt-3">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Open WebUI may produce inaccurate information about people, places, or facts.
          </p>
        </div>
      </div>
    </div>
  );
};

function cn(...classes: (string | undefined | false)[]): string {
  return classes.filter(Boolean).join(' ');
}