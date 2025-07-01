import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import {
  Plus,
  Mail,
  MessageSquare,
  Clock,
  Users,
  Settings,
  Play,
  Pause,
  LucideIcon,
} from "lucide-react";

export const AutomatedFollowUp = () => {
  const { toast } = useToast();
  const [activeSequences, setActiveSequences] = useState([
    {
      id: "1",
      name: "New Lead Follow-up",
      trigger: "Lead Created",
      status: "active",
      totalSent: 45,
      openRate: "68%",
      responseRate: "12%",
      steps: [
        {
          day: 0,
          type: "email",
          subject: "Welcome! Let's discuss your project",
          sent: 45,
        },
        {
          day: 2,
          type: "sms",
          message: "Quick follow-up on your construction inquiry",
          sent: 40,
        },
        {
          day: 7,
          type: "email",
          subject: "Free consultation available",
          sent: 35,
        },
        {
          day: 14,
          type: "phone",
          message: "Personal call to discuss project details",
          sent: 25,
        },
      ],
    },
    {
      id: "2",
      name: "Project Completion",
      trigger: "Job Completed",
      status: "active",
      totalSent: 28,
      openRate: "85%",
      responseRate: "25%",
      steps: [
        {
          day: 1,
          type: "email",
          subject: "Thank you for choosing us!",
          sent: 28,
        },
        {
          day: 7,
          type: "email",
          subject: "How was your experience?",
          sent: 26,
        },
        {
          day: 30,
          type: "email",
          subject: "Maintenance tips and future projects",
          sent: 24,
        },
      ],
    },
  ]);

  const [newSequence, setNewSequence] = useState({
    name: "",
    trigger: "",
    steps: [],
  });

  const triggers = [
    "Lead Created",
    "Estimate Sent",
    "Project Started",
    "Job Completed",
    "Payment Received",
    "Follow-up Required",
  ];

  const messageTypes: Array<{
    value: string;
    label: string;
    icon: LucideIcon;
  }> = [
    { value: "email", label: "Email", icon: Mail },
    { value: "sms", label: "SMS", icon: MessageSquare },
  ];

  const toggleSequence = (id: string) => {
    setActiveSequences((prev) =>
      prev.map((seq) =>
        seq.id === id
          ? { ...seq, status: seq.status === "active" ? "paused" : "active" }
          : seq,
      ),
    );
    toast({
      title: "Sequence Updated",
      description: "Follow-up sequence status has been changed.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Automated Follow-up</h2>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create Sequence
        </Button>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList>
          <TabsTrigger value="active">Active Sequences</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-6">
          {/* Active Sequences */}
          <div className="grid gap-6">
            {activeSequences.map((sequence) => (
              <Card key={sequence.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {sequence.name}
                        <Badge
                          variant={
                            sequence.status === "active"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {sequence.status}
                        </Badge>
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        Trigger: {sequence.trigger}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleSequence(sequence.id)}
                      >
                        {sequence.status === "active" ? (
                          <Pause className="h-4 w-4" />
                        ) : (
                          <Play className="h-4 w-4" />
                        )}
                      </Button>
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Sequence Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">
                        {sequence.totalSent}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Messages Sent
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">
                        {sequence.openRate}
                      </p>
                      <p className="text-sm text-muted-foreground">Open Rate</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-purple-600">
                        {sequence.responseRate}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Response Rate
                      </p>
                    </div>
                  </div>

                  {/* Sequence Steps */}
                  <div className="space-y-3">
                    <h4 className="font-semibold">Sequence Steps:</h4>
                    {sequence.steps.map((step, index) => {
                      const IconComponent: LucideIcon =
                        messageTypes.find((t) => t.value === step.type)?.icon ||
                        Mail;
                      return (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-3 border rounded"
                        >
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">
                              Day {step.day}
                            </span>
                          </div>
                          <IconComponent className="h-4 w-4" />
                          <div className="flex-1">
                            <p className="font-medium">
                              {step.subject || step.message}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {step.sent} sent • {step.type.toUpperCase()}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="p-4 border rounded">
                  <h3 className="font-semibold">Welcome Email</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Initial contact email for new leads
                  </p>
                  <div className="flex gap-2 mt-3">
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      Preview
                    </Button>
                  </div>
                </div>
                <div className="p-4 border rounded">
                  <h3 className="font-semibold">Follow-up Reminder</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Gentle reminder for unresponsive leads
                  </p>
                  <div className="flex gap-2 mt-3">
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      Preview
                    </Button>
                  </div>
                </div>
                <div className="p-4 border rounded">
                  <h3 className="font-semibold">Thank You</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Post-project completion appreciation
                  </p>
                  <div className="flex gap-2 mt-3">
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      Preview
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-2xl font-bold">1,248</p>
                    <p className="text-sm text-muted-foreground">Total Sent</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-2xl font-bold">74%</p>
                    <p className="text-sm text-muted-foreground">Open Rate</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="text-2xl font-bold">18%</p>
                    <p className="text-sm text-muted-foreground">
                      Response Rate
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-orange-600" />
                  <div>
                    <p className="text-2xl font-bold">156</p>
                    <p className="text-sm text-muted-foreground">Conversions</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Performance by Sequence</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeSequences.map((sequence) => (
                  <div
                    key={sequence.id}
                    className="flex items-center justify-between p-4 border rounded"
                  >
                    <div>
                      <h3 className="font-semibold">{sequence.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {sequence.totalSent} messages sent
                      </p>
                    </div>
                    <div className="flex gap-4 text-sm">
                      <span>Open: {sequence.openRate}</span>
                      <span>Response: {sequence.responseRate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
