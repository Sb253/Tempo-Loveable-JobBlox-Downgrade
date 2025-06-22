
import { LucideIcon, Building2 } from "lucide-react";

export interface SidebarSection {
  id: string;
  label: string;
  icon: LucideIcon;
}

export interface SidebarGroup {
  label: string;
  items: SidebarSection[];
  icon: LucideIcon;
  defaultOpen?: boolean;
}

export const createMenuGroups = (sections: SidebarSection[]): SidebarGroup[] => [
  {
    label: 'Customer Management',
    icon: sections.find(s => s.id === 'customers')?.icon || Building2,
    defaultOpen: false,
    items: sections.filter(s => 
      ['customers', 'customer-form', 'pipeline', 'client-appointment', 'communication', 'reviews'].includes(s.id)
    )
  },
  {
    label: 'Job Management',
    icon: sections.find(s => s.id === 'jobs')?.icon || Building2,
    defaultOpen: false,
    items: sections.filter(s => 
      ['jobs', 'job-form', 'schedule', 'time-tracking', 'photos', 'safety', 'quality'].includes(s.id)
    )
  },
  {
    label: 'Team & Resources',
    icon: sections.find(s => s.id === 'team-management')?.icon || Building2,
    defaultOpen: false,
    items: sections.filter(s => 
      ['team-management', 'hr-features', 'subcontractor-management', 'materials-services', 'inventory', 'equipment', 'vehicles', 'advanced-inventory', 'employee-locations', 'radius-assignment'].includes(s.id)
    )
  },
  {
    label: 'Financial',
    icon: sections.find(s => s.id === 'invoices')?.icon || Building2,
    defaultOpen: false,
    items: sections.filter(s => 
      ['estimates', 'invoices', 'expenses', 'goals', 'tax-financial', 'financial-analytics', 'payment-integration', 'profit-analysis'].includes(s.id)
    )
  },
  {
    label: 'Reports & Analytics',
    icon: sections.find(s => s.id === 'reports')?.icon || Building2,
    defaultOpen: false,
    items: sections.filter(s => 
      ['reports', 'analytics', 'map-view', 'predictive-analytics', 'advanced-reporting'].includes(s.id)
    )
  },
  {
    label: 'AI Features',
    icon: sections.find(s => s.id === 'ai-chat')?.icon || Building2,
    defaultOpen: false,
    items: sections.filter(s => 
      ['ai-chat', 'smart-document-generator', 'predictive-analytics', 'ai-settings'].includes(s.id)
    )
  },
  {
    label: 'Integrations',
    icon: sections.find(s => s.id === 'quickbooks-integration')?.icon || Building2,
    defaultOpen: false,
    items: sections.filter(s => 
      ['quickbooks-integration', 'accounting-integration'].includes(s.id)
    )
  },
  {
    label: 'Communication',
    icon: sections.find(s => s.id === 'team-chat')?.icon || Building2,
    defaultOpen: false,
    items: sections.filter(s => 
      ['team-chat', 'notifications'].includes(s.id)
    )
  },
  {
    label: 'System Settings',
    icon: sections.find(s => s.id === 'settings')?.icon || Building2,
    defaultOpen: false,
    items: sections.filter(s => 
      ['company-settings', 'back-office', 'mobile-settings', 'branch-management'].includes(s.id)
    )
  }
];
