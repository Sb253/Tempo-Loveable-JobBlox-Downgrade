
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

export const LandingPricing = () => {
  const navigate = useNavigate();

  const plans = [
    {
      name: "Trial",
      price: "Free",
      period: "14 days",
      description: "Perfect for testing all features",
      features: ["Up to 10 clients", "All premium features", "24/7 support", "No credit card required"],
      cta: "Start Free Trial",
      popular: false,
      action: () => navigate('/auth')
    },
    {
      name: "Professional",
      price: "$99",
      period: "per month",
      description: "For growing businesses",
      features: ["Unlimited clients", "Advanced analytics", "API integrations", "Priority support", "Custom branding"],
      cta: "Get Started",
      popular: true,
      action: () => navigate('/auth')
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "contact us",
      description: "For large organizations",
      features: ["Everything in Pro", "Dedicated support", "Custom integrations", "SLA guarantee", "On-premise option"],
      cta: "Contact Sales",
      popular: false,
      action: () => navigate('/auth')
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">
            Choose Your Plan
          </h2>
          <p className="text-xl text-slate-300">
            Flexible pricing that grows with your business
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative bg-slate-800/60 border-slate-700 hover:border-slate-600 transition-all duration-300 ${
                plan.popular ? 'ring-2 ring-blue-600 scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-blue-600 text-white">Most Popular</Badge>
                </div>
              )}
              
              <CardHeader className="text-center">
                <CardTitle className="text-white text-2xl">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-slate-400 ml-2">/{plan.period}</span>
                </div>
                <p className="text-slate-400 mt-2">{plan.description}</p>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-slate-300">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full ${
                    plan.popular 
                      ? 'bg-blue-600 hover:bg-blue-700' 
                      : 'bg-slate-700 hover:bg-slate-600'
                  }`}
                  onClick={plan.action}
                >
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
