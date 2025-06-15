import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DollarSign, TrendingUp, Calculator, FileText, Edit2, Save, X, Plus, Users, Award } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface WageStructure {
  id: string;
  employeeId: string;
  employeeName: string;
  employeeType: 'employee' | 'subcontractor';
  wageType: 'hourly' | 'salary' | 'commission' | 'hourly_commission' | 'salary_commission' | 'project';
  hourlyRate?: number;
  salary?: number;
  commissionRate?: number;
  projectRate?: number;
  effectiveDate: string;
  bonusStructure?: {
    performanceBonus: number;
    completionBonus: number;
    qualityBonus: number;
  };
}

export const WageManagement = () => {
  const { toast } = useToast();
  const [showWageDialog, setShowWageDialog] = useState(false);
  const [editingWage, setEditingWage] = useState<WageStructure | null>(null);

  const [wageStructures, setWageStructures] = useState<WageStructure[]>([
    {
      id: '1',
      employeeId: 'emp1',
      employeeName: 'John Smith',
      employeeType: 'employee',
      wageType: 'salary',
      salary: 75000,
      effectiveDate: '2024-01-01',
      bonusStructure: {
        performanceBonus: 5000,
        completionBonus: 1000,
        qualityBonus: 2000
      }
    },
    {
      id: '2',
      employeeId: 'emp2',
      employeeName: 'Mike Johnson',
      employeeType: 'employee',
      wageType: 'hourly_commission',
      hourlyRate: 35,
      commissionRate: 5,
      effectiveDate: '2024-01-01'
    },
    {
      id: '3',
      employeeId: 'sub1',
      employeeName: 'Rodriguez Plumbing',
      employeeType: 'subcontractor',
      wageType: 'hourly_commission',
      hourlyRate: 75,
      commissionRate: 10,
      effectiveDate: '2024-01-01'
    },
    {
      id: '4',
      employeeId: 'sub2',
      employeeName: 'Sarah Electric Co',
      employeeType: 'subcontractor',
      wageType: 'project',
      projectRate: 150,
      effectiveDate: '2024-01-01'
    }
  ]);

  const formatWageDisplay = (wage: WageStructure) => {
    const parts = [];
    if (wage.hourlyRate) parts.push(`$${wage.hourlyRate}/hr`);
    if (wage.salary) parts.push(`$${wage.salary.toLocaleString()}/yr`);
    if (wage.commissionRate) parts.push(`${wage.commissionRate}% commission`);
    if (wage.projectRate) parts.push(`$${wage.projectRate}/project`);
    return parts.join(' + ') || 'Not set';
  };

  const calculateEstimatedAnnualPay = (wage: WageStructure) => {
    let estimate = 0;
    
    if (wage.salary) {
      estimate += wage.salary;
    }
    
    if (wage.hourlyRate) {
      // Assume 40 hours/week, 50 weeks/year
      estimate += wage.hourlyRate * 40 * 50;
    }
    
    if (wage.commissionRate && wage.employeeType === 'employee') {
      // Estimate based on average company revenue per employee
      estimate += 100000 * (wage.commissionRate / 100);
    }
    
    if (wage.bonusStructure) {
      estimate += wage.bonusStructure.performanceBonus + 
                 wage.bonusStructure.completionBonus + 
                 wage.bonusStructure.qualityBonus;
    }
    
    return estimate;
  };

  const handleEditWage = (wage: WageStructure) => {
    setEditingWage(wage);
    setShowWageDialog(true);
  };

  const handleCreateWage = () => {
    setEditingWage(null);
    setShowWageDialog(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Wage Management</h1>
        <Button onClick={handleCreateWage} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New Wage Structure
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {wageStructures.filter(w => w.employeeType === 'employee').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Subcontractors</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {wageStructures.filter(w => w.employeeType === 'subcontractor').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Employee Pay</CardTitle>
            <Calculator className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              $
              {Math.round(
                wageStructures
                  .filter(w => w.employeeType === 'employee')
                  .reduce((sum, w) => sum + calculateEstimatedAnnualPay(w), 0) /
                wageStructures.filter(w => w.employeeType === 'employee').length || 0
              ).toLocaleString()}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Payroll</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              $
              {Math.round(
                wageStructures
                  .filter(w => w.employeeType === 'employee')
                  .reduce((sum, w) => sum + calculateEstimatedAnnualPay(w), 0)
              ).toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Wage Structures List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {wageStructures.map((wage) => (
          <Card key={wage.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{wage.employeeName}</CardTitle>
                  <Badge variant={wage.employeeType === 'employee' ? 'default' : 'secondary'}>
                    {wage.employeeType}
                  </Badge>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEditWage(wage)}
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <Label className="text-sm font-medium">Wage Structure</Label>
                <p className="text-sm">{formatWageDisplay(wage)}</p>
                <Badge variant="outline" className="text-xs mt-1">
                  {wage.wageType.replace('_', ' + ')}
                </Badge>
              </div>

              <div>
                <Label className="text-sm font-medium">Estimated Annual</Label>
                <p className="text-lg font-semibold text-green-600">
                  ${calculateEstimatedAnnualPay(wage).toLocaleString()}
                </p>
              </div>

              {wage.bonusStructure && (
                <div>
                  <Label className="text-sm font-medium flex items-center gap-1">
                    <Award className="h-3 w-3" />
                    Bonus Structure
                  </Label>
                  <div className="text-xs space-y-1">
                    <p>Performance: ${wage.bonusStructure.performanceBonus.toLocaleString()}</p>
                    <p>Completion: ${wage.bonusStructure.completionBonus.toLocaleString()}</p>
                    <p>Quality: ${wage.bonusStructure.qualityBonus.toLocaleString()}</p>
                  </div>
                </div>
              )}

              <div>
                <Label className="text-sm font-medium">Effective Date</Label>
                <p className="text-sm text-muted-foreground">{wage.effectiveDate}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Wage Dialog */}
      {showWageDialog && (
        <Dialog open={true} onOpenChange={setShowWageDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingWage ? 'Edit Wage Structure' : 'Create Wage Structure'}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="employee-name">Employee/Contractor Name</Label>
                  <Input
                    id="employee-name"
                    placeholder="Name"
                    defaultValue={editingWage?.employeeName || ''}
                  />
                </div>
                <div>
                  <Label htmlFor="employee-type">Type</Label>
                  <Select defaultValue={editingWage?.employeeType || ''}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="employee">Employee</SelectItem>
                      <SelectItem value="subcontractor">Subcontractor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="wage-type">Wage Structure Type</Label>
                <Select defaultValue={editingWage?.wageType || ''}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select wage type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">Hourly Rate Only</SelectItem>
                    <SelectItem value="salary">Salary Only</SelectItem>
                    <SelectItem value="commission">Commission Only</SelectItem>
                    <SelectItem value="hourly_commission">Hourly + Commission</SelectItem>
                    <SelectItem value="salary_commission">Salary + Commission</SelectItem>
                    <SelectItem value="project">Project Based</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="hourly-rate">Hourly Rate ($)</Label>
                  <Input
                    id="hourly-rate"
                    type="number"
                    placeholder="25.00"
                    defaultValue={editingWage?.hourlyRate || ''}
                  />
                </div>
                <div>
                  <Label htmlFor="annual-salary">Annual Salary ($)</Label>
                  <Input
                    id="annual-salary"
                    type="number"
                    placeholder="50000"
                    defaultValue={editingWage?.salary || ''}
                  />
                </div>
                <div>
                  <Label htmlFor="commission-rate">Commission Rate (%)</Label>
                  <Input
                    id="commission-rate"
                    type="number"
                    placeholder="5"
                    defaultValue={editingWage?.commissionRate || ''}
                  />
                </div>
                <div>
                  <Label htmlFor="project-rate">Project Rate ($)</Label>
                  <Input
                    id="project-rate"
                    type="number"
                    placeholder="150"
                    defaultValue={editingWage?.projectRate || ''}
                  />
                </div>
              </div>

              <div>
                <Label className="text-base font-medium flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  Bonus Structure (Optional)
                </Label>
                <div className="grid grid-cols-3 gap-4 mt-2">
                  <div>
                    <Label htmlFor="performance-bonus">Performance Bonus ($)</Label>
                    <Input
                      id="performance-bonus"
                      type="number"
                      placeholder="5000"
                      defaultValue={editingWage?.bonusStructure?.performanceBonus || ''}
                    />
                  </div>
                  <div>
                    <Label htmlFor="completion-bonus">Completion Bonus ($)</Label>
                    <Input
                      id="completion-bonus"
                      type="number"
                      placeholder="1000"
                      defaultValue={editingWage?.bonusStructure?.completionBonus || ''}
                    />
                  </div>
                  <div>
                    <Label htmlFor="quality-bonus">Quality Bonus ($)</Label>
                    <Input
                      id="quality-bonus"
                      type="number"
                      placeholder="2000"
                      defaultValue={editingWage?.bonusStructure?.qualityBonus || ''}
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="effective-date">Effective Date</Label>
                <Input
                  id="effective-date"
                  type="date"
                  defaultValue={editingWage?.effectiveDate || ''}
                />
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setShowWageDialog(false)}>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button onClick={() => {
                  setShowWageDialog(false);
                  toast({
                    title: "Wage Structure Saved",
                    description: "Wage structure has been updated successfully.",
                  });
                }}>
                  <Save className="h-4 w-4 mr-2" />
                  {editingWage ? 'Update' : 'Create'} Wage Structure
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
