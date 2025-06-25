import {
  LucideIcon,
  Users,
  Wrench,
  DollarSign,
  Package,
  Brain,
  Database,
  BarChart3,
  MessageSquare,
  Settings,
} from "lucide-react";

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

// Streamlined menu groups for single-tenant mode
export const createMenuGroups = (sections: SidebarSection[]): MenuGroup[] => [
  {
    id: "customers",
    label: "Customer Management",
    icon: Users,
    defaultOpen: true,
    sections: sections.filter((s) =>
      [
        "customers",
        "customer-form",
        "pipeline",
        "client-appointment",
        "communication",
        "reviews",
      ].includes(s.id),
    ),
  },
  {
    id: "jobs",
    label: "Job Operations",
    icon: Wrench,
    defaultOpen: true,
    sections: sections.filter((s) =>
      [
        "jobs",
        "job-form",
        "schedule",
        "time-tracking",
        "photos",
        "safety",
        "quality",
      ].includes(s.id),
    ),
  },
  {
    id: "financial",
    label: "Financial Management",
    icon: DollarSign,
    sections: sections.filter((s) =>
      [
        "estimates",
        "invoices",
        "expenses",
        "goals",
        "tax-financial",
        "financial-analytics",
        "payment-integration",
        "profit-analysis",
      ].includes(s.id),
    ),
  },
  {
    id: "resources",
    label: "Team & Resources",
    icon: Package,
    sections: sections.filter((s) =>
      [
        "team-management",
        "hr-features",
        "subcontractor-management",
        "materials-services",
        "inventory",
        "equipment",
        "vehicles",
        "advanced-inventory",
        "employee-locations",
        "radius-assignment",
      ].includes(s.id),
    ),
  },
  {
    id: "communication",
    label: "Communication",
    icon: MessageSquare,
    sections: sections.filter((s) =>
      ["team-chat", "notifications"].includes(s.id),
    ),
  },
  {
    id: "branch-admin",
    label: "Branch & Admin",
    icon: Settings,
    sections: sections.filter((s) =>
      ["branch-management", "back-office"].includes(s.id),
    ),
  },
];
