import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  Calendar,
  DollarSign,
  BarChart3,
  MapPin,
  FileText,
  Shield,
  Smartphone,
  Clock,
} from "lucide-react";

export const LandingFeatures = () => {
  const features = [
    {
      icon: Users,
      title: "Customer Management",
      description:
        "Manage customer relationships, track interactions, and build lasting partnerships with comprehensive CRM tools.",
    },
    {
      icon: Calendar,
      title: "Project Scheduling",
      description:
        "Schedule jobs, assign teams, track progress, and manage deadlines with our intuitive scheduling system.",
    },
    {
      icon: DollarSign,
      title: "Financial Management",
      description:
        "Create estimates, send invoices, track payments, and manage your finances with integrated accounting tools.",
    },
    {
      icon: BarChart3,
      title: "Analytics & Reports",
      description:
        "Get insights into your business performance with detailed reports, KPIs, and predictive analytics.",
    },
    {
      icon: MapPin,
      title: "GPS Tracking",
      description:
        "Track your team's location, optimize routes, and manage job sites with real-time GPS tracking.",
    },
    {
      icon: FileText,
      title: "Document Management",
      description:
        "Store, organize, and share project documents, contracts, and photos in one secure location.",
    },
    {
      icon: Shield,
      title: "Security & Compliance",
      description:
        "Enterprise-grade security with role-based access control and compliance with industry standards.",
    },
    {
      icon: Smartphone,
      title: "Mobile App",
      description:
        "Access all features on-the-go with our native mobile apps for iOS and Android devices.",
    },
    {
      icon: Clock,
      title: "Time Tracking",
      description:
        "Track work hours, manage timesheets, and calculate payroll with automated time tracking tools.",
    },
  ];

  return (
    <section id="features" className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Everything You Need to
            <span className="block bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              Manage Your Business
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Comprehensive tools designed specifically for construction
            professionals to streamline operations and grow their business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="bg-slate-800/80 border-slate-700 hover:border-slate-600 transition-all duration-300 hover:scale-105"
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-400">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
