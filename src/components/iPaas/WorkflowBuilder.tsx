
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { MermaidDiagram } from './MermaidDiagram';
import { Plus, Play, Save, Settings } from "lucide-react";

interface WorkflowNode {
  id: string;
  type: 'trigger' | 'action' | 'condition';
  title: string;
  service: string;
  config: any;
}

interface Workflow {
  id: string;
  name: string;
  nodes: WorkflowNode[];
  status: 'active' | 'inactive' | 'draft';
}

export const WorkflowBuilder = () => {
  const [workflows, setWorkflows] = useState<Workflow[]>([
    {
      id: '1',
      name: 'Customer Onboarding Flow',
      status: 'active',
      nodes: [
        { id: 'trigger1', type: 'trigger', title: 'New Customer Created', service: 'CRM', config: {} },
        { id: 'action1', type: 'action', title: 'Send Welcome Email', service: 'Email', config: {} },
        { id: 'action2', type: 'action', title: 'Create Project Folder', service: 'Storage', config: {} }
      ]
    }
  ]);
  
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(workflows[0]);
  const [showBuilder, setShowBuilder] = useState(false);

  const generateMermaidCode = (workflow: Workflow) => {
    let mermaidCode = 'graph TD\n';
    workflow.nodes.forEach((node, index) => {
      const nextNode = workflow.nodes[index + 1];
      const nodeShape = node.type === 'trigger' ? 'circle' : node.type === 'condition' ? 'diamond' : 'rect';
      
      mermaidCode += `    ${node.id}["${node.title}"]\n`;
      if (nextNode) {
        mermaidCode += `    ${node.id} --> ${nextNode.id}\n`;
      }
    });
    return mermaidCode;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Visual Workflow Builder</h3>
        <Button onClick={() => setShowBuilder(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Workflow
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Workflow List */}
        <Card>
          <CardHeader>
            <CardTitle>Workflows</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {workflows.map((workflow) => (
              <div
                key={workflow.id}
                className={`p-3 border rounded-lg cursor-pointer ${
                  selectedWorkflow?.id === workflow.id ? 'border-primary bg-primary/5' : ''
                }`}
                onClick={() => setSelectedWorkflow(workflow)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{workflow.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {workflow.nodes.length} steps
                    </p>
                  </div>
                  <Badge variant={workflow.status === 'active' ? 'default' : 'secondary'}>
                    {workflow.status}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Visual Diagram */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>
                {selectedWorkflow ? selectedWorkflow.name : 'Select a Workflow'}
              </CardTitle>
              {selectedWorkflow && (
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Save className="h-4 w-4" />
                  </Button>
                  <Button size="sm">
                    <Play className="h-4 w-4 mr-2" />
                    Test Run
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {selectedWorkflow ? (
              <MermaidDiagram 
                chart={generateMermaidCode(selectedWorkflow)}
                height="400px"
              />
            ) : (
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                Select a workflow to view its diagram
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Workflow Builder Modal/Panel would go here */}
      {showBuilder && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Create New Workflow</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    <SelectItem value="webhook">Webhook</SelectItem>
                    <SelectItem value="schedule">Schedule</SelectItem>
                    <SelectItem value="database">Database Change</SelectItem>
                    <SelectItem value="email">Email Received</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => setShowBuilder(false)}>Create Workflow</Button>
              <Button variant="outline" onClick={() => setShowBuilder(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
