
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  Users, 
  FileText, 
  Calculator, 
  CreditCard, 
  MapPin,
  Phone,
  Mail,
  Wrench,
  ClipboardList,
  UserPlus,
  Home,
  Camera,
  FileCheck
} from "lucide-react";
import { AppointmentScheduler } from "./AppointmentScheduler";

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  onClick: () => void;
}

interface QuickActionsProps {
  onScheduleJob?: () => void;
  onAddCustomer?: () => void;
  onCreateEstimate?: () => void;
  onCreateInvoice?: () => void;
  onProcessPayment?: () => void;
  onViewMap?: () => void;
  onCreateQuote?: () => void;
  onManageJobs?: () => void;
  onInitialConsultation?: () => void;
  onSiteAssessment?: () => void;
  onClientInformation?: () => void;
  onProjectProposal?: () => void;
  onSectionChange?: (section: string) => void;
}

export const QuickActions = ({
  onScheduleJob,
  onAddCustomer,
  onCreateEstimate,
  onCreateInvoice,
  onProcessPayment,
  onViewMap,
  onCreateQuote,
  onManageJobs,
  onInitialConsultation,
  onSiteAssessment,
  onClientInformation,
  onProjectProposal,
  onSectionChange
}: QuickActionsProps) => {
  const [showAppointmentScheduler, setShowAppointmentScheduler] = useState(false);

  const handleAppointmentScheduled = (appointment: any) => {
    console.log('Appointment scheduled:', appointment);
    setShowAppointmentScheduler(false);
  };

  const clientIntakeActions: QuickAction[] = [
    {
      id: 'consultation',
      title: 'Initial Consultation',
      description: 'Schedule first meeting',
      icon: Calendar,
      color: 'from-blue-500 to-blue-600',
      onClick: () => setShowAppointmentScheduler(true)
    },
    {
      id: 'site-assessment',
      title: 'Site Assessment',
      description: 'Property evaluation',
      icon: Home,
      color: 'from-green-500 to-green-600',
      onClick: () => setShowAppointmentScheduler(true)
    },
    {
      id: 'client-info',
      title: 'Client Information',
      description: 'Collect details',
      icon: UserPlus,
      color: 'from-purple-500 to-purple-600',
      onClick: () => onSectionChange?.('customer-form')
    },
    {
      id: 'project-proposal',
      title: 'Project Proposal',
      description: 'Create proposal',
      icon: FileCheck,
      color: 'from-orange-500 to-orange-600',
      onClick: onProjectProposal || (() => {})
    }
  ];

  const quickActions: QuickAction[] = [
    {
      id: 'schedule',
      title: 'Schedule Job',
      description: 'Book new appointment',
      icon: Calendar,
      color: 'from-blue-500 to-blue-600',
      onClick: onScheduleJob || (() => {})
    },
    {
      id: 'customer',
      title: 'Add Customer',
      description: 'New client record',
      icon: Users,
      color: 'from-green-500 to-green-600',
      onClick: () => onSectionChange?.('customer-form')
    },
    {
      id: 'estimate',
      title: 'Create Estimate',
      description: 'New project quote',
      icon: Calculator,
      color: 'from-purple-500 to-purple-600',
      onClick: onCreateEstimate || (() => {})
    },
    {
      id: 'invoice',
      title: 'Create Invoice',
      description: 'Bill for services',
      icon: FileText,
      color: 'from-orange-500 to-orange-600',
      onClick: onCreateInvoice || (() => {})
    },
    {
      id: 'payment',
      title: 'Process Payment',
      description: 'Accept payment',
      icon: CreditCard,
      color: 'from-emerald-500 to-emerald-600',
      onClick: onProcessPayment || (() => {})
    },
    {
      id: 'map',
      title: 'View Map',
      description: 'Job locations',
      icon: MapPin,
      color: 'from-red-500 to-red-600',
      onClick: onViewMap || (() => {})
    },
    {
      id: 'quote',
      title: 'Create Quote',
      description: 'Project proposal',
      icon: ClipboardList,
      color: 'from-indigo-500 to-indigo-600',
      onClick: onCreateQuote || (() => {})
    },
    {
      id: 'jobs',
      title: 'Manage Jobs',
      description: 'View all projects',
      icon: Wrench,
      color: 'from-cyan-500 to-cyan-600',
      onClick: onManageJobs || (() => {})
    }
  ];

  return (
    <div className="space-y-6">
      {/* Client Intake Section */}
      <Card className="bg-gradient-to-br from-card/50 to-card border-2 border-primary/20 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
            <UserPlus className="h-5 w-5 text-primary" />
            Client Intake
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {clientIntakeActions.map((action) => {
              const Icon = action.icon;
              return (
                <Button
                  key={action.id}
                  variant="outline"
                  className={`h-20 flex flex-col items-center justify-center gap-2 bg-gradient-to-br ${action.color} text-white border-0 hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl`}
                  onClick={action.onClick}
                >
                  <Icon className="h-5 w-5" />
                  <div className="text-center">
                    <div className="text-xs font-semibold">{action.title}</div>
                    <div className="text-xs opacity-90">{action.description}</div>
                  </div>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Appointment Scheduler Modal */}
      {showAppointmentScheduler && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b flex items-center justify-between">
              <h2 className="text-lg font-semibold">Schedule Appointment</h2>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowAppointmentScheduler(false)}
              >
                ×
              </Button>
            </div>
            <div className="p-4">
              <AppointmentScheduler onScheduled={handleAppointmentScheduled} />
            </div>
          </div>
        </div>
      )}

      {/* General Quick Actions */}
      <Card className="bg-gradient-to-br from-card/50 to-card border-2 border-primary/20 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
            <Wrench className="h-5 w-5 text-primary" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Button
                  key={action.id}
                  variant="outline"
                  className={`h-20 flex flex-col items-center justify-center gap-2 bg-gradient-to-br ${action.color} text-white border-0 hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl`}
                  onClick={action.onClick}
                >
                  <Icon className="h-5 w-5" />
                  <div className="text-center">
                    <div className="text-xs font-semibold">{action.title}</div>
                    <div className="text-xs opacity-90">{action.description}</div>
                  </div>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
