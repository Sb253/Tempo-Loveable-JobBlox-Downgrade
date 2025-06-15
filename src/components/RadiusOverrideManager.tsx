
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Clock, User, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Employee {
  id: string;
  name: string;
  defaultRadius: number;
  currentRadius: number;
  isAvailable: boolean;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  skills: string[];
}

interface RadiusOverride {
  id: string;
  employeeId: string;
  jobId?: string;
  appointmentId?: string;
  overrideRadius: number;
  reason: string;
  startTime: string;
  endTime: string;
  isActive: boolean;
}

export const RadiusOverrideManager = () => {
  const { toast } = useToast();
  
  const [employees] = useState<Employee[]>([
    {
      id: '1',
      name: 'Mike Johnson',
      defaultRadius: 25,
      currentRadius: 25,
      isAvailable: true,
      location: { lat: 40.7128, lng: -74.0060, address: '123 Main St, NYC' },
      skills: ['plumbing', 'electrical']
    },
    {
      id: '2',
      name: 'Sarah Davis',
      defaultRadius: 20,
      currentRadius: 35,
      isAvailable: true,
      location: { lat: 40.7580, lng: -73.9855, address: '456 Park Ave, NYC' },
      skills: ['carpentry', 'renovation']
    },
    {
      id: '3',
      name: 'Tom Wilson',
      defaultRadius: 30,
      currentRadius: 30,
      isAvailable: false,
      location: { lat: 40.6892, lng: -74.0445, address: '789 Broadway, NYC' },
      skills: ['hvac', 'electrical']
    }
  ]);

  const [overrides, setOverrides] = useState<RadiusOverride[]>([
    {
      id: '1',
      employeeId: '2',
      jobId: 'job-123',
      overrideRadius: 35,
      reason: 'High priority customer',
      startTime: '2024-12-18 08:00',
      endTime: '2024-12-18 18:00',
      isActive: true
    }
  ]);

  const [showOverrideDialog, setShowOverrideDialog] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [newOverride, setNewOverride] = useState({
    radius: 25,
    reason: '',
    duration: '8'
  });

  const createRadiusOverride = (employeeId: string) => {
    const employee = employees.find(emp => emp.id === employeeId);
    if (!employee) return;

    const override: RadiusOverride = {
      id: Date.now().toString(),
      employeeId,
      overrideRadius: newOverride.radius,
      reason: newOverride.reason,
      startTime: new Date().toISOString(),
      endTime: new Date(Date.now() + parseInt(newOverride.duration) * 60 * 60 * 1000).toISOString(),
      isActive: true
    };

    setOverrides(prev => [...prev, override]);
    setShowOverrideDialog(false);
    setNewOverride({ radius: 25, reason: '', duration: '8' });
    
    toast({
      title: "Radius Override Created",
      description: `Extended radius to ${newOverride.radius} miles for ${employee.name}`,
    });
  };

  const removeOverride = (overrideId: string) => {
    setOverrides(prev => prev.filter(o => o.id !== overrideId));
    toast({
      title: "Override Removed",
      description: "Radius override has been removed",
    });
  };

  const getEmployeeCurrentRadius = (employeeId: string) => {
    const activeOverride = overrides.find(o => 
      o.employeeId === employeeId && 
      o.isActive && 
      new Date(o.endTime) > new Date()
    );
    
    if (activeOverride) {
      return activeOverride.overrideRadius;
    }
    
    const employee = employees.find(emp => emp.id === employeeId);
    return employee?.defaultRadius || 25;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Radius Override Management</h2>
        <Button onClick={() => setShowOverrideDialog(true)}>
          <Settings className="h-4 w-4 mr-2" />
          Create Override
        </Button>
      </div>

      {/* Employee Availability & Radius Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {employees.map((employee) => {
          const currentRadius = getEmployeeCurrentRadius(employee.id);
          const hasOverride = currentRadius !== employee.defaultRadius;
          const activeOverride = overrides.find(o => 
            o.employeeId === employee.id && 
            o.isActive && 
            new Date(o.endTime) > new Date()
          );

          return (
            <Card key={employee.id} className={`border-2 ${employee.isAvailable ? 'border-green-200' : 'border-red-200'}`}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{employee.name}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{employee.location.address}</span>
                    </div>
                  </div>
                  <Badge className={employee.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                    {employee.isAvailable ? 'Available' : 'Busy'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Default Radius</Label>
                    <p className="text-lg font-semibold">{employee.defaultRadius} miles</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Current Radius</Label>
                    <p className={`text-lg font-semibold ${hasOverride ? 'text-orange-600' : ''}`}>
                      {currentRadius} miles
                      {hasOverride && <span className="text-xs ml-1">(Override)</span>}
                    </p>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">Skills</Label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {employee.skills.map(skill => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {activeOverride && (
                  <div className="bg-orange-50 p-3 rounded-lg border border-orange-200">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-orange-800">Active Override</p>
                        <p className="text-xs text-orange-600">{activeOverride.reason}</p>
                        <p className="text-xs text-orange-600">
                          Until: {new Date(activeOverride.endTime).toLocaleString()}
                        </p>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => removeOverride(activeOverride.id)}
                        className="text-xs"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => {
                      setSelectedEmployee(employee);
                      setShowOverrideDialog(true);
                    }}
                    disabled={!employee.isAvailable}
                  >
                    Set Override
                  </Button>
                  <Button size="sm" variant="outline">
                    View Jobs
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Active Overrides List */}
      <Card>
        <CardHeader>
          <CardTitle>Active Radius Overrides</CardTitle>
        </CardHeader>
        <CardContent>
          {overrides.filter(o => o.isActive && new Date(o.endTime) > new Date()).length === 0 ? (
            <p className="text-muted-foreground text-center py-4">No active overrides</p>
          ) : (
            <div className="space-y-3">
              {overrides
                .filter(o => o.isActive && new Date(o.endTime) > new Date())
                .map((override) => {
                  const employee = employees.find(emp => emp.id === override.employeeId);
                  return (
                    <div key={override.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{employee?.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Radius: {employee?.defaultRadius}mi → {override.overrideRadius}mi
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{override.reason}</p>
                        <p className="text-xs text-muted-foreground">
                          Until: {new Date(override.endTime).toLocaleString()}
                        </p>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => removeOverride(override.id)}
                      >
                        Remove
                      </Button>
                    </div>
                  );
                })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Override Dialog */}
      <Dialog open={showOverrideDialog} onOpenChange={setShowOverrideDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              Create Radius Override
              {selectedEmployee && ` for ${selectedEmployee.name}`}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {!selectedEmployee && (
              <div>
                <Label>Select Employee</Label>
                <Select onValueChange={(value) => {
                  const emp = employees.find(e => e.id === value);
                  setSelectedEmployee(emp || null);
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose employee" />
                  </SelectTrigger>
                  <SelectContent>
                    {employees.filter(emp => emp.isAvailable).map(emp => (
                      <SelectItem key={emp.id} value={emp.id}>
                        {emp.name} (Current: {getEmployeeCurrentRadius(emp.id)}mi)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div>
              <Label>Override Radius (miles)</Label>
              <Input
                type="number"
                value={newOverride.radius}
                onChange={(e) => setNewOverride(prev => ({ ...prev, radius: parseInt(e.target.value) || 25 }))}
                min="5"
                max="100"
              />
            </div>

            <div>
              <Label>Reason for Override</Label>
              <Input
                value={newOverride.reason}
                onChange={(e) => setNewOverride(prev => ({ ...prev, reason: e.target.value }))}
                placeholder="e.g., High priority customer, Emergency job"
              />
            </div>

            <div>
              <Label>Duration (hours)</Label>
              <Select value={newOverride.duration} onValueChange={(value) => setNewOverride(prev => ({ ...prev, duration: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">2 hours</SelectItem>
                  <SelectItem value="4">4 hours</SelectItem>
                  <SelectItem value="8">8 hours (Full day)</SelectItem>
                  <SelectItem value="24">24 hours</SelectItem>
                  <SelectItem value="72">3 days</SelectItem>
                  <SelectItem value="168">1 week</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button 
                onClick={() => selectedEmployee && createRadiusOverride(selectedEmployee.id)}
                disabled={!selectedEmployee || !newOverride.reason}
                className="flex-1"
              >
                Create Override
              </Button>
              <Button variant="outline" onClick={() => {
                setShowOverrideDialog(false);
                setSelectedEmployee(null);
                setNewOverride({ radius: 25, reason: '', duration: '8' });
              }}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
