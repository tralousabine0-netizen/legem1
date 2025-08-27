import React from 'react';
import { MessageCircle, Zap, Shield, Globe } from 'lucide-react';

interface EmptyStateProps {
  onStartChat: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onStartChat }) => {
  const features = [
    {
      icon: MessageCircle,
      title: "Conversations intelligentes",
      description: "Discutez naturellement avec votre assistant IA"
    },
    {
      icon: Zap,
      title: "Réponses rapides",
      description: "Obtenez des réponses instantanées et pertinentes"
    },
    {
      icon: Shield,
      title: "Sécurisé et privé",
      description: "Vos conversations restent confidentielles"
    },
    {
      icon: Globe,
      title: "Connecté à FlowiseAI",
      description: "Propulsé par votre serveur FlowiseAI personnel"
    }
  ];

  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="max-w-2xl text-center">
        <div className="mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Bienvenue dans votre Assistant IA
          </h1>
          <p className="text-lg text-gray-600">
            Commencez une conversation avec votre assistant FlowiseAI
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
              <feature.icon className="w-8 h-8 text-blue-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        <button
          onClick={onStartChat}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors inline-flex items-center space-x-2"
        >
          <MessageCircle className="w-5 h-5" />
          <span>Commencer une conversation</span>
        </button>

        <div className="mt-8 text-sm text-gray-500">
          <p>Tapez votre message et appuyez sur Entrée pour commencer</p>
        </div>
      </div>
    </div>
  );
};