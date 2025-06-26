export interface Section {
  id: string;
  label: string;
  icon: any;
  category?: string;
  permissions?: string[];
}

export const sections: Section[] = [
  // Core sections
  { id: "home", label: "Dashboard", icon: "Home", category: "core" },
  { id: "dashboard", label: "Dashboard", icon: "BarChart3", category: "core" },

  // Customer Management
  { id: "customers", label: "Customers", icon: "Users", category: "customers" },
  {
    id: "pipeline",
    label: "Pipeline",
    icon: "TrendingUp",
    category: "customers",
  },
  {
    id: "client-appointment",
    label: "Appointments",
    icon: "Calendar",
    category: "customers",
  },
  {
    id: "communication",
    label: "Communication",
    icon: "MessageSquare",
    category: "customers",
  },
  { id: "reviews", label: "Reviews", icon: "Star", category: "customers" },

  // Job Management
  { id: "jobs", label: "Jobs", icon: "Briefcase", category: "jobs" },
  { id: "schedule", label: "Schedule", icon: "Calendar", category: "jobs" },
  {
    id: "time-tracking",
    label: "Time Tracking",
    icon: "Clock",
    category: "jobs",
  },
  { id: "photos", label: "Photos", icon: "Camera", category: "jobs" },
  { id: "safety", label: "Safety", icon: "Shield", category: "jobs" },

  // Financial Management
  {
    id: "estimates",
    label: "Estimates",
    icon: "FileText",
    category: "financial",
  },
  { id: "invoices", label: "Invoices", icon: "Receipt", category: "financial" },
  {
    id: "expenses",
    label: "Expenses",
    icon: "CreditCard",
    category: "financial",
  },
  {
    id: "financial-analytics",
    label: "Financial Analytics",
    icon: "TrendingUp",
    category: "financial",
  },
  {
    id: "payment-integration",
    label: "Payment Integration",
    icon: "DollarSign",
    category: "financial",
  },
  {
    id: "profit-analysis",
    label: "Profit Analysis",
    icon: "PieChart",
    category: "financial",
  },

  // Team & Resources
  {
    id: "team-management",
    label: "Team Management",
    icon: "Users",
    category: "team",
  },
  {
    id: "hr-features",
    label: "HR Features",
    icon: "UserCheck",
    category: "team",
  },
  {
    id: "subcontractor-management",
    label: "Subcontractors",
    icon: "UserPlus",
    category: "team",
  },
  {
    id: "employee-locations",
    label: "Employee Locations",
    icon: "MapPin",
    category: "team",
  },
  {
    id: "radius-assignment",
    label: "Radius Assignment",
    icon: "Target",
    category: "team",
  },

  // AI & Automation
  { id: "ai-chat", label: "AI Chat", icon: "Bot", category: "ai" },
  {
    id: "smart-document-generator",
    label: "Document Generator",
    icon: "FileText",
    category: "ai",
  },
  {
    id: "predictive-analytics",
    label: "Predictive Analytics",
    icon: "TrendingUp",
    category: "ai",
  },
  { id: "ai-settings", label: "AI Settings", icon: "Settings", category: "ai" },

  // Map View
  { id: "map-view", label: "Map View", icon: "Map", category: "location" },
];
