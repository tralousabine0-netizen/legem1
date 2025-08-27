import React, { useEffect, useRef } from 'react';
import { OpenWebUISidebar } from './components/OpenWebUISidebar';
import { ChatMessage } from './components/ChatMessage';
import { OpenWebUIChatInput } from './components/OpenWebUIChatInput';
import { OpenWebUIEmptyState } from './components/OpenWebUIEmptyState';
import { OpenWebUIHeader } from './components/OpenWebUIHeader';
import { useChat } from './hooks/useChat';

function App() {
  const {
    sessions,
    currentSession,
    currentSessionId,
    isLoading,
    createNewSession,
    deleteSession,
    sendMessage,
    setCurrentSessionId
  } = useChat();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll vers le bas quand de nouveaux messages arrivent
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentSession?.messages]);

  const handleStartChat = () => {
    createNewSession();
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <OpenWebUISidebar
        sessions={sessions}
        currentSessionId={currentSessionId}
        onNewSession={createNewSession}
        onSelectSession={setCurrentSessionId}
        onDeleteSession={deleteSession}
      />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative">
        {/* Header */}
        <OpenWebUIHeader />
        
        {currentSession ? (
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto bg-white dark:bg-gray-800">
              {currentSession.messages.length === 0 ? (
                <OpenWebUIEmptyState onStartChat={handleStartChat} />
              ) : (
                <div className="max-w-5xl mx-auto px-4 py-4">
                  {currentSession.messages.map((message) => (
                    <ChatMessage key={message.id} message={message} />
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* Input */}
            <OpenWebUIChatInput onSendMessage={sendMessage} isLoading={isLoading} />
          </>
        ) : (
          <OpenWebUIEmptyState onStartChat={handleStartChat} />
        )}
      </div>
    </div>
  );
}

export default App;