
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Brain, Key, DollarSign, Shield, Zap, CheckCircle, AlertCircle, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { aiService, type AIServiceConfig } from "@/services/aiService";

export const EnhancedAISettings = () => {
  const { toast } = useToast();
  const [config, setConfig] = useState<AIServiceConfig>({});
  const [usageStats, setUsageStats] = useState(aiService.getUsageStats());
  const [testingConnection, setTestingConnection] = useState<string | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setConfig(aiService.getConfig());
    setUsageStats(aiService.getUsageStats());
    
    // Test existing connections
    testAllConnections();
  }, []);

  const handleConfigUpdate = (key: keyof AIServiceConfig, value: string) => {
    const newConfig = { ...config, [key]: value };
    setConfig(newConfig);
    aiService.updateConfig(newConfig);
  };

  const saveApiKey = (provider: string, key: keyof AIServiceConfig) => {
    if (!config[key]) {
      toast({
        title: "Missing API Key",
        description: `Please enter your ${provider} API key.`,
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "API Key Saved",
      description: `${provider} API key has been securely stored.`,
    });

    // Test the connection
    testConnection(provider, key);
  };

  const testConnection = async (provider: string, key: keyof AIServiceConfig) => {
    if (!config[key]) return;

    setTestingConnection(provider);
    
    try {
      // Simulate API test with actual endpoint
      if (key === 'openaiApiKey') {
        const response = await fetch('https://api.openai.com/v1/models', {
          headers: {
            'Authorization': `Bearer ${config[key]}`,
          },
        });
        
        if (response.ok) {
          setConnectionStatus(prev => ({ ...prev, [provider]: true }));
          toast({
            title: "Connection Successful",
            description: `${provider} API is working correctly.`,
          });
        } else {
          throw new Error('Invalid API key');
        }
      } else if (key === 'elevenlabsApiKey') {
        const response = await fetch('https://api.elevenlabs.io/v1/voices', {
          headers: {
            'Authorization': `Bearer ${config[key]}`,
          },
        });
        
        if (response.ok) {
          setConnectionStatus(prev => ({ ...prev, [provider]: true }));
          toast({
            title: "Connection Successful",
            description: `${provider} API is working correctly.`,
          });
        } else {
          throw new Error('Invalid API key');
        }
      }
    } catch (error) {
      setConnectionStatus(prev => ({ ...prev, [provider]: false }));
      toast({
        title: "Connection Failed",
        description: `${provider} API test failed. Please check your API key.`,
        variant: "destructive"
      });
    } finally {
      setTestingConnection(null);
    }
  };

  const testAllConnections = async () => {
    const currentConfig = aiService.getConfig();
    if (currentConfig.openaiApiKey) {
      await testConnection('OpenAI', 'openaiApiKey');
    }
    if (currentConfig.elevenlabsApiKey) {
      await testConnection('ElevenLabs', 'elevenlabsApiKey');
    }
  };

  const getConnectionIcon = (provider: string) => {
    if (testingConnection === provider) {
      return <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />;
    }
    
    const isConnected = connectionStatus[provider];
    if (isConnected === true) {
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    } else if (isConnected === false) {
      return <AlertCircle className="h-4 w-4 text-red-500" />;
    }
    
    return null;
  };

  const totalUsage = usageStats.chatMessages + usageStats.documentsGenerated + usageStats.voiceSynthesis + usageStats.predictions;
  const usagePercentage = Math.min((totalUsage / usageStats.monthlyLimit) * 100, 100);
  const estimatedCost = (usageStats.chatMessages * 0.02) + (usageStats.documentsGenerated * 0.05) + (usageStats.voiceSynthesis * 0.03) + (usageStats.predictions * 0.04);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Brain className="h-6 w-6" />
          Enhanced AI Configuration
        </h2>
        <Badge variant="secondary">GPT-4 Powered</Badge>
      </div>

      <Tabs defaultValue="api-keys" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="api-keys">API Keys</TabsTrigger>
          <TabsTrigger value="usage">Usage & Billing</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="api-keys" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                API Keys Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* OpenAI Configuration */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="openai-key" className="text-base font-medium">OpenAI API Key</Label>
                  {getConnectionIcon('OpenAI')}
                </div>
                <div className="flex gap-2">
                  <Input
                    id="openai-key"
                    type="password"
                    placeholder="sk-..."
                    value={config.openaiApiKey || ''}
                    onChange={(e) => handleConfigUpdate('openaiApiKey', e.target.value)}
                  />
                  <Button 
                    variant="outline" 
                    onClick={() => saveApiKey('OpenAI', 'openaiApiKey')}
                    disabled={testingConnection === 'OpenAI'}
                  >
                    Save & Test
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Required for chat assistant, document generation, and predictive analytics
                </p>
              </div>

              {/* ElevenLabs Configuration */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="elevenlabs-key" className="text-base font-medium">ElevenLabs API Key</Label>
                  {getConnectionIcon('ElevenLabs')}
                </div>
                <div className="flex gap-2">
                  <Input
                    id="elevenlabs-key"
                    type="password"
                    placeholder="el_..."
                    value={config.elevenlabsApiKey || ''}
                    onChange={(e) => handleConfigUpdate('elevenlabsApiKey', e.target.value)}
                  />
                  <Button 
                    variant="outline" 
                    onClick={() => saveApiKey('ElevenLabs', 'elevenlabsApiKey')}
                    disabled={testingConnection === 'ElevenLabs'}
                  >
                    Save & Test
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Required for voice synthesis and text-to-speech features
                </p>
              </div>

              {/* Anthropic Configuration */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="anthropic-key" className="text-base font-medium">Anthropic API Key (Optional)</Label>
                  {getConnectionIcon('Anthropic')}
                </div>
                <div className="flex gap-2">
                  <Input
                    id="anthropic-key"
                    type="password"
                    placeholder="sk-ant-..."
                    value={config.anthropicApiKey || ''}
                    onChange={(e) => handleConfigUpdate('anthropicApiKey', e.target.value)}
                  />
                  <Button 
                    variant="outline" 
                    onClick={() => saveApiKey('Anthropic', 'anthropicApiKey')}
                    disabled={testingConnection === 'Anthropic'}
                  >
                    Save & Test
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Alternative AI provider for specialized tasks and analysis
                </p>
              </div>

              <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-4 w-4 text-blue-600" />
                  <span className="font-medium text-blue-900 dark:text-blue-100">Security & Privacy</span>
                </div>
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  All API keys are encrypted and stored locally in your browser. They are never transmitted to our servers or shared with third parties.
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
                Usage Analytics & Cost Tracking
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Usage Overview */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{usageStats.chatMessages}</div>
                  <div className="text-sm text-muted-foreground">Chat Messages</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{usageStats.documentsGenerated}</div>
                  <div className="text-sm text-muted-foreground">Documents Generated</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{usageStats.voiceSynthesis}</div>
                  <div className="text-sm text-muted-foreground">Voice Synthesis</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">{usageStats.predictions}</div>
                  <div className="text-sm text-muted-foreground">AI Predictions</div>
                </div>
              </div>

              {/* Usage Progress */}
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Monthly Usage</span>
                  <span>{totalUsage} / {usageStats.monthlyLimit}</span>
                </div>
                <Progress value={usagePercentage} className="h-3" />
                <div className="text-xs text-muted-foreground">
                  {usagePercentage.toFixed(1)}% of monthly limit used
                </div>
              </div>

              {/* Cost Estimation */}
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
                    ${estimatedCost.toFixed(2)}
                  </div>
                </div>
              </div>

              {/* Usage Breakdown */}
              <div className="space-y-2">
                <h4 className="font-medium">Cost Breakdown</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Chat Messages ({usageStats.chatMessages} × $0.02)</span>
                    <span>${(usageStats.chatMessages * 0.02).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Document Generation ({usageStats.documentsGenerated} × $0.05)</span>
                    <span>${(usageStats.documentsGenerated * 0.05).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Voice Synthesis ({usageStats.voiceSynthesis} × $0.03)</span>
                    <span>${(usageStats.voiceSynthesis * 0.03).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>AI Predictions ({usageStats.predictions} × $0.04)</span>
                    <span>${(usageStats.predictions * 0.04).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="features" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                AI Feature Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <div className="font-medium">Enhanced Chat Assistant</div>
                    <div className="text-sm text-muted-foreground">
                      Context-aware AI chat with voice input and specialized modes
                    </div>
                  </div>
                  <Badge variant="default">Active</Badge>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <div className="font-medium">Smart Document Generation</div>
                    <div className="text-sm text-muted-foreground">
                      AI-powered estimates, invoices, and reports with image analysis
                    </div>
                  </div>
                  <Badge variant="default">Active</Badge>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <div className="font-medium">Predictive Analytics</div>
                    <div className="text-sm text-muted-foreground">
                      Business forecasting and intelligent insights
                    </div>
                  </div>
                  <Badge variant="default">Active</Badge>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <div className="font-medium">Voice Integration</div>
                    <div className="text-sm text-muted-foreground">
                      Text-to-speech and voice input capabilities
                    </div>
                  </div>
                  <Badge variant={config.elevenlabsApiKey ? "default" : "secondary"}>
                    {config.elevenlabsApiKey ? "Active" : "Configure API Key"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Advanced Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-yellow-50 dark:bg-yellow-950 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="h-4 w-4 text-yellow-600" />
                  <span className="font-medium text-yellow-900 dark:text-yellow-100">Beta Features</span>
                </div>
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  Advanced features are currently in development. Additional configuration options will be available in future updates.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Model Preferences</h4>
                  <p className="text-sm text-muted-foreground">
                    Currently using GPT-4 for optimal performance. Alternative models will be configurable in future releases.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Custom Training</h4>
                  <p className="text-sm text-muted-foreground">
                    AI model fine-tuning based on your business data will be available soon.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Integration Settings</h4>
                  <p className="text-sm text-muted-foreground">
                    Advanced third-party integrations and workflow automation coming soon.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
