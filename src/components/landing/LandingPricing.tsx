import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const LandingPricing = () => {
  const navigate = useNavigate();

  const plans = [
    {
      name: "Starter",
      price: "$29",
      period: "per month",
      description: "Perfect for small contractors",
      features: [
        "Up to 5 projects",
        "Basic customer management",
        "Simple scheduling",
        "Email support",
        "Mobile app access",
      ],
      popular: false,
    },
    {
      name: "Professional",
      price: "$79",
      period: "per month",
      description: "Best for growing businesses",
      features: [
        "Unlimited projects",
        "Advanced CRM",
        "Team management",
        "Financial reporting",
        "GPS tracking",
        "Priority support",
        "API access",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "$199",
      period: "per month",
      description: "For large construction companies",
      features: [
        "Everything in Professional",
        "Multi-location support",
        "Advanced analytics",
        "Custom integrations",
        "Dedicated account manager",
        "24/7 phone support",
        "Custom training",
      ],
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Simple, Transparent
            <span className="block bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Pricing
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Choose the plan that fits your business needs. All plans include a
            14-day free trial.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative bg-slate-800/80 border-slate-700 hover:border-slate-600 transition-all duration-300 ${
                plan.popular ? "ring-2 ring-blue-500 scale-105" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1">
                    <Star className="h-3 w-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center">
                <CardTitle className="text-white text-xl">
                  {plan.name}
                </CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-white">
                    {plan.price}
                  </span>
                  <span className="text-slate-400 ml-2">{plan.period}</span>
                </div>
                <p className="text-slate-400 mt-2">{plan.description}</p>
              </CardHeader>

              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <Check className="h-4 w-4 text-green-400 flex-shrink-0" />
                      <span className="text-slate-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full ${
                    plan.popular
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      : "bg-slate-700 hover:bg-slate-600 text-white"
                  }`}
                  onClick={() => navigate("/")}
                >
                  Start Free Trial
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-slate-400 mb-4">
            All plans include 14-day free trial • No credit card required •
            Cancel anytime
          </p>
          <Button
            variant="outline"
            className="border-slate-600 text-slate-300 hover:bg-slate-800"
          >
            Contact Sales for Custom Plans
          </Button>
        </div>
      </div>
    </section>
  );
};
