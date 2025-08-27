interface FlowiseResponse {
  text?: string;
  question?: string;
  chatId?: string;
  chatMessageId?: string;
  [key: string]: any;
}

interface FlowiseRequest {
  question: string;
  overrideConfig?: {
    startInputType?: string;
    formTitle?: string;
    formDescription?: string;
    formInputTypes?: string;
  };
  chatId?: string;
}

class FlowiseApiService {
  private baseUrl = "https://srv886023.hstgr.cloud/api/v1/prediction/b02cce0c-77a8-4b4f-8a4a-0de7afd15fc2";

  async sendMessage(message: string, chatId?: string): Promise<string> {
    try {
      const data: FlowiseRequest = {
        question: message,
        overrideConfig: {
          startInputType: "example",
          formTitle: "example", 
          formDescription: "example",
          formInputTypes: "example",
        }
      };

      // Ajouter le chatId si disponible pour maintenir le contexte
      if (chatId) {
        data.chatId = chatId;
      }

      const response = await fetch(this.baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status} - ${response.statusText}`);
      }

      const result: FlowiseResponse = await response.json();
      
      // Extraire la réponse du chatbot
      if (result.text) {
        return result.text;
      } else if (typeof result === 'string') {
        return result;
      } else {
        // Fallback si la structure de réponse est différente
        return JSON.stringify(result);
      }

    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
      throw new Error(
        error instanceof Error 
          ? `Erreur de communication: ${error.message}` 
          : 'Erreur inconnue lors de la communication avec le serveur'
      );
    }
  }

  // Méthode pour tester la connexion
  async testConnection(): Promise<boolean> {
    try {
      await this.sendMessage("Test de connexion");
      return true;
    } catch (error) {
      console.error('Test de connexion échoué:', error);
      return false;
    }
  }
}

export const flowiseApi = new FlowiseApiService();