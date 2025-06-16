
import { LucideIcon, Home, Users, Wrench, DollarSign, Calendar, Package, FileText, CreditCard, Clock, FileImage, MessageSquare, Star, AlertTriangle, CheckCircle, Target, BarChart3, PieChart, Receipt, Bell, Map, UserCheck, UserCog, Hammer, Activity, Building, Settings, TrendingUp, Database, Calculator, UserPlus, Brain } from "lucide-react";

export interface SidebarSection {
  id: string;
  label: string;
  icon: LucideIcon;
}

export const sections: SidebarSection[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'client-appointment', label: 'Client Appointment', icon: Calendar },
  { id: 'pipeline', label: 'Pipeline', icon: TrendingUp },
  { id: 'customers', label: 'Customers', icon: Users },
  { id: 'jobs', label: 'Jobs', icon: Wrench },
  { id: 'customer-form', label: 'Add Customer', icon: UserPlus },
  { id: 'job-form', label: 'Add Job', icon: FileText },
  { id: 'estimates', label: 'Estimates', icon: FileText },
  { id: 'invoices', label: 'Invoices', icon: DollarSign },
  { id: 'schedule', label: 'Schedule', icon: Calendar },
  { id: 'expenses', label: 'Expenses', icon: CreditCard },
  { id: 'time-tracking', label: 'Time Tracking', icon: Clock },
  { id: 'materials-services', label: 'Materials & Services', icon: Package },
  { id: 'inventory', label: 'Material Inventory', icon: Package },
  { id: 'equipment', label: 'Equipment', icon: Package },
  { id: 'vehicles', label: 'Vehicles', icon: Package },
  { id: 'photos', label: 'Photos', icon: FileImage },
  { id: 'communication', label: 'Communication', icon: MessageSquare },
  { id: 'reviews', label: 'Reviews', icon: Star },
  { id: 'safety', label: 'Safety', icon: AlertTriangle },
  { id: 'quality', label: 'Quality Control', icon: CheckCircle },
  { id: 'goals', label: 'Goals & KPIs', icon: Target },
  { id: 'reports', label: 'Reports', icon: BarChart3 },
  { id: 'analytics', label: 'Analytics', icon: PieChart },
  { id: 'tax-financial', label: 'Tax & Financial', icon: Receipt },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'map-view', label: 'Map View', icon: Map },
  { id: 'team-management', label: 'Team Management', icon: UserCheck },
  { id: 'hr-features', label: 'HR Features', icon: UserCog },
  { id: 'subcontractor-management', label: 'Subcontractor Management', icon: Hammer },
  { id: 'mobile-settings', label: 'Mobile App', icon: Activity },
  { id: 'company-settings', label: 'Company Settings', icon: Building },
  { id: 'branch-management', label: 'Branch Management', icon: Building },
  { id: 'back-office', label: 'Back Office Settings', icon: Settings },
  { id: 'team-chat', label: 'Team Chat', icon: MessageSquare },
  { id: 'advanced-inventory', label: 'Advanced Inventory', icon: Package },
  { id: 'financial-analytics', label: 'Financial Analytics', icon: TrendingUp },
  { id: 'payment-integration', label: 'Payment Hub', icon: CreditCard },
  { id: 'profit-analysis', label: 'Profit Analysis', icon: DollarSign },
  { id: 'predictive-analytics', label: 'Predictive Analytics', icon: Target },
  { id: 'advanced-reporting', label: 'Advanced Reports', icon: BarChart3 },
  { id: 'quickbooks-integration', label: 'QuickBooks', icon: Database },
  { id: 'accounting-integration', label: 'Accounting', icon: Calculator },
  { id: 'radius-assignment', label: 'Radius Assignment', icon: Map },
  { id: 'employee-locations', label: 'Employee Locations', icon: Users },
  { id: 'ai-chat', label: 'AI Chat', icon: Brain },
  { id: 'smart-document-generator', label: 'Smart Documents', icon: FileText },
  { id: 'ai-settings', label: 'AI Settings', icon: Brain }
];
