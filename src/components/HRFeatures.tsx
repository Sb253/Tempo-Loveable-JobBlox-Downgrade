
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar, DollarSign, FileText, User, Clock, Award, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  hireDate: string;
  salary: number;
  email: string;
  phone: string;
  address: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  benefits: string[];
  performanceReviews: Array<{
    date: string;
    rating: number;
    notes: string;
  }>;
  timeOff: Array<{
    type: string;
    startDate: string;
    endDate: string;
    status: 'approved' | 'pending' | 'denied';
  }>;
}

export const HRFeatures = () => {
  const { toast } = useToast();
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);

  const mockTeamMembers: TeamMember[] = [
    {
      id: '1',
      name: 'Mike Johnson',
      role: 'Lead Contractor',
      department: 'Operations',
      hireDate: '2022-01-15',
      salary: 65000,
      email: 'mike@company.com',
      phone: '(555) 123-4567',
      address: '123 Main St, City, State 12345',
      emergencyContact: {
        name: 'Jane Johnson',
        phone: '(555) 987-6543',
        relationship: 'Spouse'
      },
      benefits: ['Health Insurance', '401k', 'Paid Time Off'],
      performanceReviews: [
        { date: '2023-12-01', rating: 4.5, notes: 'Excellent leadership and project management' }
      ],
      timeOff: [
        { type: 'Vacation', startDate: '2024-02-01', endDate: '2024-02-05', status: 'approved' }
      ]
    }
  ];

  const handleEditMember = (member: TeamMember) => {
    setSelectedMember(member);
    setShowEditDialog(true);
  };

  const handleSaveMember = () => {
    toast({
      title: "Success",
      description: "Team member profile updated successfully.",
    });
    setShowEditDialog(false);
    setSelectedMember(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">HR Management</h2>
        <p className="text-muted-foreground">Manage team member profiles, benefits, and HR processes</p>
      </div>

      {/* HR Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockTeamMembers.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Time Off Requests</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Salary</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$58k</div>
          </CardContent>
        </Card>
      </div>

      {/* Team Members List */}
      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockTeamMembers.map((member) => (
              <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="font-semibold">{member.name}</h3>
                    <p className="text-sm text-muted-foreground">{member.role} • {member.department}</p>
                    <div className="flex gap-2 mt-1">
                      <Badge variant="outline">${member.salary.toLocaleString()}/year</Badge>
                      <Badge variant="outline">Hired {new Date(member.hireDate).getFullYear()}</Badge>
                    </div>
                  </div>
                </div>
                <Button onClick={() => handleEditMember(member)}>Edit Profile</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Edit Member Dialog */}
      {showEditDialog && selectedMember && (
        <Dialog open={true} onOpenChange={setShowEditDialog}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Team Member Profile - {selectedMember.name}</DialogTitle>
            </DialogHeader>
            
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="personal">Personal</TabsTrigger>
                <TabsTrigger value="employment">Employment</TabsTrigger>
                <TabsTrigger value="benefits">Benefits</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
                <TabsTrigger value="timeoff">Time Off</TabsTrigger>
              </TabsList>

              <TabsContent value="personal" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue={selectedMember.name} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue={selectedMember.email} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" defaultValue={selectedMember.phone} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Textarea id="address" defaultValue={selectedMember.address} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emergency-name">Emergency Contact Name</Label>
                    <Input id="emergency-name" defaultValue={selectedMember.emergencyContact.name} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emergency-phone">Emergency Contact Phone</Label>
                    <Input id="emergency-phone" defaultValue={selectedMember.emergencyContact.phone} />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="employment" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Input id="role" defaultValue={selectedMember.role} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Select defaultValue={selectedMember.department}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Operations">Operations</SelectItem>
                        <SelectItem value="Sales">Sales</SelectItem>
                        <SelectItem value="Admin">Administration</SelectItem>
                        <SelectItem value="HR">Human Resources</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hire-date">Hire Date</Label>
                    <Input id="hire-date" type="date" defaultValue={selectedMember.hireDate} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="salary">Annual Salary</Label>
                    <Input id="salary" type="number" defaultValue={selectedMember.salary} />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="benefits" className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Current Benefits</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedMember.benefits.map((benefit, index) => (
                      <Badge key={index} variant="outline">{benefit}</Badge>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="performance" className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Performance Reviews</h3>
                  <div className="space-y-2">
                    {selectedMember.performanceReviews.map((review, index) => (
                      <div key={index} className="p-3 border rounded">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">{new Date(review.date).toLocaleDateString()}</span>
                          <Badge>Rating: {review.rating}/5</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{review.notes}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="timeoff" className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Time Off History</h3>
                  <div className="space-y-2">
                    {selectedMember.timeOff.map((timeOff, index) => (
                      <div key={index} className="p-3 border rounded">
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="font-medium">{timeOff.type}</span>
                            <p className="text-sm text-muted-foreground">
                              {new Date(timeOff.startDate).toLocaleDateString()} - {new Date(timeOff.endDate).toLocaleDateString()}
                            </p>
                          </div>
                          <Badge variant={timeOff.status === 'approved' ? 'default' : timeOff.status === 'pending' ? 'secondary' : 'destructive'}>
                            {timeOff.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => setShowEditDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveMember}>
                Save Changes
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
