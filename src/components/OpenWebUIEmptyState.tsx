import React from 'react';
import { MessageCircle, Lightbulb, Code, BookOpen, Zap } from 'lucide-react';

interface OpenWebUIEmptyStateProps {
  onStartChat: () => void;
}

export const OpenWebUIEmptyState: React.FC<OpenWebUIEmptyStateProps> = ({ onStartChat }) => {
  const suggestions = [
    {
      icon: Lightbulb,
      title: "Creative Writing",
      description: "Help me write a story about...",
      prompt: "Help me write a creative story about a time traveler who discovers that changing the past creates parallel universes."
    },
    {
      icon: Code,
      title: "Code Assistant",
      description: "Explain this code snippet...",
      prompt: "Can you explain how React hooks work and provide a practical example?"
    },
    {
      icon: BookOpen,
      title: "Learning Helper",
      description: "Teach me about...",
      prompt: "Explain quantum computing in simple terms that a beginner can understand."
    },
    {
      icon: Zap,
      title: "Problem Solving",
      description: "Help me solve...",
      prompt: "I need help organizing my daily schedule to be more productive. Can you suggest a system?"
    }
  ];

  const handleSuggestionClick = (prompt: string) => {
    onStartChat();
    // In a real implementation, you might want to pre-fill the input with this prompt
  };

  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="max-w-4xl w-full text-center">
        {/* Header */}
        <div className="mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <MessageCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            How can I help you today?
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            I'm your AI assistant powered by FlowiseAI. Ask me anything, and I'll do my best to help you with information, creative tasks, problem-solving, and more.
          </p>
        </div>

        {/* Suggestion Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion.prompt)}
              className="group p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-lg transition-all duration-200 text-left"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50 transition-colors">
                  <suggestion.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {suggestion.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                    {suggestion.description}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 italic">
                    "{suggestion.prompt.substring(0, 60)}..."
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Real-time responses</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>Context-aware conversations</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span>Powered by FlowiseAI</span>
          </div>
        </div>
      </div>
    </div>
  );
};