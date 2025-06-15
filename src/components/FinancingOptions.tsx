
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Calculator, DollarSign, Calendar, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FinancingOption {
  id: string;
  name: string;
  provider: string;
  minAmount: number;
  maxAmount: number;
  terms: string[];
  apr: string;
  status: 'active' | 'inactive';
  processingTime: string;
}

const financingProviders: FinancingOption[] = [
  {
    id: '1',
    name: 'Home Improvement Financing',
    provider: 'Synchrony Financial',
    minAmount: 1000,
    maxAmount: 65000,
    terms: ['6 months', '12 months', '24 months', '60 months'],
    apr: '0% - 26.99%',
    status: 'active',
    processingTime: '2-3 business days'
  },
  {
    id: '2',
    name: 'Project Financing',
    provider: 'GreenSky',
    minAmount: 500,
    maxAmount: 55000,
    terms: ['12 months', '24 months', '36 months', '84 months'],
    apr: '7.99% - 24.99%',
    status: 'active',
    processingTime: '1-2 business days'
  },
  {
    id: '3',
    name: 'Quick Approval Loans',
    provider: 'Affirm',
    minAmount: 100,
    maxAmount: 17500,
    terms: ['3 months', '6 months', '12 months', '24 months'],
    apr: '0% - 30%',
    status: 'active',
    processingTime: 'Instant approval'
  },
  {
    id: '4',
    name: 'Construction Loans',
    provider: 'LightStream',
    minAmount: 5000,
    maxAmount: 100000,
    terms: ['24 months', '36 months', '60 months', '84 months'],
    apr: '6.99% - 25.49%',
    status: 'inactive',
    processingTime: '1-3 business days'
  }
];

export const FinancingOptions = () => {
  const { toast } = useToast();
  const [providers] = useState<FinancingOption[]>(financingProviders);
  const [calculatorData, setCalculatorData] = useState({
    loanAmount: '',
    term: '12',
    rate: '8.99'
  });

  const calculateMonthlyPayment = () => {
    const principal = parseFloat(calculatorData.loanAmount);
    const monthlyRate = parseFloat(calculatorData.rate) / 100 / 12;
    const months = parseInt(calculatorData.term);

    if (principal && monthlyRate && months) {
      const payment = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                     (Math.pow(1 + monthlyRate, months) - 1);
      return payment.toFixed(2);
    }
    return '0.00';
  };

  const handleApplyForFinancing = (providerId: string) => {
    const provider = providers.find(p => p.id === providerId);
    console.log('Applying for financing with:', provider?.name);
    
    toast({
      title: "Financing Application",
      description: `Redirecting to ${provider?.name} application portal...`,
    });
  };

  const toggleProviderStatus = (providerId: string) => {
    const provider = providers.find(p => p.id === providerId);
    toast({
      title: "Provider Status Updated",
      description: `${provider?.name} has been ${provider?.status === 'active' ? 'deactivated' : 'activated'}`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Financing Options</h2>
        <Button variant="outline">
          <Calculator className="h-4 w-4 mr-2" />
          Financing Calculator
        </Button>
      </div>

      {/* Financing Calculator */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Payment Calculator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div className="space-y-2">
              <Label htmlFor="loanAmount">Loan Amount ($)</Label>
              <Input
                id="loanAmount"
                type="number"
                value={calculatorData.loanAmount}
                onChange={(e) => setCalculatorData(prev => ({ ...prev, loanAmount: e.target.value }))}
                placeholder="10000"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="term">Term (months)</Label>
              <select
                id="term"
                value={calculatorData.term}
                onChange={(e) => setCalculatorData(prev => ({ ...prev, term: e.target.value }))}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="6">6 months</option>
                <option value="12">12 months</option>
                <option value="24">24 months</option>
                <option value="36">36 months</option>
                <option value="60">60 months</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="rate">Interest Rate (%)</Label>
              <Input
                id="rate"
                type="number"
                step="0.01"
                value={calculatorData.rate}
                onChange={(e) => setCalculatorData(prev => ({ ...prev, rate: e.target.value }))}
                placeholder="8.99"
              />
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-sm text-muted-foreground">Monthly Payment</div>
              <div className="text-2xl font-bold text-blue-600">
                ${calculateMonthlyPayment()}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Available Financing Providers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {providers.map((provider) => (
          <Card key={provider.id} className={provider.status === 'inactive' ? 'opacity-60' : ''}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{provider.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{provider.provider}</p>
                </div>
                <Badge 
                  variant={provider.status === 'active' ? 'default' : 'secondary'}
                  className={provider.status === 'active' ? 'bg-green-100 text-green-800' : ''}
                >
                  {provider.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Loan Range:</span>
                  <div className="font-medium">
                    ${provider.minAmount.toLocaleString()} - ${provider.maxAmount.toLocaleString()}
                  </div>
                </div>
                <div>
                  <span className="text-muted-foreground">APR:</span>
                  <div className="font-medium">{provider.apr}</div>
                </div>
              </div>

              <div>
                <span className="text-muted-foreground text-sm">Available Terms:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {provider.terms.map((term, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {term}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Processing:</span>
                <span>{provider.processingTime}</span>
              </div>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => handleApplyForFinancing(provider.id)}
                  disabled={provider.status === 'inactive'}
                  className="flex-1"
                >
                  Apply Now
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleProviderStatus(provider.id)}
                >
                  {provider.status === 'active' ? 'Disable' : 'Enable'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Customer Financing Applications */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Financing Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <div className="font-medium">John Smith - Kitchen Renovation</div>
                  <div className="text-sm text-muted-foreground">$15,000 • 24 months • Synchrony Financial</div>
                </div>
              </div>
              <div className="text-right">
                <Badge className="bg-green-100 text-green-800">Approved</Badge>
                <div className="text-sm text-muted-foreground mt-1">2 days ago</div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-yellow-600" />
                <div>
                  <div className="font-medium">Sarah Johnson - Bathroom Remodel</div>
                  <div className="text-sm text-muted-foreground">$8,500 • 12 months • GreenSky</div>
                </div>
              </div>
              <div className="text-right">
                <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
                <div className="text-sm text-muted-foreground mt-1">1 day ago</div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-red-600" />
                <div>
                  <div className="font-medium">Mike Wilson - Deck Construction</div>
                  <div className="text-sm text-muted-foreground">$12,000 • 36 months • Affirm</div>
                </div>
              </div>
              <div className="text-right">
                <Badge className="bg-red-100 text-red-800">Declined</Badge>
                <div className="text-sm text-muted-foreground mt-1">3 days ago</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
