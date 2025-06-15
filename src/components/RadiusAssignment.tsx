
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Target, CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  coordinates: [number, number];
  skills: string[];
  availability: 'available' | 'busy' | 'offline';
  workload: number; // 0-100 percentage
}

interface Assignment {
  id: string;
  title: string;
  type: 'job' | 'appointment';
  address: string;
  coordinates: [number, number];
  priority: 'high' | 'medium' | 'low';
  requiredSkills: string[];
  estimatedDuration: number; // in hours
  scheduledDate: string;
  status: 'pending' | 'assigned' | 'completed';
  assignedEmployee?: string;
}

export const RadiusAssignment = () => {
  const { toast } = useToast();
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: '1',
      name: 'Mike Johnson',
      email: 'mike@company.com',
      phone: '(555) 0101',
      address: '123 Worker St, Denver, CO',
      coordinates: [-104.9903, 39.7392],
      skills: ['plumbing', 'electrical', 'general'],
      availability: 'available',
      workload: 45
    },
    {
      id: '2',
      name: 'Sarah Davis',
      email: 'sarah@company.com',
      phone: '(555) 0102',
      address: '456 Tech Ave, Boulder, CO',
      coordinates: [-105.2705, 40.0150],
      skills: ['roofing', 'carpentry', 'painting'],
      availability: 'available',
      workload: 30
    },
    {
      id: '3',
      name: 'Tom Wilson',
      email: 'tom@company.com',
      phone: '(555) 0103',
      address: '789 Service Rd, Aurora, CO',
      coordinates: [-104.8319, 39.7294],
      skills: ['hvac', 'electrical', 'maintenance'],
      availability: 'busy',
      workload: 85
    }
  ]);

  const [assignments, setAssignments] = useState<Assignment[]>([
    {
      id: '1',
      title: 'Kitchen Renovation Assessment',
      type: 'appointment',
      address: '123 Main St, Denver, CO',
      coordinates: [-104.9847, 39.7392],
      priority: 'high',
      requiredSkills: ['general', 'plumbing'],
      estimatedDuration: 2,
      scheduledDate: '2024-12-20',
      status: 'pending'
    },
    {
      id: '2',
      title: 'Roof Repair',
      type: 'job',
      address: '456 Oak St, Boulder, CO',
      coordinates: [-105.2527, 40.0274],
      priority: 'medium',
      requiredSkills: ['roofing'],
      estimatedDuration: 4,
      scheduledDate: '2024-12-21',
      status: 'pending'
    }
  ]);

  const [radiusSettings, setRadiusSettings] = useState({
    maxRadius: 25, // miles
    prioritizeDistance: true,
    considerWorkload: true,
    requireSkillMatch: true
  });

  // Calculate distance between two coordinates (Haversine formula)
  const calculateDistance = (coord1: [number, number], coord2: [number, number]): number => {
    const R = 3959; // Earth's radius in miles
    const dLat = (coord2[0] - coord1[0]) * Math.PI / 180;
    const dLon = (coord2[1] - coord1[1]) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(coord1[0] * Math.PI / 180) * Math.cos(coord2[0] * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  // Find eligible employees for an assignment
  const findEligibleEmployees = (assignment: Assignment) => {
    return employees.filter(employee => {
      // Check availability
      if (employee.availability !== 'available') return false;
      
      // Check distance
      const distance = calculateDistance(assignment.coordinates, employee.coordinates);
      if (distance > radiusSettings.maxRadius) return false;
      
      // Check skills if required
      if (radiusSettings.requireSkillMatch) {
        const hasRequiredSkills = assignment.requiredSkills.some(skill => 
          employee.skills.includes(skill)
        );
        if (!hasRequiredSkills) return false;
      }
      
      // Check workload (don't assign if too busy)
      if (radiusSettings.considerWorkload && employee.workload > 80) return false;
      
      return true;
    }).map(employee => ({
      ...employee,
      distance: calculateDistance(assignment.coordinates, employee.coordinates)
    }));
  };

  // Auto-assign based on criteria
  const autoAssign = (assignment: Assignment) => {
    const eligibleEmployees = findEligibleEmployees(assignment);
    
    if (eligibleEmployees.length === 0) {
      toast({
        title: "No Eligible Employees",
        description: "No employees found within radius with required skills and availability.",
        variant: "destructive"
      });
      return null;
    }

    // Sort by distance and workload
    const sortedEmployees = eligibleEmployees.sort((a, b) => {
      if (radiusSettings.prioritizeDistance) {
        return a.distance - b.distance;
      } else {
        return a.workload - b.workload;
      }
    });

    const selectedEmployee = sortedEmployees[0];
    
    // Update assignment
    setAssignments(prev => prev.map(a => 
      a.id === assignment.id 
        ? { ...a, status: 'assigned' as const, assignedEmployee: selectedEmployee.id }
        : a
    ));

    // Update employee workload
    setEmployees(prev => prev.map(emp => 
      emp.id === selectedEmployee.id 
        ? { ...emp, workload: Math.min(100, emp.workload + (assignment.estimatedDuration * 10)) }
        : emp
    ));

    toast({
      title: "Assignment Successful",
      description: `${assignment.title} assigned to ${selectedEmployee.name} (${selectedEmployee.distance.toFixed(1)} miles away)`,
    });

    return selectedEmployee;
  };

  const manualAssign = (assignmentId: string, employeeId: string) => {
    const assignment = assignments.find(a => a.id === assignmentId);
    const employee = employees.find(e => e.id === employeeId);
    
    if (!assignment || !employee) return;

    const distance = calculateDistance(assignment.coordinates, employee.coordinates);
    
    setAssignments(prev => prev.map(a => 
      a.id === assignmentId 
        ? { ...a, status: 'assigned' as const, assignedEmployee: employeeId }
        : a
    ));

    setEmployees(prev => prev.map(emp => 
      emp.id === employeeId 
        ? { ...emp, workload: Math.min(100, emp.workload + (assignment.estimatedDuration * 10)) }
        : emp
    ));

    toast({
      title: "Manual Assignment",
      description: `${assignment.title} assigned to ${employee.name} (${distance.toFixed(1)} miles away)`,
    });
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'busy': return 'bg-yellow-100 text-yellow-800';
      case 'offline': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Radius-Based Assignment</h1>
        <p className="text-muted-foreground">Assign jobs and appointments to employees based on location and skills</p>
      </div>

      {/* Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Assignment Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="maxRadius">Max Radius (miles)</Label>
            <Input
              id="maxRadius"
              type="number"
              value={radiusSettings.maxRadius}
              onChange={(e) => setRadiusSettings(prev => ({ 
                ...prev, 
                maxRadius: parseInt(e.target.value) || 25 
              }))}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="prioritizeDistance"
              checked={radiusSettings.prioritizeDistance}
              onChange={(e) => setRadiusSettings(prev => ({ 
                ...prev, 
                prioritizeDistance: e.target.checked 
              }))}
              className="rounded"
            />
            <Label htmlFor="prioritizeDistance">Prioritize Distance</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="considerWorkload"
              checked={radiusSettings.considerWorkload}
              onChange={(e) => setRadiusSettings(prev => ({ 
                ...prev, 
                considerWorkload: e.target.checked 
              }))}
              className="rounded"
            />
            <Label htmlFor="considerWorkload">Consider Workload</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="requireSkillMatch"
              checked={radiusSettings.requireSkillMatch}
              onChange={(e) => setRadiusSettings(prev => ({ 
                ...prev, 
                requireSkillMatch: e.target.checked 
              }))}
              className="rounded"
            />
            <Label htmlFor="requireSkillMatch">Require Skill Match</Label>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Assignments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Pending Assignments
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {assignments.filter(a => a.status === 'pending').map((assignment) => {
              const eligibleEmployees = findEligibleEmployees(assignment);
              
              return (
                <div key={assignment.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold">{assignment.title}</h4>
                      <p className="text-sm text-muted-foreground">{assignment.address}</p>
                    </div>
                    <Badge className={getPriorityColor(assignment.priority)}>
                      {assignment.priority}
                    </Badge>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {assignment.requiredSkills.map(skill => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="text-sm text-muted-foreground">
                    Duration: {assignment.estimatedDuration}h | Date: {assignment.scheduledDate}
                  </div>
                  
                  <div className="text-sm">
                    Eligible employees: {eligibleEmployees.length}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      onClick={() => autoAssign(assignment)}
                      disabled={eligibleEmployees.length === 0}
                      size="sm"
                    >
                      Auto Assign
                    </Button>
                    
                    <Select onValueChange={(value) => manualAssign(assignment.id, value)}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Manual" />
                      </SelectTrigger>
                      <SelectContent>
                        {eligibleEmployees.map((employee) => (
                          <SelectItem key={employee.id} value={employee.id}>
                            {employee.name} ({employee.distance.toFixed(1)}mi)
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Employees */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Employee Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {employees.map((employee) => (
              <div key={employee.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold">{employee.name}</h4>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {employee.address}
                    </p>
                  </div>
                  <Badge className={getAvailabilityColor(employee.availability)}>
                    {employee.availability}
                  </Badge>
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {employee.skills.map(skill => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Workload:</span>
                    <span>{employee.workload}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        employee.workload > 80 ? 'bg-red-500' : 
                        employee.workload > 60 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${employee.workload}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Assigned Jobs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Recent Assignments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {assignments.filter(a => a.status === 'assigned').map((assignment) => {
              const assignedEmployee = employees.find(e => e.id === assignment.assignedEmployee);
              const distance = assignedEmployee ? 
                calculateDistance(assignment.coordinates, assignedEmployee.coordinates) : 0;
              
              return (
                <div key={assignment.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">{assignment.title}</h4>
                    <p className="text-sm text-muted-foreground">{assignment.address}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{assignedEmployee?.name}</p>
                    <p className="text-sm text-muted-foreground">{distance.toFixed(1)} miles away</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
