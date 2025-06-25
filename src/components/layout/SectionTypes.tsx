import {
  LucideIcon,
  Home,
  Users,
  Wrench,
  DollarSign,
  Calendar,
  Package,
  FileText,
  CreditCard,
  Clock,
  FileImage,
  MessageSquare,
  Star,
  AlertTriangle,
  CheckCircle,
  Target,
  BarChart3,
  PieChart,
  Receipt,
  Bell,
  Map,
  UserCheck,
  UserCog,
  Hammer,
  Activity,
  Building,
  Settings,
  TrendingUp,
  Database,
  Calculator,
  UserPlus,
  Brain,
} from "lucide-react";

export interface SidebarSection {
  id: string;
  label: string;
  icon: LucideIcon;
}

// Core operational sections for main sidebar
export const sections: SidebarSection[] = [
  // Dashboard
  { id: "home", label: "Dashboard", icon: Home },

  // Customer Management
  { id: "client-appointment", label: "Client Appointment", icon: Calendar },
  { id: "pipeline", label: "Pipeline", icon: TrendingUp },
  { id: "customers", label: "Customers", icon: Users },
  { id: "customer-form", label: "Add Customer", icon: UserPlus },
  { id: "communication", label: "Communication", icon: MessageSquare },
  { id: "reviews", label: "Reviews", icon: Star },

  // Job Operations
  { id: "jobs", label: "Jobs", icon: Wrench },
  { id: "job-form", label: "Add Job", icon: FileText },
  { id: "schedule", label: "Schedule", icon: Calendar },
  { id: "time-tracking", label: "Time Tracking", icon: Clock },
  { id: "photos", label: "Photos", icon: FileImage },
  { id: "safety", label: "Safety", icon: AlertTriangle },
  { id: "quality", label: "Quality Control", icon: CheckCircle },

  // Financial Management
  { id: "estimates", label: "Estimates", icon: FileText },
  { id: "invoices", label: "Invoices", icon: DollarSign },
  { id: "expenses", label: "Expenses", icon: CreditCard },
  { id: "goals", label: "Goals & KPIs", icon: Target },
  { id: "tax-financial", label: "Tax & Financial", icon: Receipt },
  { id: "financial-analytics", label: "Financial Analytics", icon: TrendingUp },
  { id: "payment-integration", label: "Payment Hub", icon: CreditCard },
  { id: "profit-analysis", label: "Profit Analysis", icon: DollarSign },

  // Team & Resources
  { id: "team-management", label: "Team Management", icon: UserCheck },
  { id: "hr-features", label: "HR Features", icon: UserCog },
  {
    id: "subcontractor-management",
    label: "Subcontractor Management",
    icon: Hammer,
  },
  { id: "materials-services", label: "Materials & Services", icon: Package },
  { id: "inventory", label: "Material Inventory", icon: Package },
  { id: "equipment", label: "Equipment", icon: Package },
  { id: "vehicles", label: "Vehicles", icon: Package },
  { id: "advanced-inventory", label: "Advanced Inventory", icon: Package },
  { id: "employee-locations", label: "Employee Locations", icon: Users },
  { id: "radius-assignment", label: "Radius Assignment", icon: Map },

  // Communication
  { id: "team-chat", label: "Team Chat", icon: MessageSquare },
  { id: "notifications", label: "Notifications", icon: Bell },

  // Branch Management (kept in main nav as requested)
  { id: "branch-management", label: "Branch Management", icon: Building },

  // Back Office Access
  { id: "back-office", label: "Back Office Settings", icon: Settings },
];

// Sections moved to Back Office (preserved for registry)
export const backOfficeSections: SidebarSection[] = [
  // AI & Automation Hub
  { id: "ai-chat", label: "AI Chat", icon: Brain },
  { id: "smart-document-generator", label: "Smart Documents", icon: FileText },
  { id: "predictive-analytics", label: "Predictive Analytics", icon: Target },
  { id: "ai-settings", label: "AI Settings", icon: Brain },

  // Reports & Analytics Center
  { id: "reports", label: "Reports", icon: BarChart3 },
  { id: "analytics", label: "Analytics", icon: PieChart },
  { id: "map-view", label: "Map View", icon: Map },
  { id: "advanced-reporting", label: "Advanced Reports", icon: BarChart3 },

  // Integrations Manager
  { id: "quickbooks-integration", label: "QuickBooks", icon: Database },
  { id: "accounting-integration", label: "Accounting", icon: Calculator },

  // System Administration
  { id: "company-settings", label: "Company Settings", icon: Building },
  { id: "mobile-settings", label: "Mobile App", icon: Activity },
];
