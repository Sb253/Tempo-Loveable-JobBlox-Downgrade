
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
      color: 'from-primary/80 to-primary hover:from-primary hover:to-primary/90',
      onClick: onInitialConsultation || (() => {})
    },
    {
      id: 'site-assessment',
      title: 'Site Assessment',
      description: 'Property evaluation',
      icon: Home,
      color: 'from-emerald-500/80 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700',
      onClick: onSiteAssessment || (() => {})
    },
    {
      id: 'client-info',
      title: 'Client Information',
      description: 'Collect details',
      icon: UserPlus,
      color: 'from-violet-500/80 to-violet-600 hover:from-violet-600 hover:to-violet-700',
      onClick: onClientInformation || (() => {})
    },
    {
      id: 'project-proposal',
      title: 'Project Proposal',
      description: 'Create proposal',
      icon: FileCheck,
      color: 'from-orange-500/80 to-orange-600 hover:from-orange-600 hover:to-orange-700',
      onClick: onProjectProposal || (() => {})
    }
  ];

  const quickActions: QuickAction[] = [
    {
      id: 'schedule',
      title: 'Schedule Job',
      description: 'Book appointment',
      icon: Calendar,
      color: 'from-primary/80 to-primary hover:from-primary hover:to-primary/90',
      onClick: onScheduleJob || (() => {})
    },
    {
      id: 'customer',
      title: 'Add Customer',
      description: 'New client',
      icon: Users,
      color: 'from-emerald-500/80 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700',
      onClick: onAddCustomer || (() => {})
    },
    {
      id: 'estimate',
      title: 'Create Estimate',
      description: 'Project quote',
      icon: Calculator,
      color: 'from-violet-500/80 to-violet-600 hover:from-violet-600 hover:to-violet-700',
      onClick: onCreateEstimate || (() => {})
    },
    {
      id: 'invoice',
      title: 'Create Invoice',
      description: 'Bill services',
      icon: FileText,
      color: 'from-orange-500/80 to-orange-600 hover:from-orange-600 hover:to-orange-700',
      onClick: onCreateInvoice || (() => {})
    },
    {
      id: 'payment',
      title: 'Process Payment',
      description: 'Accept payment',
      icon: CreditCard,
      color: 'from-cyan-500/80 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700',
      onClick: onProcessPayment || (() => {})
    },
    {
      id: 'map',
      title: 'View Map',
      description: 'Job locations',
      icon: MapPin,
      color: 'from-rose-500/80 to-rose-600 hover:from-rose-600 hover:to-rose-700',
      onClick: onViewMap || (() => {})
    },
    {
      id: 'quote',
      title: 'Create Quote',
      description: 'Project proposal',
      icon: ClipboardList,
      color: 'from-indigo-500/80 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700',
      onClick: onCreateQuote || (() => {})
    },
    {
      id: 'jobs',
      title: 'Manage Jobs',
      description: 'View projects',
      icon: Wrench,
      color: 'from-teal-500/80 to-teal-600 hover:from-teal-600 hover:to-teal-700',
      onClick: onManageJobs || (() => {})
    }
  ];

  return (
    <div className="space-y-4">
      <Card className="border-border/40 bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <UserPlus className="h-4 w-4 text-primary" />
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
                  size="sm"
                  className={`h-14 flex flex-col items-center justify-center gap-1 bg-gradient-to-br ${action.color} text-white border-0 hover:scale-105 transition-all duration-200 shadow-sm text-xs group`}
                  onClick={action.onClick}
                >
                  <Icon className="h-3.5 w-3.5 group-hover:scale-110 transition-transform" />
                  <div className="text-center leading-tight">
                    <div className="font-medium text-[11px]">{action.title}</div>
                    <div className="opacity-90 text-[9px]">{action.description}</div>
                  </div>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/40 bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Wrench className="h-4 w-4 text-primary" />
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
                  size="sm"
                  className={`h-14 flex flex-col items-center justify-center gap-1 bg-gradient-to-br ${action.color} text-white border-0 hover:scale-105 transition-all duration-200 shadow-sm text-xs group`}
                  onClick={action.onClick}
                >
                  <Icon className="h-3.5 w-3.5 group-hover:scale-110 transition-transform" />
                  <div className="text-center leading-tight">
                    <div className="font-medium text-[11px]">{action.title}</div>
                    <div className="opacity-90 text-[9px]">{action.description}</div>
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
