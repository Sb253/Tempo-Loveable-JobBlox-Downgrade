
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
  onProjectProposal
}: QuickActionsProps) => {
  const clientIntakeActions: QuickAction[] = [
    {
      id: 'consultation',
      title: 'Initial Consultation',
      description: 'Schedule first meeting',
      icon: Calendar,
      color: 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
      onClick: onInitialConsultation || (() => {})
    },
    {
      id: 'site-assessment',
      title: 'Site Assessment',
      description: 'Property evaluation',
      icon: Home,
      color: 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700',
      onClick: onSiteAssessment || (() => {})
    },
    {
      id: 'client-info',
      title: 'Client Information',
      description: 'Collect details',
      icon: UserPlus,
      color: 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700',
      onClick: onClientInformation || (() => {})
    },
    {
      id: 'project-proposal',
      title: 'Project Proposal',
      description: 'Create proposal',
      icon: FileCheck,
      color: 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700',
      onClick: onProjectProposal || (() => {})
    }
  ];

  const quickActions: QuickAction[] = [
    {
      id: 'schedule',
      title: 'Schedule Job',
      description: 'Book appointment',
      icon: Calendar,
      color: 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
      onClick: onScheduleJob || (() => {})
    },
    {
      id: 'customer',
      title: 'Add Customer',
      description: 'New client',
      icon: Users,
      color: 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700',
      onClick: onAddCustomer || (() => {})
    },
    {
      id: 'estimate',
      title: 'Create Estimate',
      description: 'Project quote',
      icon: Calculator,
      color: 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700',
      onClick: onCreateEstimate || (() => {})
    },
    {
      id: 'invoice',
      title: 'Create Invoice',
      description: 'Bill services',
      icon: FileText,
      color: 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700',
      onClick: onCreateInvoice || (() => {})
    },
    {
      id: 'payment',
      title: 'Process Payment',
      description: 'Accept payment',
      icon: CreditCard,
      color: 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700',
      onClick: onProcessPayment || (() => {})
    },
    {
      id: 'map',
      title: 'View Map',
      description: 'Job locations',
      icon: MapPin,
      color: 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700',
      onClick: onViewMap || (() => {})
    },
    {
      id: 'quote',
      title: 'Create Quote',
      description: 'Project proposal',
      icon: ClipboardList,
      color: 'bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700',
      onClick: onCreateQuote || (() => {})
    },
    {
      id: 'jobs',
      title: 'Manage Jobs',
      description: 'View projects',
      icon: Wrench,
      color: 'bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700',
      onClick: onManageJobs || (() => {})
    }
  ];

  return (
    <div className="space-y-4">
      <Card className="border border-primary/20 shadow-md">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <UserPlus className="h-4 w-4 text-primary" />
            Client Intake
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {clientIntakeActions.map((action) => {
              const Icon = action.icon;
              return (
                <Button
                  key={action.id}
                  variant="outline"
                  size="sm"
                  className={`h-16 flex flex-col items-center justify-center gap-1 ${action.color} text-white border-0 hover:scale-105 transition-all duration-200 shadow-sm text-xs`}
                  onClick={action.onClick}
                >
                  <Icon className="h-3 w-3" />
                  <div className="text-center leading-tight">
                    <div className="font-medium">{action.title}</div>
                    <div className="opacity-90 text-[10px]">{action.description}</div>
                  </div>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card className="border border-primary/20 shadow-md">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Wrench className="h-4 w-4 text-primary" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Button
                  key={action.id}
                  variant="outline"
                  size="sm"
                  className={`h-16 flex flex-col items-center justify-center gap-1 ${action.color} text-white border-0 hover:scale-105 transition-all duration-200 shadow-sm text-xs`}
                  onClick={action.onClick}
                >
                  <Icon className="h-3 w-3" />
                  <div className="text-center leading-tight">
                    <div className="font-medium">{action.title}</div>
                    <div className="opacity-90 text-[10px]">{action.description}</div>
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
