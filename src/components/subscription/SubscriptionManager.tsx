
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { CreditCard, Calendar, DollarSign, Users, ArrowUp, ArrowDown } from "lucide-react";

interface SubscriptionManagerProps {
  tenant: {
    id: string;
    name: string;
    plan: string;
    status: string;
    subscriptionEnd?: string;
    trialEnd?: string;
  };
}

const plans = [
  {
    id: 'basic',
    name: 'Basic',
    price: 29,
    features: ['Up to 10 clients', 'Basic reporting', 'Email support'],
    maxClients: 10
  },
  {
    id: 'professional',
    name: 'Professional',
    price: 79,
    features: ['Up to 50 clients', 'Advanced reporting', 'Priority support', 'API access'],
    maxClients: 50
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 199,
    features: ['Unlimited clients', 'Custom reporting', '24/7 support', 'Full API access', 'White-label'],
    maxClients: -1
  }
];

export const SubscriptionManager = ({ tenant }: SubscriptionManagerProps) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const currentPlan = plans.find(p => p.id === tenant.plan) || plans[0];

  const getPlanPrice = (plan: typeof plans[0]) => {
    return billingCycle === 'yearly' ? Math.floor(plan.price * 10) : plan.price;
  };

  const isCurrentPlan = (planId: string) => planId === tenant.plan;

  return (
    <div className="space-y-6">
      {/* Current Subscription */}
      <Card>
        <CardHeader>
          <CardTitle>Current Subscription</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">{currentPlan.name} Plan</h3>
              <p className="text-muted-foreground">
                ${getPlanPrice(currentPlan)}/{billingCycle === 'monthly' ? 'month' : 'year'}
              </p>
            </div>
            <Badge variant={tenant.status === 'active' ? 'default' : 'secondary'}>
              {tenant.status.charAt(0).toUpperCase() + tenant.status.slice(1)}
            </Badge>
          </div>

          {tenant.subscriptionEnd && (
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Billing Period</span>
                <span>Renews: {tenant.subscriptionEnd}</span>
              </div>
              <Progress value={65} className="h-2" />
              <p className="text-sm text-muted-foreground mt-1">
                23 days remaining in current period
              </p>
            </div>
          )}

          <div className="flex gap-2">
            <Button variant="outline">
              <CreditCard className="h-4 w-4 mr-2" />
              Update Payment Method
            </Button>
            <Button variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              View Billing History
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Billing Cycle Toggle */}
      <Card>
        <CardHeader>
          <CardTitle>Billing Options</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Annual Billing</h3>
              <p className="text-sm text-muted-foreground">
                Save 20% with annual billing
              </p>
            </div>
            <Switch
              checked={billingCycle === 'yearly'}
              onCheckedChange={(checked) => setBillingCycle(checked ? 'yearly' : 'monthly')}
            />
          </div>
        </CardContent>
      </Card>

      {/* Plan Selection */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Available Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <Card key={plan.id} className={`relative ${isCurrentPlan(plan.id) ? 'ring-2 ring-blue-500' : ''}`}>
              {isCurrentPlan(plan.id) && (
                <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-blue-500">
                  Current Plan
                </Badge>
              )}
              
              <CardHeader className="text-center">
                <CardTitle>{plan.name}</CardTitle>
                <div className="text-3xl font-bold">
                  ${getPlanPrice(plan)}
                  <span className="text-sm font-normal text-muted-foreground">
                    /{billingCycle === 'monthly' ? 'mo' : 'yr'}
                  </span>
                </div>
                {billingCycle === 'yearly' && (
                  <Badge variant="outline" className="bg-green-50 text-green-700">
                    Save 20%
                  </Badge>
                )}
              </CardHeader>
              
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <div className="space-y-2">
                  {isCurrentPlan(plan.id) ? (
                    <Button variant="outline" className="w-full" disabled>
                      Current Plan
                    </Button>
                  ) : plan.price > currentPlan.price ? (
                    <Button className="w-full">
                      <ArrowUp className="h-4 w-4 mr-2" />
                      Upgrade to {plan.name}
                    </Button>
                  ) : (
                    <Button variant="outline" className="w-full">
                      <ArrowDown className="h-4 w-4 mr-2" />
                      Downgrade to {plan.name}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Usage Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Usage & Limits</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Clients</span>
                <span>15 / {currentPlan.maxClients === -1 ? '∞' : currentPlan.maxClients}</span>
              </div>
              <Progress 
                value={currentPlan.maxClients === -1 ? 0 : (15 / currentPlan.maxClients) * 100} 
                className="h-2" 
              />
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>API Calls (This Month)</span>
                <span>2,450 / 10,000</span>
              </div>
              <Progress value={24.5} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Storage Used</span>
                <span>1.2 GB / 5 GB</span>
              </div>
              <Progress value={24} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
