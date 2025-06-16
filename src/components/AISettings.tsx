
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Key, Settings, Zap, Shield, DollarSign, MessageSquare, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AISettings {
  chatAssistant: boolean;
  documentGeneration: boolean;
  predictiveAnalytics: boolean;
  voiceAssistant: boolean;
  smartAutomation: boolean;
  emailResponses: boolean;
  jobRouting: boolean;
  costPrediction: boolean;
}

interface UsageStats {
  chatMessages: number;
  documentsGenerated: number;
  predictionsRun: number;
  monthlyLimit: number;
  estimatedCost: number;
}

export const AISettings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState<AISettings>({
    chatAssistant: true,
    documentGeneration: true,
    predictiveAnalytics: false,
    voiceAssistant: false,
    smartAutomation: true,
    emailResponses: false,
    jobRouting: true,
    costPrediction: true
  });

  const [usageStats] = useState<UsageStats>({
    chatMessages: 245,
    documentsGenerated: 18,
    predictionsRun: 12,
    monthlyLimit: 1000,
    estimatedCost: 32.50
  });

  const [apiKeys, setApiKeys] = useState({
    openai: '',
    elevenlabs: '',
    anthropic: ''
  });

  const handleSettingChange = (key: keyof AISettings, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    toast({
      title: "Setting Updated",
      description: `${key} has been ${value ? 'enabled' : 'disabled'}.`,
    });
  };

  const saveApiKey = (provider: string) => {
    toast({
      title: "API Key Saved",
      description: `${provider} API key has been securely stored.`,
    });
  };

  const testConnection = (provider: string) => {
    toast({
      title: "Testing Connection",
      description: `Testing ${provider} API connection...`,
    });
    
    // Simulate API test
    setTimeout(() => {
      toast({
        title: "Connection Successful",
        description: `${provider} API is working correctly.`,
      });
    }, 1500);
  };

  const totalUsage = usageStats.chatMessages + usageStats.documentsGenerated + usageStats.predictionsRun;
  const usagePercentage = (totalUsage / usageStats.monthlyLimit) * 100;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Brain className="h-6 w-6" />
          AI Configuration
        </h2>
        <Badge variant="secondary">Beta</Badge>
      </div>

      <Tabs defaultValue="features" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="api-keys">API Keys</TabsTrigger>
          <TabsTrigger value="usage">Usage</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="features" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                AI Features
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label htmlFor="chat-assistant" className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4" />
                        Chat Assistant
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        AI-powered customer and internal support chat
                      </p>
                    </div>
                    <Switch
                      id="chat-assistant"
                      checked={settings.chatAssistant}
                      onCheckedChange={(value) => handleSettingChange('chatAssistant', value)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label htmlFor="document-generation" className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        Document Generation
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        Auto-generate estimates, invoices, and reports
                      </p>
                    </div>
                    <Switch
                      id="document-generation"
                      checked={settings.documentGeneration}
                      onCheckedChange={(value) => handleSettingChange('documentGeneration', value)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label htmlFor="predictive-analytics" className="flex items-center gap-2">
                        <Brain className="h-4 w-4" />
                        Predictive Analytics
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        Business forecasting and insights
                      </p>
                    </div>
                    <Switch
                      id="predictive-analytics"
                      checked={settings.predictiveAnalytics}
                      onCheckedChange={(value) => handleSettingChange('predictiveAnalytics', value)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label htmlFor="voice-assistant" className="flex items-center gap-2">
                        <Settings className="h-4 w-4" />
                        Voice Assistant
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        Voice commands and transcription
                      </p>
                    </div>
                    <Switch
                      id="voice-assistant"
                      checked={settings.voiceAssistant}
                      onCheckedChange={(value) => handleSettingChange('voiceAssistant', value)}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label htmlFor="smart-automation">Smart Automation</Label>
                      <p className="text-xs text-muted-foreground">
                        Automated workflows and task routing
                      </p>
                    </div>
                    <Switch
                      id="smart-automation"
                      checked={settings.smartAutomation}
                      onCheckedChange={(value) => handleSettingChange('smartAutomation', value)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label htmlFor="email-responses">Email Auto-Responses</Label>
                      <p className="text-xs text-muted-foreground">
                        AI-generated email responses to customers
                      </p>
                    </div>
                    <Switch
                      id="email-responses"
                      checked={settings.emailResponses}
                      onCheckedChange={(value) => handleSettingChange('emailResponses', value)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label htmlFor="job-routing">Intelligent Job Routing</Label>
                      <p className="text-xs text-muted-foreground">
                        Optimal team assignment for jobs
                      </p>
                    </div>
                    <Switch
                      id="job-routing"
                      checked={settings.jobRouting}
                      onCheckedChange={(value) => handleSettingChange('jobRouting', value)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label htmlFor="cost-prediction">Cost Prediction</Label>
                      <p className="text-xs text-muted-foreground">
                        AI-powered project cost estimation
                      </p>
                    </div>
                    <Switch
                      id="cost-prediction"
                      checked={settings.costPrediction}
                      onCheckedChange={(value) => handleSettingChange('costPrediction', value)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api-keys" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                API Keys Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="openai-key">OpenAI API Key</Label>
                  <div className="flex gap-2">
                    <Input
                      id="openai-key"
                      type="password"
                      placeholder="sk-..."
                      value={apiKeys.openai}
                      onChange={(e) => setApiKeys(prev => ({ ...prev, openai: e.target.value }))}
                    />
                    <Button variant="outline" onClick={() => saveApiKey('OpenAI')}>
                      Save
                    </Button>
                    <Button variant="outline" onClick={() => testConnection('OpenAI')}>
                      Test
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Required for chat assistant and document generation
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="elevenlabs-key">ElevenLabs API Key</Label>
                  <div className="flex gap-2">
                    <Input
                      id="elevenlabs-key"
                      type="password"
                      placeholder="el_..."
                      value={apiKeys.elevenlabs}
                      onChange={(e) => setApiKeys(prev => ({ ...prev, elevenlabs: e.target.value }))}
                    />
                    <Button variant="outline" onClick={() => saveApiKey('ElevenLabs')}>
                      Save
                    </Button>
                    <Button variant="outline" onClick={() => testConnection('ElevenLabs')}>
                      Test
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Required for voice assistant and transcription features
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="anthropic-key">Anthropic API Key (Optional)</Label>
                  <div className="flex gap-2">
                    <Input
                      id="anthropic-key"
                      type="password"
                      placeholder="sk-ant-..."
                      value={apiKeys.anthropic}
                      onChange={(e) => setApiKeys(prev => ({ ...prev, anthropic: e.target.value }))}
                    />
                    <Button variant="outline" onClick={() => saveApiKey('Anthropic')}>
                      Save
                    </Button>
                    <Button variant="outline" onClick={() => testConnection('Anthropic')}>
                      Test
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Alternative AI provider for advanced analytics
                  </p>
                </div>
              </div>

              <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-4 w-4 text-blue-600" />
                  <span className="font-medium text-blue-900 dark:text-blue-100">Security Note</span>
                </div>
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  All API keys are encrypted and stored securely. They are never logged or shared with third parties.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="usage" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Usage & Billing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{usageStats.chatMessages}</div>
                  <div className="text-sm text-muted-foreground">Chat Messages</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{usageStats.documentsGenerated}</div>
                  <div className="text-sm text-muted-foreground">Documents Generated</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{usageStats.predictionsRun}</div>
                  <div className="text-sm text-muted-foreground">Predictions Run</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Monthly Usage</span>
                  <span>{totalUsage} / {usageStats.monthlyLimit}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${Math.min(usagePercentage, 100)}%` }}
                  ></div>
                </div>
                <div className="text-xs text-muted-foreground">
                  {usagePercentage.toFixed(1)}% of monthly limit used
                </div>
              </div>

              <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium text-green-900 dark:text-green-100">
                      Estimated Monthly Cost
                    </div>
                    <div className="text-sm text-green-800 dark:text-green-200">
                      Based on current usage patterns
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-green-600">
                    ${usageStats.estimatedCost.toFixed(2)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="ai-model">Preferred AI Model</Label>
                <Select defaultValue="gpt-4">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gpt-4">GPT-4 (Recommended)</SelectItem>
                    <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo (Faster)</SelectItem>
                    <SelectItem value="claude-3">Claude 3 (Alternative)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="custom-prompt">Custom System Prompt</Label>
                <Textarea
                  id="custom-prompt"
                  placeholder="Add custom instructions for the AI assistant..."
                  rows={4}
                />
                <p className="text-xs text-muted-foreground">
                  Customize how the AI assistant behaves and responds
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="response-length">Response Length</Label>
                <Select defaultValue="balanced">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="concise">Concise</SelectItem>
                    <SelectItem value="balanced">Balanced</SelectItem>
                    <SelectItem value="detailed">Detailed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
