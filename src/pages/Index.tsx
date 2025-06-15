
import { useState } from "react";
import { Dashboard } from "@/components/Dashboard";
import { MainNavigation } from "@/components/MainNavigation";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <MainNavigation />
      <div className="container mx-auto p-6">
        <Dashboard />
      </div>
    </div>
  );
};

export default Index;
