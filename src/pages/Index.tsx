import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Building2,
  ArrowRight,
  Users,
  Calendar,
  DollarSign,
  BarChart3,
} from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Users,
      title: "Customer Management",
      description:
        "Manage your customers, track interactions, and build lasting relationships.",
    },
    {
      icon: Calendar,
      title: "Job Scheduling",
      description:
        "Schedule jobs, assign teams, and track progress in real-time.",
    },
    {
      icon: DollarSign,
      title: "Financial Management",
      description:
        "Create estimates, send invoices, and track payments seamlessly.",
    },
    {
      icon: BarChart3,
      title: "Analytics & Reports",
      description:
        "Get insights into your business performance with detailed reports.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Building2 className="h-12 w-12 text-primary" />
              <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                JobBlox
              </h1>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Professional Construction
              <span className="block bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                Management Platform
              </span>
            </h2>

            <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
              Streamline your construction business with our comprehensive
              management solution. From customer relationships to project
              completion, we've got you covered.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                onClick={() => navigate("/")}
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-slate-600 text-slate-300 hover:bg-slate-800"
                onClick={() => navigate("/developer")}
              >
                Developer Access
              </Button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="bg-slate-800/80 border-slate-700 hover:border-slate-600 transition-all duration-300"
                >
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-white">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-400">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* CTA Section */}
          <Card className="bg-slate-800/60 border-slate-700">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                Ready to Transform Your Construction Business?
              </h3>
              <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
                Join thousands of construction professionals who trust JobBlox
                to manage their operations efficiently.
              </p>
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
                onClick={() => navigate("/")}
              >
                Start Your Journey
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
