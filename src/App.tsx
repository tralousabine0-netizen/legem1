import React, { useEffect, useRef } from 'react';
import { Sidebar } from './components/Sidebar';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { EmptyState } from './components/EmptyState';
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
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar
        sessions={sessions}
        currentSessionId={currentSessionId}
        onNewSession={createNewSession}
        onSelectSession={setCurrentSessionId}
        onDeleteSession={deleteSession}
      />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {currentSession ? (
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto bg-white">
              {currentSession.messages.length === 0 ? (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <p className="text-lg mb-2">Conversation démarrée</p>
                    <p className="text-sm">Tapez votre premier message ci-dessous</p>
                  </div>
                </div>
              ) : (
                <div className="max-w-4xl mx-auto">
                  {currentSession.messages.map((message) => (
                    <ChatMessage key={message.id} message={message} />
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* Input */}
            <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
          </>
        ) : (
          <EmptyState onStartChat={handleStartChat} />
        )}
      </div>
    </div>
  );
}

export default App;