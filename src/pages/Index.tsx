import { AppLayout } from "@/components/AppLayout";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              JobBlox
              <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Business Management
              </span>
            </h1>
            
            <p className="text-xl text-slate-300 mb-12 max-w-3xl mx-auto">
              Complete business management platform for modern companies. 
              Manage customers, jobs, invoices, and workflows all in one place.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button 
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => navigate('/app')}
              >
                Launch Application
              </Button>
              
              <Button 
                size="lg"
                variant="outline"
                className="border-slate-600 text-slate-300 hover:bg-slate-800"
                onClick={() => navigate('/login')}
              >
                Sign In
              </Button>
            </div>
          </div>

          <div className="text-center text-slate-400">
            <p>A comprehensive business management solution</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
