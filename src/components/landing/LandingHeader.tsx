import React from "react";
import { Button } from "@/components/ui/button";
import { Building2, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const LandingHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-6">
          <div className="flex items-center gap-3">
            <Building2 className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-white">JobBlox</h1>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-slate-300 hover:text-white transition-colors"
            >
              Features
            </a>
            <a
              href="#pricing"
              className="text-slate-300 hover:text-white transition-colors"
            >
              Pricing
            </a>
            <a
              href="#contact"
              className="text-slate-300 hover:text-white transition-colors"
            >
              Contact
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              className="text-slate-300 hover:text-white hidden sm:inline-flex"
              onClick={() => navigate("/auth")}
            >
              Sign In
            </Button>
            <Button
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-sm sm:text-base px-4 sm:px-6"
              onClick={() => navigate("/")}
            >
              Get Started
            </Button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-slate-300"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};
