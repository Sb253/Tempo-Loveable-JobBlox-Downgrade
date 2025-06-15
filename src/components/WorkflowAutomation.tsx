
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Play, Pause, Settings, Bell, Mail, MessageSquare } from "lucide-react";

interface Workflow {
  id: string;
  name: string;
  trigger: string;
  actions: string[];
  isActive: boolean;
  lastRun: string;
  runsCount: number;
}

const mockWorkflows: Workflow[] = [
  {
    id: '1',
    name: 'New Customer Welcome',
    trigger: 'Customer Created',
    actions: ['Send Welcome Email', 'Schedule Follow-up Call'],
    isActive: true,
    lastRun: '2024-12-17 10:30',
    runsCount: 45
  },
  {
    id: '2',
    name: 'Project Completion',
    trigger: 'Job Status = Completed',
    actions: ['Send Invoice', 'Request Review', 'Schedule Follow-up'],
    isActive: true,
    lastRun: '2024-12-17 14:15',
    runsCount: 23
  },
  {
    id: '3',
    name: 'Payment Reminder',
    trigger: 'Invoice Overdue 7 Days',
    actions: ['Send Reminder Email', 'Create Task for Follow-up'],
    isActive: false,
    lastRun: '2024-12-16 09:00',
    runsCount: 12
  }
];

const triggerOptions = [
  'Customer Created',
  'Job Status Changed',
  'Invoice Created',
  'Payment Received',
  'Schedule Updated',
  'Time-based (Daily/Weekly/Monthly)',
  'Custom Condition'
];

const actionOptions = [
  'Send Email',
  'Send SMS',
  'Create Task',
  'Update Status',
  'Generate Invoice',
  'Schedule Appointment',
  'Send Notification',
  'Update Customer Record'
];

export const WorkflowAutomation = () => {
  const [workflows, setWorkflows] = useState<Workflow[]>(mockWorkflows);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const toggleWorkflow = (id: string) => {
    setWorkflows(workflows.map(w => 
      w.id === id ? { ...w, isActive: !w.isActive } : w
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Workflow Automation</h2>
        <Button onClick={() => setShowCreateForm(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create Workflow
        </Button>
      </div>

      <Tabs defaultValue="workflows" className="space-y-4">
        <TabsList>
          <TabsTrigger value="workflows">Active Workflows</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="workflows" className="space-y-4">
          <div className="grid gap-4">
            {workflows.map((workflow) => (
              <Card key={workflow.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {workflow.name}
                        <Badge variant={workflow.isActive ? "default" : "secondary"}>
                          {workflow.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        Trigger: {workflow.trigger}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch 
                        checked={workflow.isActive}
                        onCheckedChange={() => toggleWorkflow(workflow.id)}
                      />
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium mb-2">Actions:</h4>
                      <div className="flex flex-wrap gap-2">
                        {workflow.actions.map((action, index) => (
                          <Badge key={index} variant="outline">{action}</Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Last run: {workflow.lastRun}</span>
                      <span>Total runs: {workflow.runsCount}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {showCreateForm && (
            <Card>
              <CardHeader>
                <CardTitle>Create New Workflow</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Workflow Name</label>
                    <Input placeholder="Enter workflow name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Trigger</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select trigger" />
                      </SelectTrigger>
                      <SelectContent>
                        {triggerOptions.map((trigger) => (
                          <SelectItem key={trigger} value={trigger}>{trigger}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Actions</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select actions" />
                      </SelectTrigger>
                      <SelectContent>
                        {actionOptions.map((action) => (
                          <SelectItem key={action} value={action}>{action}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={() => setShowCreateForm(false)}>Create Workflow</Button>
                    <Button variant="outline" onClick={() => setShowCreateForm(false)}>Cancel</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Center
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-blue-600" />
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-muted-foreground">Job updates, invoices, reminders</p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <MessageSquare className="h-4 w-4 text-green-600" />
                      <div>
                        <p className="font-medium">SMS Notifications</p>
                        <p className="text-sm text-muted-foreground">Urgent updates, appointment reminders</p>
                      </div>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Bell className="h-4 w-4 text-orange-600" />
                      <div>
                        <p className="font-medium">Push Notifications</p>
                        <p className="text-sm text-muted-foreground">Real-time app notifications</p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Workflow Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Customer Onboarding</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Welcome new customers with automated emails and follow-ups
                  </p>
                  <Button variant="outline" size="sm">Use Template</Button>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Project Lifecycle</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Automate project updates from start to completion
                  </p>
                  <Button variant="outline" size="sm">Use Template</Button>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Payment Collection</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Automate invoice generation and payment reminders
                  </p>
                  <Button variant="outline" size="sm">Use Template</Button>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Review Management</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Request and manage customer reviews automatically
                  </p>
                  <Button variant="outline" size="sm">Use Template</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
