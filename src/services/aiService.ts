
import { useToast } from "@/hooks/use-toast";

export interface AIServiceConfig {
  openaiApiKey?: string;
  elevenlabsApiKey?: string;
  anthropicApiKey?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  context?: string;
}

export interface DocumentGenerationRequest {
  type: 'estimate' | 'invoice' | 'proposal' | 'report';
  projectDetails: string;
  customerInfo: string;
  additionalContext?: Record<string, any>;
}

export interface VoiceRequest {
  text: string;
  voiceId?: string;
  model?: string;
}

export interface PredictionRequest {
  type: 'revenue' | 'cost' | 'efficiency' | 'risk';
  data: Record<string, any>;
  timeframe: string;
}

class AIService {
  private config: AIServiceConfig = {};
  private usageStats = {
    chatMessages: 0,
    documentsGenerated: 0,
    voiceSynthesis: 0,
    predictions: 0,
    monthlyLimit: 1000,
    resetDate: new Date()
  };

  constructor() {
    this.loadConfig();
    this.loadUsageStats();
  }

  private loadConfig() {
    const savedConfig = localStorage.getItem('aiServiceConfig');
    if (savedConfig) {
      try {
        this.config = JSON.parse(savedConfig);
      } catch (error) {
        console.error('Error loading AI config:', error);
      }
    }
  }

  private saveConfig() {
    localStorage.setItem('aiServiceConfig', JSON.stringify(this.config));
  }

  private loadUsageStats() {
    const savedStats = localStorage.getItem('aiUsageStats');
    if (savedStats) {
      try {
        const stats = JSON.parse(savedStats);
        const now = new Date();
        const resetDate = new Date(stats.resetDate);
        
        // Reset monthly stats if a month has passed
        if (now.getMonth() !== resetDate.getMonth() || now.getFullYear() !== resetDate.getFullYear()) {
          this.resetMonthlyStats();
        } else {
          this.usageStats = { ...this.usageStats, ...stats };
        }
      } catch (error) {
        console.error('Error loading usage stats:', error);
      }
    }
  }

  private saveUsageStats() {
    localStorage.setItem('aiUsageStats', JSON.stringify(this.usageStats));
  }

  private resetMonthlyStats() {
    this.usageStats = {
      chatMessages: 0,
      documentsGenerated: 0,
      voiceSynthesis: 0,
      predictions: 0,
      monthlyLimit: 1000,
      resetDate: new Date()
    };
    this.saveUsageStats();
  }

  private incrementUsage(type: keyof typeof this.usageStats) {
    if (typeof this.usageStats[type] === 'number') {
      (this.usageStats[type] as number)++;
      this.saveUsageStats();
    }
  }

  updateConfig(newConfig: Partial<AIServiceConfig>) {
    this.config = { ...this.config, ...newConfig };
    this.saveConfig();
  }

  getConfig(): AIServiceConfig {
    return { ...this.config };
  }

  getUsageStats() {
    return { ...this.usageStats };
  }

  async sendChatMessage(message: string, context?: string): Promise<ChatMessage> {
    if (!this.config.openaiApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    this.incrementUsage('chatMessages');

    try {
      const systemPrompt = this.getContextualSystemPrompt(context);
      
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.openaiApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: message }
          ],
          temperature: 0.7,
          max_tokens: 1000
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.statusText}`);
      }

      const data = await response.json();
      
      return {
        id: Date.now().toString(),
        role: 'assistant',
        content: data.choices[0].message.content,
        timestamp: new Date(),
        context
      };
    } catch (error) {
      console.error('Chat API error:', error);
      throw error;
    }
  }

  private getContextualSystemPrompt(context?: string): string {
    const basePrompt = "You are an AI assistant for JobBlox, a construction management platform. You help with job scheduling, customer management, estimates, invoices, and general construction business operations.";
    
    const contextPrompts = {
      'dashboard': `${basePrompt} The user is currently viewing the dashboard. Focus on providing insights about their business metrics, upcoming jobs, and actionable recommendations.`,
      'jobs': `${basePrompt} The user is in the jobs section. Help with job management, scheduling, resource allocation, and progress tracking.`,
      'customers': `${basePrompt} The user is managing customers. Assist with customer relationships, communication, follow-ups, and service optimization.`,
      'estimates': `${basePrompt} The user is working on estimates. Help with accurate pricing, material calculations, and professional proposal generation.`,
      'invoices': `${basePrompt} The user is handling invoicing. Assist with billing, payment tracking, and financial record keeping.`,
      'team': `${basePrompt} The user is managing their team. Help with scheduling, task assignment, performance tracking, and communication.`,
      'reports': `${basePrompt} The user is viewing reports and analytics. Provide insights on business performance, trends, and optimization opportunities.`
    };

    return contextPrompts[context as keyof typeof contextPrompts] || basePrompt;
  }

  async generateDocument(request: DocumentGenerationRequest): Promise<string> {
    if (!this.config.openaiApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    this.incrementUsage('documentsGenerated');

    const prompt = this.getDocumentPrompt(request);

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.openaiApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.3,
          max_tokens: 2000
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.statusText}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Document generation error:', error);
      throw error;
    }
  }

  private getDocumentPrompt(request: DocumentGenerationRequest): string {
    const { type, projectDetails, customerInfo, additionalContext } = request;
    
    const prompts = {
      estimate: `Generate a professional construction estimate for the following project:

Project Details: ${projectDetails}
Customer Information: ${customerInfo}

Include:
- Detailed scope of work
- Itemized cost breakdown (materials, labor, permits)
- Timeline estimates
- Terms and conditions
- Professional formatting

Make it comprehensive and ready to send to the customer.`,

      invoice: `Generate a professional construction invoice for the following completed work:

Project Details: ${projectDetails}
Customer Information: ${customerInfo}

Include:
- Invoice number and date
- Detailed services provided
- Itemized costs
- Tax calculations
- Payment terms
- Professional formatting`,

      proposal: `Generate a comprehensive project proposal for:

Project Details: ${projectDetails}
Customer Information: ${customerInfo}

Include:
- Executive summary
- Project overview and approach
- Timeline and milestones
- Team and qualifications
- Investment breakdown
- Next steps`,

      report: `Generate a job completion report for:

Project Details: ${projectDetails}
Customer Information: ${customerInfo}

Include:
- Work summary
- Quality metrics
- Materials used
- Timeline performance
- Customer feedback
- Recommendations`
    };

    return prompts[type];
  }

  async synthesizeVoice(request: VoiceRequest): Promise<Blob> {
    if (!this.config.elevenlabsApiKey) {
      throw new Error('ElevenLabs API key not configured');
    }

    this.incrementUsage('voiceSynthesis');

    try {
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${request.voiceId || 'pNInz6obpgDQGcFmaJgB'}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.elevenlabsApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: request.text,
          model_id: request.model || 'eleven_monolingual_v1',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.5
          }
        }),
      });

      if (!response.ok) {
        throw new Error(`ElevenLabs API error: ${response.statusText}`);
      }

      return await response.blob();
    } catch (error) {
      console.error('Voice synthesis error:', error);
      throw error;
    }
  }

  async generatePrediction(request: PredictionRequest): Promise<any> {
    if (!this.config.openaiApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    this.incrementUsage('predictions');

    const prompt = this.getPredictionPrompt(request);

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.openaiApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.2,
          max_tokens: 1500
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.statusText}`);
      }

      const data = await response.json();
      return JSON.parse(data.choices[0].message.content);
    } catch (error) {
      console.error('Prediction error:', error);
      throw error;
    }
  }

  private getPredictionPrompt(request: PredictionRequest): string {
    const { type, data, timeframe } = request;
    
    return `As a construction business analyst, analyze the following data and provide a JSON prediction for ${timeframe}:

Type: ${type}
Data: ${JSON.stringify(data)}

Return a JSON object with:
- prediction: numerical value or percentage
- confidence: confidence level (0-100)
- trend: "up", "down", or "stable"
- insights: array of key insights
- recommendations: array of actionable recommendations
- factors: array of influencing factors

Focus on construction industry specifics and practical business insights.`;
  }

  isConfigured(): boolean {
    return !!(this.config.openaiApiKey);
  }

  isVoiceEnabled(): boolean {
    return !!(this.config.elevenlabsApiKey);
  }
}

export const aiService = new AIService();
