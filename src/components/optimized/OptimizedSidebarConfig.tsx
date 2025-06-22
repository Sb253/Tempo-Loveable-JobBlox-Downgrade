
import { LucideIcon, Users, Wrench, DollarSign, Package, Brain, Database, BarChart3, MessageSquare, Settings } from "lucide-react";

export interface SidebarSection {
  id: string;
  label: string;
  icon: LucideIcon;
}

export interface MenuGroup {
  id: string;
  label: string;
  icon: LucideIcon;
  sections: SidebarSection[];
  badge?: string;
  defaultOpen?: boolean;
}

export const createOptimizedMenuGroups = (sections: SidebarSection[]): MenuGroup[] => [
  {
    id: 'customers',
    label: 'Customer Management',
    icon: Users,
    sections: sections.filter(s => 
      ['customers', 'customer-form', 'pipeline', 'client-appointment', 'communication', 'reviews'].includes(s.id)
    )
  },
  {
    id: 'jobs',
    label: 'Job Operations',
    icon: Wrench,
    sections: sections.filter(s => 
      ['jobs', 'job-form', 'schedule', 'time-tracking', 'photos', 'safety', 'quality'].includes(s.id)
    )
  },
  {
    id: 'financial',
    label: 'Financial Management',
    icon: DollarSign,
    sections: sections.filter(s => 
      ['estimates', 'invoices', 'expenses', 'goals', 'tax-financial', 'financial-analytics', 'payment-integration', 'profit-analysis'].includes(s.id)
    )
  },
  {
    id: 'resources',
    label: 'Team & Resources',
    icon: Package,
    sections: sections.filter(s => 
      ['team-management', 'hr-features', 'subcontractor-management', 'materials-services', 'inventory', 'equipment', 'vehicles', 'advanced-inventory', 'employee-locations', 'radius-assignment'].includes(s.id)
    )
  },
  {
    id: 'ai',
    label: 'AI & Automation',
    icon: Brain,
    badge: 'New',
    sections: sections.filter(s => 
      ['ai-chat', 'smart-document-generator', 'predictive-analytics', 'ai-settings'].includes(s.id)
    )
  },
  {
    id: 'integrations',
    label: 'Integrations',
    icon: Database,
    sections: sections.filter(s => 
      ['quickbooks-integration', 'accounting-integration'].includes(s.id)
    )
  },
  {
    id: 'reports',
    label: 'Reports & Analytics',
    icon: BarChart3,
    sections: sections.filter(s => 
      ['reports', 'analytics', 'map-view', 'predictive-analytics', 'advanced-reporting'].includes(s.id)
    )
  },
  {
    id: 'communication',
    label: 'Communication',
    icon: MessageSquare,
    sections: sections.filter(s => 
      ['team-chat', 'notifications'].includes(s.id)
    )
  },
  {
    id: 'settings',
    label: 'Settings & Admin',
    icon: Settings,
    sections: sections.filter(s => 
      ['company-settings', 'back-office', 'mobile-settings', 'branch-management'].includes(s.id)
    )
  }
];
