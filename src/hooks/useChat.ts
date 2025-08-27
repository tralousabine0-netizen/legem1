import { useState, useCallback } from 'react';
import { ChatMessage, ChatSession } from '../types/chat';
import { flowiseApi } from '../services/flowiseApi';

export const useChat = () => {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const currentSession = sessions.find(s => s.id === currentSessionId);

  const createNewSession = useCallback(() => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      title: 'Nouvelle conversation',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    setSessions(prev => [newSession, ...prev]);
    setCurrentSessionId(newSession.id);
    return newSession;
  }, []);

  const deleteSession = useCallback((sessionId: string) => {
    setSessions(prev => prev.filter(s => s.id !== sessionId));
    if (currentSessionId === sessionId) {
      const remainingSessions = sessions.filter(s => s.id !== sessionId);
      setCurrentSessionId(remainingSessions.length > 0 ? remainingSessions[0].id : null);
    }
  }, [currentSessionId, sessions]);

  const updateSessionTitle = useCallback((sessionId: string, title: string) => {
    setSessions(prev => prev.map(session => 
      session.id === sessionId 
        ? { ...session, title, updatedAt: new Date() }
        : session
    ));
  }, []);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    let session = currentSession;
    if (!session) {
      session = createNewSession();
    }

    // Ajouter le message utilisateur
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: content.trim(),
      role: 'user',
      timestamp: new Date()
    };

    setSessions(prev => prev.map(s => 
      s.id === session!.id 
        ? { 
            ...s, 
            messages: [...s.messages, userMessage],
            updatedAt: new Date()
          }
        : s
    ));

    // Mettre à jour le titre si c'est le premier message
    if (session.messages.length === 0) {
      const title = content.length > 50 ? content.substring(0, 50) + '...' : content;
      updateSessionTitle(session.id, title);
    }

    setIsLoading(true);

    try {
      // Envoyer le message à FlowiseAI avec l'ID de session pour le contexte
      const response = await flowiseApi.sendMessage(content, session.id);

      // Ajouter la réponse du bot
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: 'assistant',
        timestamp: new Date()
      };

      setSessions(prev => prev.map(s => 
        s.id === session!.id 
          ? { 
              ...s, 
              messages: [...s.messages, botMessage],
              updatedAt: new Date()
            }
          : s
      ));

    } catch (error) {
      // Ajouter un message d'erreur
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: `Erreur: ${error instanceof Error ? error.message : 'Une erreur est survenue'}`,
        role: 'assistant',
        timestamp: new Date(),
        isError: true
      };

      setSessions(prev => prev.map(s => 
        s.id === session!.id 
          ? { 
              ...s, 
              messages: [...s.messages, errorMessage],
              updatedAt: new Date()
            }
          : s
      ));
    } finally {
      setIsLoading(false);
    }
  }, [currentSession, createNewSession, updateSessionTitle]);

  return {
    sessions,
    currentSession,
    currentSessionId,
    isLoading,
    createNewSession,
    deleteSession,
    sendMessage,
    setCurrentSessionId
  };
};