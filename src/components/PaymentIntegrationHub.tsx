
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  CreditCard, 
  DollarSign, 
  Smartphone, 
  Globe, 
  CheckCircle, 
  AlertCircle,
  Settings,
  Link,
  Zap,
  Shield,
  Receipt,
  TrendingUp,
  Calendar,
  Users
} from "lucide-react";

interface PaymentProvider {
  id: string;
  name: string;
  type: string;
  status: 'connected' | 'disconnected' | 'setup-required';
  fees: string;
  features: string[];
  icon: string;
  color: string;
}

interface PaymentMethod {
  id: string;
  type: string;
  name: string;
  isEnabled: boolean;
  fees: string;
  processingTime: string;
}

const paymentProviders: PaymentProvider[] = [
  {
    id: 'stripe',
    name: 'Stripe',
    type: 'Credit Cards & Online',
    status: 'connected',
    fees: '2.9% + $0.30',
    features: ['Credit Cards', 'ACH', 'Apple Pay', 'Google Pay', 'Recurring Billing'],
    icon: '💳',
    color: 'blue'
  },
  {
    id: 'quickbooks',
    name: 'QuickBooks Payments',
    type: 'Accounting Integration',
    status: 'connected',
    fees: '2.9% + $0.25',
    features: ['Credit Cards', 'ACH', 'QuickBooks Sync', 'Invoicing'],
    icon: '📊',
    color: 'green'
  },
  {
    id: 'square',
    name: 'Square',
    type: 'In-Person & Online',
    status: 'setup-required',
    fees: '2.6% + $0.10',
    features: ['In-Person', 'Online', 'Invoicing', 'Mobile App'],
    icon: '⚡',
    color: 'purple'
  },
  {
    id: 'paypal',
    name: 'PayPal',
    type: 'Digital Payments',
    status: 'disconnected',
    fees: '3.49% + $0.49',
    features: ['PayPal', 'Credit Cards', 'Digital Wallets'],
    icon: '🌐',
    color: 'yellow'
  }
];

const paymentMethods: PaymentMethod[] = [
  {
    id: 'credit-card',
    type: 'Credit Card',
    name: 'Visa, Mastercard, Amex',
    isEnabled: true,
    fees: '2.9% + $0.30',
    processingTime: 'Instant'
  },
  {
    id: 'ach',
    type: 'Bank Transfer',
    name: 'ACH Bank Transfer',
    isEnabled: true,
    fees: '0.8%',
    processingTime: '1-3 business days'
  },
  {
    id: 'apple-pay',
    type: 'Digital Wallet',
    name: 'Apple Pay',
    isEnabled: true,
    fees: '2.9% + $0.30',
    processingTime: 'Instant'
  },
  {
    id: 'google-pay',
    type: 'Digital Wallet',
    name: 'Google Pay',
    isEnabled: false,
    fees: '2.9% + $0.30',
    processingTime: 'Instant'
  },
  {
    id: 'check',
    type: 'Traditional',
    name: 'Check Payment',
    isEnabled: true,
    fees: 'Free',
    processingTime: '3-5 business days'
  }
];

const recentTransactions = [
  {
    id: '1',
    customer: 'John Smith',
    amount: 2500,
    method: 'Credit Card',
    status: 'completed',
    date: '2024-12-15',
    fee: 75.25
  },
  {
    id: '2',
    customer: 'ABC Corp',
    amount: 4800,
    method: 'ACH Transfer',
    status: 'pending',
    date: '2024-12-14',
    fee: 38.40
  },
  {
    id: '3',
    customer: 'Sarah Johnson',
    amount: 1200,
    method: 'Apple Pay',
    status: 'completed',
    date: '2024-12-13',
    fee: 36.30
  }
];

export const PaymentIntegrationHub = () => {
  const { toast } = useToast();
  const [providers, setProviders] = useState(paymentProviders);
  const [methods, setMethods] = useState(paymentMethods);
  const [autoProcessing, setAutoProcessing] = useState(true);
  const [sendReceipts, setSendReceipts] = useState(true);

  const handleConnect = (providerId: string) => {
    setProviders(prev => prev.map(provider => 
      provider.id === providerId 
        ? { ...provider, status: 'connected' as const }
        : provider
    ));

    toast({
      title: "Provider Connected",
      description: `Successfully connected to ${providers.find(p => p.id === providerId)?.name}`,
    });
  };

  const handleDisconnect = (providerId: string) => {
    setProviders(prev => prev.map(provider => 
      provider.id === providerId 
        ? { ...provider, status: 'disconnected' as const }
        : provider
    ));

    toast({
      title: "Provider Disconnected",
      description: `Disconnected from ${providers.find(p => p.id === providerId)?.name}`,
    });
  };

  const togglePaymentMethod = (methodId: string) => {
    setMethods(prev => prev.map(method =>
      method.id === methodId
        ? { ...method, isEnabled: !method.isEnabled }
        : method
    ));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'setup-required': return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      default: return <AlertCircle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'bg-green-100 text-green-800';
      case 'setup-required': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const connectedProviders = providers.filter(p => p.status === 'connected').length;
  const totalTransactionVolume = recentTransactions.reduce((sum, t) => sum + t.amount, 0);
  const totalFees = recentTransactions.reduce((sum, t) => sum + t.fee, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Payment Integration Hub</h2>
        <div className="flex gap-2">
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Button>
            <Link className="h-4 w-4 mr-2" />
            Add Integration
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Connected Providers</CardTitle>
            <Link className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{connectedProviders}</div>
            <div className="text-xs text-muted-foreground">
              {providers.length} total providers
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transaction Volume</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalTransactionVolume.toLocaleString()}</div>
            <div className="text-xs text-green-600 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12% this month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Processing Fees</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalFees.toFixed(2)}</div>
            <div className="text-xs text-muted-foreground">
              {((totalFees / totalTransactionVolume) * 100).toFixed(2)}% of volume
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98.5%</div>
            <div className="text-xs text-green-600">
              Above industry average
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="providers" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="providers">Providers</TabsTrigger>
          <TabsTrigger value="methods">Payment Methods</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="providers" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {providers.map((provider) => (
              <Card key={provider.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{provider.icon}</span>
                      <div>
                        <h3 className="font-semibold">{provider.name}</h3>
                        <p className="text-sm text-muted-foreground">{provider.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(provider.status)}
                      <Badge className={getStatusColor(provider.status)}>
                        {provider.status.replace('-', ' ')}
                      </Badge>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Processing fees: </span>
                    <span className="font-medium">{provider.fees}</span>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-2">Features:</p>
                    <div className="flex flex-wrap gap-1">
                      {provider.features.map((feature, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {provider.status === 'connected' ? (
                      <>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Settings className="h-4 w-4 mr-2" />
                          Configure
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleDisconnect(provider.id)}
                        >
                          Disconnect
                        </Button>
                      </>
                    ) : (
                      <Button 
                        size="sm" 
                        className="flex-1"
                        onClick={() => handleConnect(provider.id)}
                      >
                        <Link className="h-4 w-4 mr-2" />
                        {provider.status === 'setup-required' ? 'Complete Setup' : 'Connect'}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="methods" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Available Payment Methods</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {methods.map((method) => (
                  <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <Switch
                        checked={method.isEnabled}
                        onCheckedChange={() => togglePaymentMethod(method.id)}
                      />
                      <div>
                        <h4 className="font-medium">{method.name}</h4>
                        <p className="text-sm text-muted-foreground">{method.type}</p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-sm font-medium">{method.fees}</div>
                      <div className="text-xs text-muted-foreground">{method.processingTime}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{transaction.customer}</h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {transaction.date}
                        <span>•</span>
                        {transaction.method}
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="font-semibold">${transaction.amount.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">
                        Fee: ${transaction.fee.toFixed(2)}
                      </div>
                    </div>
                    
                    <Badge className={
                      transaction.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }>
                      {transaction.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Processing Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="autoProcessing">Auto-process payments</Label>
                    <p className="text-sm text-muted-foreground">Automatically process approved payments</p>
                  </div>
                  <Switch
                    id="autoProcessing"
                    checked={autoProcessing}
                    onCheckedChange={setAutoProcessing}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="sendReceipts">Send email receipts</Label>
                    <p className="text-sm text-muted-foreground">Automatically send receipts to customers</p>
                  </div>
                  <Switch
                    id="sendReceipts"
                    checked={sendReceipts}
                    onCheckedChange={setSendReceipts}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Default payment terms</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment terms" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Due Immediately</SelectItem>
                      <SelectItem value="net15">Net 15 Days</SelectItem>
                      <SelectItem value="net30">Net 30 Days</SelectItem>
                      <SelectItem value="net45">Net 45 Days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security & Compliance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <Shield className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium">PCI DSS Compliant</p>
                    <p className="text-sm text-muted-foreground">Your payments are secure</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium">SSL Encryption</p>
                    <p className="text-sm text-muted-foreground">All data is encrypted</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <Zap className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium">Real-time Fraud Detection</p>
                    <p className="text-sm text-muted-foreground">Advanced security monitoring</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
